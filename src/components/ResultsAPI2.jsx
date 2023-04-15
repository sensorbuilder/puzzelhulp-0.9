import React from "react"
//import data from "./data"

import Axios from "axios";
import { load } from "cheerio";


const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/'
const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)'

export default function Results(props) {
    const [searchSolution, setSearchSolution] = React.useState([{ letters: 8, woorden: ['No Result']}])
    
    
    let searchWord = props.searchword;
    let count = 0;
    //const searchResults = [];

    function appendOrUpdateWoord(index, woord, test) {
        /*Filter incorrect sections and characters */
        if ((woord.includes(' letters') ||
            woord.includes('\n')) ||
            woord.startsWith(`${searchWord.toUpperCase()} `) //added space e.g. EB -> EBBE 
            ) {
                console.log(`${index}-skip`)
                return
            }
        const a = woord.split(' (')[0]
        setSearchSolution(prev => {
            const i = prev.findIndex(e => e.letters === a.length)
            if (i > -1) {
                console.log(`${index}-update`)
                const updateWords = [...prev.filter(e => e.letters === a.length )]
                const keepWords = prev.filter(e => e.letters != a.length)
                return [...keepWords,{letters: a.length, woorden:[...updateWords[0].woorden,a]}]
            } else {
                console.log(`${index}-add`)
                return [...prev,{letters: a.length, woorden:[a]}]
            }
        })
    }      

    React.useEffect(() => {
        //clear previous result
        setSearchSolution([])
        console.log(`useEffectAPI2 ${searchWord}`) 
        searchWord && Axios.get(`${baseURL}${searchWord}\\1\\1`)
            .then(response => {
                const $ = load(response.data)
                $(selector2).toArray().map((item,i) => appendOrUpdateWoord(i, $(item).text(),searchSolution))
            })
            .catch(error => console.log(error))
    }, [props.searchword]);

    console.log(`SearchSolution: ${JSON.stringify(searchSolution)}`)
    console.log(`rijen ${searchSolution.length}`)
    const results = searchSolution.map((e) => (
        <div key={e.letters}>
            <p className="letters">{e.letters} - letters</p>
            <p className="results">
                {e.woorden.reduce((acc, word, index) => {
                    acc.push(
                        <span key={word} className="result"> • {word} </span>
                    );
                    if (index === e.woorden.length - 1) {
                        acc.push(<span key={`separator-${index}`}>•</span>);
                    }
                    return acc;
                }, [])}</p>
        </div>
    ));
    
    return (
        <div className="results--form">
            {/* {props.searchword} */}
            {results}
        </div>
    )
}