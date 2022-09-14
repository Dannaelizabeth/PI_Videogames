import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../actions";
import style from './SearchBar.module.css'


export default function SearchBar (){
    const dispatch = useDispatch ()
    const [name, setName] = useState('')

    function handleInputChange (e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit (e){
        e.preventDefault();
        if (name !== ''){
         dispatch(getNameVideogames(name))
         setName('')

        }
      
    }

    return (
        <div className={style.container} >
            <input className={style.input}
            type='text'
            placeholder= 'Search...'
            value={name}
            onChange={(e) => handleInputChange(e)}
            />
            <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
    
}