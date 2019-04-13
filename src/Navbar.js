import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to='/campuses' >Campuses</NavLink></li>
                <li><NavLink to='/Students' >Students</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar
