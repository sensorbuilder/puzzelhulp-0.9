import React from "react"
//import data from "./data"

import Axios from "axios";
import { load } from "cheerio";


const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/'
const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)'
const kvURL = 'https://worker-kv-api.0nu2sngw3778.workers.dev/set?' //searchword=getij'

export default function Results(props) {
    const { searchword, solution, setSolution } = props
    console.log('Rendered - Result')
    let count = 0;

    function appendOrUpdateWoord(index, woord, test) {
        /*Filter incorrect sections and characters */
        if ((woord.includes(' letters') ||
            woord.includes('\n')) ||
            woord.startsWith(`${searchword.toUpperCase()} `) //added space e.g. EB -> EBBE 
            ) return
        /*remove additional information spaced split words */
        const a = woord.split(' (')[0]
        
        setSolution(prev => {
            const i = prev.findIndex(e => e.letters === a.length)
            /*update existing record*/
            if (i > -1) {
                const updateWords = [...prev.filter(e => e.letters === a.length )]
                const keepWords = prev.filter(e => e.letters != a.length)
                return [...keepWords,{letters: a.length, woorden:[...updateWords[0].woorden,a]}]
            } else {
                /*add new <record></record> */
                return [...prev,{letters: a.length, woorden:[a]}]
            }
        })
    }      

    React.useEffect(() => {
        /*reset solution result after searchword has been updated*/
        setSolution([])
        /*issue the API call skip when searchword is not set (1st run)*/
        searchword && Axios.get(`${kvURL}searchword=${searchword}`)
        .then(response => {
            console.log(`Api call to: ${kvURL}searchword=${searchword}`)
            const $ = load(response.data)
            console.log($)
        })
        // .catch(error => console.log(error))
        // searchword && Axios.get(`${baseURL}${searchword}\/1\/1`)
        //     .then(response => {
        //         console.log(`API call to: ${baseURL}${searchword}\/1\/1`) 
        //         const $ = load(response.data)
        //         $(selector2).toArray().map((item,i) => appendOrUpdateWoord(i, $(item).text(),solution))
        //     })
        //     .catch(error => console.log(error))
    }, [searchword]);

    // console.log(`searchSolution: ${JSON.stringify(solution)}`)
    // console.log(`rijen ${solution.length}`)
    // const results = solution.map((e) => (
    //     <div key={e.letters}>
    //         <p className="letters">{e.letters} - letters</p>
    //         <p className="results">
    //             {e.woorden.reduce((acc, word, index) => {
    //                 acc.push(
    //                     <span key={word} className="result"> • {word} </span>
    //                 );
    //                 if (index === e.woorden.length - 1) {
    //                     acc.push(<span key={`separator-${index}`}>•</span>);
    //                 }
    //                 return acc;
    //             }, [])}</p>
    //     </div>
    // ));
    
    return (
        <div className="results--form">
            {/* {searchword} */}
            {/* {results} */}
        </div>
    )
}