import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { postVideogame, getGenres, getVideogames} from "../../actions";
import {useDispatch, useSelector} from 'react-redux';
import style from './VideogameCreate.module.css'

export default function VideogameCreate (){
    const dispatch =useDispatch ()
    const history = useHistory()
    const genres = useSelector ((state) => state.genres);
    const videogames = useSelector ((state) => state.videogames);
    console.log(genres)

    const arrayPlatformas = [
        'PC',
        "Linux",
        "PSP",
      "Xbox Series S/X",
      "PlayStation 2",
      "PlayStation 3",
      "PlayStation 4",
      "PlayStation 5",
      "Web",
      "Xbox 360",
      "Xbox One",
      "Dreamcast",
      "Nintendo Switch",
      "PS Vita",
      "macOS",
      "iOS",
      "Android",
      "Wii U",
      "Nintendo 3DS",
    ]
    
    const [input, setInput] = useState({
        name :'',
        image: '',
        description: '',
        released: '',
        rating :'',
        genres: [],
        platforms:[],
    })

    function handleChange (e){
        setInput({
            ...input, 
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

    function handleSelect (e){
        setInput ({
            ...input,
            genres : [...input.genres,e.target.value]
        })
    }
    function handleSelectPlatforms (e){
        setInput ({
            ...input,
            platforms: [...input.platforms,e.target.value]
        })
    }

    function handleChangeCheck (e){
        if (e.target.checked){
            setInput({
                input,
                platforms:e.target.value
            });
        }else if (!e.target.checked){
            setInput({
                ...input,
                platforms:input.platforms.filter((e) => e !== e.target.value)
            })
        }
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log(input)
        if (input.name.trim() === ""){
            return alert ('Debe de ingresar nombre');
        }else if (
            videogames.find ( (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
            )
        ){
            return alert (`El nombre ${input.name} ya existe`)
        } else if (input.description.trim() === ''){
            return alert ('Necesita tener una descripcion el juego.');
        }else if (input.released.trim() === ''){
            return alert ('Ingrese una Fecha de lanzamiento')
        }else if (input.released < '1960-12-03'){
            return('La fecha tiene que ser mayor 03/12/1960 ')
        } else if (
            input.rating.trim() === '' || input.rating < 1 || input.rating > 10 ) {
                return alert ('Ingrese un Puntanje de 1 al 10')
        } else if (input.genres.length === 0) {
            return alert("Selecione uno o más Generos");
          } else if (input.platforms.length === 0) {
            return alert("Selecione una o más Plataformas");
          } else {
         dispatch(postVideogame(input))
        alert ('Nuevo Juego Creado!!')
        setInput({
            name :'',
            image: '',
            description: '',
            released: '',
            rating :'',
            genres: [],
            platforms:[],
        })
        history.push ('/home')
          } 
    }

    function handleDeleteGenres(g){
        setInput({
            ...input,
            genres:input.genres.filter(gen => gen !== g)
        })
    }
    function handleDeletePlatforms(pl){
        setInput({
            ...input,
            platforms:input.platforms.filter(platf => platf !== pl)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return (
        <div className={style.container}>
            <Link to = '/home'><button>Regresar</button></Link>
            <h1>Crea un nuevo Juego</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange= {(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Descripcion: </label>
                    <input
                    type='text'
                    value={input.description}
                    name='description'
                    onChange= {(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Fecha de Lanzamiento</label>
                    <input
                    type='date'
                    value={input.released}
                    name= 'released'
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Puntacion: </label>
                    <input 
                    type='number'
                    value={input.rating}
                    name='rating'
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Inserte una Imagen</label>
                        <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={(e)=>handleChange(e)}
                        />

                </div> 
                    {/* <div>
                        <label>Plataformas: </label>
                        
                        {arrayPlatformas.map((e) => (
                            <div key={e} >
                                <input
                                    type='checkbox'
                                    value = {e}
                                    name = 'platforms'    
                                    onChange ={(e) => handleChangeCheck(e)}  
                                    key={e}                     
                                />
                                {e}
                            </div>
                        ))}
                    </div> */}
                    <div>
                    <label>Plataforma</label>
                    <select onChange={(e) => handleSelectPlatforms(e)}>
                    <option disabled>Seleccionar Plataformas:</option>
                        {arrayPlatformas.map((g)=>(     
                            <option value={g} key={g}>{g}</option>
                        ))} 
                    </select>
                    <ul>
                        <li>
                            {input.platforms.map(g => g + ', ')}
                        </li>
                    </ul>
                    {input.platforms.map(el=>
                        <div key={el} className={style.delete}>
                        <p>{el}</p>
                        <button className={style.botonX} onClick={()=>handleDeletePlatforms(el)}>X</button>
                        </div>
                        )}

                    </div>
                    
                    <div>
                        <label>Generos: </label>
                        <select onChange={(e) => handleSelect(e)}>
                    <option disabled>Seleccionar Genero</option>
                        {genres.map((g)=>(   
                                <option value={g.name} key ={g.name}>{g.name}</option>
                        ))
                        } 
                    </select>
                    <ul>
                        <li>
                            {input.genres.map(el => el + ', ')}
                        </li>
                    </ul>

                    {input.genres.map(el=>
                        <div key ={el} className={style.delete}>
                        <p>{el}</p>
                        <button className={style.botonX} onClick={()=>handleDeleteGenres(el)}>X</button>
                        </div>
                        )}
                    </div>
                    <div>
                    <button type="submit">Crear un nuevo Juego</button>

                    </div>
                    
            </form>
            
        </div>
    )
}