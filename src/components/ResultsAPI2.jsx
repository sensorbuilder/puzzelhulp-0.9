import React from "react"
//import data from "./data"

import Axios from "axios";
import { load } from "cheerio";


const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/'
const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)'

export default function Results(props) {
    const { searchword, solution, setSolution } = props
    console.log('Rendered - Result')
    // console.log( searchword, solution, setSolution)
    // console.log(`props ${JSON.stringify(props)}`)
    //const [searchSolution, setSearchSolution] = React.useState([{ letters: 8, woorden: ['No Result']}])
    
    
    //let searchword = searchword;
    let count = 0;
    //const searchResults = [];

    function appendOrUpdateWoord(index, woord, test) {
        /*Filter incorrect sections and characters */
        if ((woord.includes(' letters') ||
            woord.includes('\n')) ||
            woord.startsWith(`${searchword.toUpperCase()} `) //added space e.g. EB -> EBBE 
            ) {
                // console.log(`${index}-skip`)
                return
            }
        const a = woord.split(' (')[0]
        setSolution(prev => {
            const i = prev.findIndex(e => e.letters === a.length)
            if (i > -1) {
                // console.log(`${index}-update`)
                const updateWords = [...prev.filter(e => e.letters === a.length )]
                const keepWords = prev.filter(e => e.letters != a.length)
                return [...keepWords,{letters: a.length, woorden:[...updateWords[0].woorden,a]}]
            } else {
                // console.log(`${index}-add`)
                return [...prev,{letters: a.length, woorden:[a]}]
            }
        })
    }      

    React.useEffect(() => {
        //clear previous result
        setSolution([])
        searchword && Axios.get(`${baseURL}${searchword}\/1\/1`)
            .then(response => {
                console.log(`API call to: ${baseURL}${searchword}\/1\/1`) 
                const $ = load(response.data)
                $(selector2).toArray().map((item,i) => appendOrUpdateWoord(i, $(item).text(),solution))
            })
            .catch(error => console.log(error))
    }, [searchword]);

    // console.log(`searchSolution: ${JSON.stringify(solution)}`)
    // console.log(`rijen ${solution.length}`)
    const results = solution.map((e) => (
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
            {/* {searchword} */}
            {results}
        </div>
    )
}