import React from "react";
import logo from "../assets/crossword.jpg"

export default function Header() {
    console.log('Rendered - Header')
    return (
        <header className="header">
            <img
                src={logo} 
                className="header--image"
            />
            <h2 className="header--title">Puzzelhulp</h2>
            <h4 className="header--project">{Date.now()}</h4>
        </header>

    )
}