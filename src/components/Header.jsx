import React from "react";
import logo from "../assets/crossword.png"

export default function Header() {
    //console.log('Rendered - Header')
    const timestamp = Date.now(); // get current timestamp in milliseconds

    const dateObj = new Date(timestamp); // create a new Date object from the timestamp

    const date = ("0" + dateObj.getDate()).slice(-2); // get the day of the month with leading zero if necessary
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // get the month with leading zero if necessary (Note: Month in JavaScript starts from 0, hence adding 1)
    const year = dateObj.getFullYear().toString().slice(-2); // get the year in two-digit format

    const hours = ("0" + dateObj.getHours()).slice(-2); // get the hours with leading zero if necessary
    const minutes = ("0" + dateObj.getMinutes()).slice(-2); // get the minutes with leading zero if necessary

    const formattedDate = `${date}/${month}/${year} - ${hours}:${minutes}`; // combine the date and time into the desired format
    
    
    return (
        <header className="header">
            <img
                src={logo} 
                className="header--image"
            />
            <h2 className="header--title">Puzzelhulp</h2>
            <h4 className="header--project">{formattedDate}</h4>
        </header>

    )
}