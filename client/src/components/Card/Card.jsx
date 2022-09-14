import React from "react";
import style from './Card.module.css'
import rating1 from '../../images/rating2.png'
import genres1 from '../../images/genero.png'

export default function Card ( { id,name, background_image, genres, rating}) {
    return (
        <div className={style.card}>
            <span className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            <img className={style.img} src={background_image} alt= {name}  height='190px'/>

            <span className={style.rating}>Rating</span>
            <div className={style.rand} >
                <img className={style.imgran} src={rating1} alt= 'Rating' height='35px'/>
            <span>{rating}</span> <br/>
            <span className={style.puntaje}>Puntuacion</span>
            </div>
            
            <span className={style.generoTitle}>Genero</span>
            <div style={{display:'flex'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <img className={style.imggen} src={genres1} alt='generos'/>
                        {/* <span className={style.generos}>{genres && genres.map((e)=>{
                         return(
                            <li key={e}>
                             {e}
                            </li>
                         )
                         })}</span> */}
                         <span className={style.generos}>{genres.join(' ')}</span>
            </div>
            </div>

            
           
        </div>
    )

}