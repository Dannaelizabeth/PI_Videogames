const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios =require ('axios')
const {Videogame,Genres} = require('../db');
const e = require('express');
const {API_KEY} = process.env


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//Nos trae toda la informacion de la api
const getApiInfo = async () =>{ 

        const apiInfo = [];//para guardar los 20 videojuegos de cada pagina de la api
        let apiUrl =`https://api.rawg.io/api/games?key=${API_KEY}`;

        //Necesito 5 paginas para un total de 100 videjuegos
        for (let i = 1; i < 6; i++){
            let pages = await axios.get(apiUrl);
            pages.data.results?.map(el =>{
                apiInfo.push({
                    id : el.id,
                    name : el.name,
                    background_image : el.background_image,
                    released : el.released,
                    rating : el.rating,
                    platforms : el.platforms.map(p=> p.platform.name),
                    genres : el.genres.map(g => g.name)
                });
            });
            apiUrl = pages.data.next;
        }
    return apiInfo;
    
}
// Trae toda la informacion de la base de datos

const getDbInfo = async () => {
    let dataVideogame = await Videogame.findAll({
        include : {
            model:Genres,
            attributes : ['name'],
            through : {
                attributes : [],
            },
        }
    });
    const infoDb = dataVideogame.map(el => {
        return {
          id: el.id,
          name: el.name,
          background_image: el.background_image,
          genres: el.genres.map(e => e.name),
          description: el.description,
          released: el.released,
          rating: el.rating,
          plataforms: el.platforms.map(el => el),
          createdInDb: el.createdInDb,
        };
      });
      return infoDb;
}

//  concatena lo que esta en la base de Dato como de la Api

const getAllVideogames = async () => {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
}
/////////////////////////////////////////////////////////////////////////

router.get('/videogames', async (req,res)=> {
    const name = req.query.name
    let videogamesTotal = await getAllVideogames();
    if (name){
        let videogameName = videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase())).slice(0,15);
        videogameName.length ? 
        res.status(200).send (videogameName) :
        res.status(404).send ('No se encuentra el juego ');
    }else{
        res.status(200).send(videogamesTotal)
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////
router.get('/videogames/:id', async ( req, res) => {
    //const {id} = req.params
    const id = req.params.id;
    const gameTotal = await getAllVideogames()
    if(id){
        let videogameId = await gameTotal.filter(el => el.id == id)
        videogameId.length?
        res.status(200).json(videogameId):
        res.status(400).send('No se encontro el Video Juego')
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/genres', async (req,res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = genresApi.data.results.map( el => el.name);
    // const occEach = genres.map( el => {
    //     for (let i=0; i<el.length; i++) return el[i]})
    //     console.log(occEach)
    genres.forEach( el =>{
        Genres.findOrCreate({
        where : { name : el}
    })  
    console.log(genres)
    });
    const allGenres = await Genres.findAll();
    res.send(allGenres);
})
/////////////////////////////////////////////////////////////////////////////////////////////
router.post('/videogames', async (req,res) => {
    let {
        name,
        background_image,
        description,
        released,
        genres,
        platforms,
        rating,
        createdInDb
    } =req.body


    const videogameCreated = await Videogame.create ({
        name,
        background_image : background_image ? background_image:'https://fondosmil.com/fondo/49736.jpg',
        description,
        released,
        platforms,
        rating,
        createdInDb
    })
    const genreDb = await Genres.findAll({
        where : {name : genres}
    })

    videogameCreated.addGenres(genreDb)
    res.send('Video Juego creado con exito')
})

module.exports = router;
