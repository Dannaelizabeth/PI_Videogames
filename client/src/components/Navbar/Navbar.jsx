import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './Navbar.module.css'
import LogoGamer from '../../images/LogoGamer.png'


export default function Navbar(){
    return( 
        <nav className={style.navbar}>
            <Link to='/'>
                <span className={style.landing}>
                    <img className={style.LogoGamer} src={LogoGamer}  alt="logo"/>
                </span>
            </Link>

            <SearchBar/> 
            <Link to = '/videogame'>
                <button className={style.create}>New Game</button>
                
            </Link>

        </nav>
    )
}