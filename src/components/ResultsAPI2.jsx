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

    //console.log(searchSolution)
    //console.log(searchSolution.map(e => e.woorden))
    //console.log()
    //const results = searchSolution.map(e => e)
        // < p key = { e } className = "results" > { e }</p>)
    console.log(`SearchSolution: ${JSON.stringify(searchSolution)}`)
    console.log(`rijen ${searchSolution.length}`)
    const results = searchSolution.map((e) => (
            <p key={e.letters} className="letters">{e.letters}</p>
            {e.woorden.map(e => <p key={e.letters} className="result">{e}</p>)}
        )})
        
        
    //     { 
    //             e.woorden.map((e) => {
    //                 return (<p key={e} classname="results">{e}</p>)
    //             });
    //         }
    //     );
    // });
    //     //{this.woorden.map(e => <p key={e} classname="results">{e}</p>)})
    //const results = <h1>hello</h1>
    //console.log(searchSolution)
    
    return (
        <div className="results--form">
            {/* {props.searchword} */}
            {results}
        </div>
    )
}