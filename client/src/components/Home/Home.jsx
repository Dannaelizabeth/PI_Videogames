import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getVideogames, filterCreated,orderByName,orderByRating,getGenres,filterByGenres } from "../../actions";
import Card from '../Card/Card'
import Navbar from "../Navbar/Navbar";
import Paginado from "../Paginado/Paginado";

import style from './Home.module.css'
import reload from '../../images/reload.png'


export default function Home (){

    const dispatch = useDispatch()
    //traifo los datos del estago global
    const allVideogames = useSelector(( state ) => state.videogames)
    const genres = useSelector ((state)=> state.genres)

    const [orden, setOrden] = useState('')
    ////Paginado
    const [currentPage, setCurrentPage] = useState(1) //Pagina actual, marcnado tambien el estado con el que va arrancar
    const [videogamesPerPage, setVideogamePerPage] = useState(15)//la cantidad de juegos por pagina
    const indexOfLastVideogame = currentPage * videogamesPerPage//la pag actual multiplicame la cantidad de juegos por pagina
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage//setear el indice de mi primer juego en cad apag, ya que a medida q cambie la pag el primer juego cambia
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame , indexOfLastVideogame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


// trae todos los juegos y generos
    useEffect (() =>{
        dispatch ( getVideogames());
    }, [dispatch]);

    useEffect (()=> {
        dispatch(getGenres());
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }
    //despacha los videogames filtrados por ordenamiento
    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleRating (e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    function handleGenres (e){
        // e.preventDefault();
        // dispatch(filterByGenres(e.target.value));
        // setCurrentPage(1);
        // setOrden(e.target.value);
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
    }
//despacha los videogames creados desde la bd o la api
    function handleFilterCreated (e){
        dispatch (filterCreated(e.target.value))
    }

    return (
        <div className={style.container}>
            <Navbar/>

            <h1>Videogames</h1>
            <button onClick={e => {handleClick(e)}} className={style.reload}>
                <img src={reload} alt='reload' width='50px'/>
                Reload all
            </button>

            <div className={style.filter}>

            {/* ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating */}
                <select onChange={e => handleSort(e)}>
                    <option>Filtros</option>
                    
                    <option value = 'asc'>A - Z</option>
                    <option value = 'desc'>Z - A</option> 
                   
                </select>
                    <select onChange={e => handleRating(e)}>
                    <option>Rating</option>
                    <option value = 'min'>Min Rating</option>
                    <option value = 'max'>Max Rating</option>

                    </select>
                     

                {/* filtrado  por videojuego existente o agregado por nosotros */}
                <select onChange={e => handleFilterCreated(e)}>
                    <option value = 'All'>Todos</option>
                    <option value = 'created'>Creados</option>
                    <option value = 'api'>Existente</option> 
                </select>

                {/* filtrado por género */}
                <select onChange={e => handleGenres(e)}>
                    <option value = 'All'>Todos los Generos</option>
                    { genres.map((e =>{
                        return (
                            <option key={e.id} value ={e.name}>
                                {e.name}
                            </option>
                        )
                    }))}
                </select>
            </div>
            <Paginado 
                videogamesPerPage={videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}
            />
                {
                   currentVideogames?.map( el => { 
                       return(
                        <fragment key ={el.id}>
                           <Link to ={'/home/' + el.id}>
                                <Card 
                                key={el.id}
                                name={el.name}
                                background_image = {el.background_image} 
                                genres = {el.genres}
                                rating = {el.rating}
                        />
                        </Link>

                        </fragment>
                       ) 
                    })}
                 
           
        </div>
    )



}