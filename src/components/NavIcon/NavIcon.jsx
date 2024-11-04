import { useState } from 'react';
import './_nav-icon.scss';

export const NavIcon = ({navIsOpen, setNavIsOpen})=>{

    const toggleNav = ()=>{
        setNavIsOpen(prevState => !prevState)
    }

    return(
        <div className={navIsOpen ? "nav-icon nav-icon--active" : "nav-icon"} onClick={toggleNav}>
            <div className="nav-icon__middle"></div>
        </div>   
    )
}