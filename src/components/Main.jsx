import React from "react";
import Results from "./ResultsAPI"

export default function Main() {    
    const [post, setPost] = React.useState("");
    const [searchWord, setSearchWord] = React.useState("")
    //const [result, setResult] = React.useState(data.data);
   
    function handleClick(event) {
        event.preventDefault()
        setSearchWord(prev => post)
        console.log(`Click! : ${searchWord}`)
    }
    
    function handleChange(event) {
        setPost(oldPost => event.target.value)
    }

    console.log('Main Component - Rendered')
    return (
        <main>
            <form className="form">
                <input 
                    type="text"
                    name="searchword"
                    placeholder='search word'
                    className="form--input"
                    value={post}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    name="search"
                    onClick={handleClick}
                >
                    Search
                </button>
            </form>
            <Results searchword={searchWord} />
        </main>
    )
}