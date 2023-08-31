import React from "react";
import Results from "./ResultsAPI2"
import Footer from './Footer'

export default function Main() {    
    const [post, setPost] = React.useState("");
    const [searchWord, setSearchWord] = React.useState("")
    const [searchSolution, setSearchSolution] = React.useState([{ letters: 8, woorden: ['No Result']}])

    function handleClick(event) {
        event.preventDefault()
        setSearchWord(prev => post)
        //console.log(`Click! : ${searchWord}`)
    }
    
function handleChange(event) {
    setPost(oldPost => event.target.value)
}

    function handleFocus(event) {
        event.target.select()
    }

    console.log('Rendered - Main - 31.8')
    return (
        <main>
            <form className="form">
                <input 
                    type="text"
                    name="searchword"
                    placeholder='zoekwoord invoeren'
                    className="form--input"
                    value={post}
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
                <button 
                    className="form--button"
                    name="Zoek"
                    onClick={handleClick}
                >
                    Zoek
                </button>
            </form>
            <Results searchword={searchWord} solution={searchSolution} setSolution={setSearchSolution} />
            <Footer solution={searchSolution} />
        </main>
    )
}