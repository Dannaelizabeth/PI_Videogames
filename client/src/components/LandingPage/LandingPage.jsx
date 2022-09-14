import React from 'react'
import {Link} from 'react-router-dom'
import style from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return (   
        <div className={style.position}>
            <div style={{display:'flex' , flexFlow:'column'}}>
                 {/* <img src='./landingPage/gamer.jpg'/> */}
            {/* <h1> Welcome</h1> */}
            <Link to='/home'>
                    <div className={style.botonCenter}>
                        <div className={`${style.outer} ${style.circule}`}>
                            <button>S T A R T</button>
                            <span></span>
                            <span></span>
                        </div>                   
                    </div>              
                </Link>
            </div>
           
               
        </div>
    )
}