import React from "react"
//import data from "./data"

import Axios from "axios";
import { load } from "cheerio";


const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/'
const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)'

export default function Results(props) {
    const [searchSolution, setSearchSolution] = React.useState(['No Result'])
    
    
    let searchWord = props.searchword;
    let count = 0;
    //const searchResults = [];

    function appendOrUpdateWoord(arr, woord) {
        if ((woord.includes(' letters') ||
            woord.includes('\n')) ||
            woord.startsWith(`${searchWord.toUpperCase()}`)
            ) return
        const a = woord.split(' (')[0]
        arr.push(a)
        // const i = arr.findIndex(e => e.letters === a.length);
        // if (i > -1) arr[i].woorden.push(a)
        // else arr.push({ "letters": a.length, "woorden": [a] })
        count++;
        //return arr;
    }

    React.useEffect(() => {
        //clear previous result
        setSearchSolution([])
        console.log('useEffectAPI2') 
        Axios.get(`${baseURL}${searchWord}\\1\\1`)
            .then(response => {
                const $ = load(response.data)
                console.log($(selector2))
                $(selector2).toArray().map(item => {
                    //console.log($(item).text())
                    const woord = $(item).text()
                if ((woord.includes(' letters') ||
                    woord.includes('\n')) ||
                    woord.startsWith(`${searchWord.toUpperCase()}`)
                ) return
                const a = woord.split(' (')[0]
                setSearchSolution(prev => [...prev,a])
            })
            })
            .catch(error => console.log(error))
    }, [props.searchword]);

    //console.log(searchSolution)
    //console.log(searchSolution.map(e => e.woorden))
    //console.log()
    //const results = searchSolution.map(e => e)
        // < p key = { e } className = "results" > { e }</p>)
    const results = searchSolution.map(e => <p key={e} className="results">{e}({e.length})</p>)
    //const results = <h1>hello</h1>
    //console.log(searchSolution)
    
    return (
        <div className="results--form">
            {/* {props.searchword} */}
            {results}
        </div>
    )
}