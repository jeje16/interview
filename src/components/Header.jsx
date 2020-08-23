import React from 'react'
import '../styles/Header.css'

function Header() {
    return (
        <div className="header">
            <a href="/list" className="mylist">Favorites</a>
            <h1>
              <a href="/" className="head">Movie-App</a>  
            </h1>
        </div>
    )
}

export default Header
