import React from "react";
import style from "../Paginado/Paginado.module.css"

export default function Paginado ({videogamesPerPage, allVideogames,paginado}){
    const pageNumbers =[]

    for (let i =0 ; i<= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className={`${style.paginado}`}>
                { pageNumbers &&
                pageNumbers.map(number=>(
                    <li key={number} style = {{listStyle: 'none'}} 
                    onClick={() => paginado(number)} >
                        <button className={style.button} type="button">{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}  