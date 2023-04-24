import React from "react"
//import data from "./data"

import Axios from "axios";
import { load } from "cheerio";


const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/'
const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)'
const kvURL = 'https://worker-kv-api.0nu2sngw3778.workers.dev/' //set?searchword=getij'

export default function Results(props) {
    const { searchword, solution, setSolution } = props
    let solutionArr = [] //initialize temp array
    //console.log('Rendered - Result')
    let count = 0;

    // function appendOrUpdateWoord(solutionArr, woord) {
    //     /*Filter incorrect sections and characters */
    //     if ((woord.includes(' letters') ||
    //         woord.includes('\n')) ||
    //         woord.startsWith(`${searchword.toUpperCase()} `) //added space e.g. EB -> EBBE 
    //         ) return
    //     /*remove additional information spaced split words */
    //     const a = woord.split(' (')[0]
        
    //     setSolution(prev => {
    //         const i = prev.findIndex(e => e.letters === a.length)
    //         /*update existing record*/
    //         if (i > -1) {
    //             const updateWords = [...prev.filter(e => e.letters === a.length )]
    //             const keepWords = prev.filter(e => e.letters != a.length)
    //             return [...keepWords,{letters: a.length, woorden:[...updateWords[0].woorden,a]}]
    //         } else {
    //             /*add new <record></record> */
    //             return [...prev,{letters: a.length, woorden:[a]}]
    //         }
    //     })
    // }      

    function appOrUpd(woord) {
        //console.log({solutionArr})
        /*Filter incorrect sections and characters */
        if ((woord.includes(' letters') ||
            woord.includes('\n')) ||
            woord.startsWith(`${searchword.toUpperCase()} `) //added space e.g. EB -> EBBE 
            ) return
        /*remove additional information spaced split words */
        const a = woord.split(' (')[0]
        
            const i = solutionArr.findIndex(e => e.letters === a.length)
            /*update existing record*/
            if (i > -1) {
                const updateWords = [...solutionArr.filter(e => e.letters === a.length )]
                const keepWords = solutionArr.filter(e => e.letters != a.length)
                solutionArr = [...keepWords,{letters: a.length, woorden:[...updateWords[0].woorden,a]}]
            } else {
                /*add new <record></record> */
                solutionArr =  [...solutionArr,{letters: a.length, woorden:[a]}]
            }
    }      

    React.useEffect(() => {
        /*reset solution result after searchword has been updated*/
        searchword && console.time('API Timing') //skip first time
        //console.log(`Y`)
        setSolution([])
        solutionArr = []
        // let update = false
        /*issue the API call skip when searchword is not set (1st run)*/
        async function makeApiCalls() {
            try {
                console.log(`Get solution from cache or web`)
                let response = await Axios.get(`${kvURL}set?searchword=${searchword}`)
                //console.log(response.data)
                if (!response.data.found) {
                    //update = true
                    console.log('From Web')
                    response = await Axios.get(`${baseURL}${searchword}\/1\/1`)
                    const $ = load(response.data)
                    //$(selector2).toArray().map((item) => appendOrUpdateWoord($(item).text()))
                    $(selector2).toArray().forEach( item => appOrUpd($(item).text()))
                    //console.log(solutionArr)
                    response = await Axios.post(kvURL,{"searchword":searchword, "solution":JSON.stringify(solutionArr)})
                    //console.log(response.status)
                    setSolution(solutionArr)
                    console.timeEnd('API Timing')
                } else {
                    console.log('From Cache')
                    setSolution(JSON.parse(response.data.solution))
                    console.timeEnd('API Timing')
                    //b = performance.now()
                }

            } catch (error) {
                console.log({error})
                //b = performance.now()
                console.timeEnd('API Timing')
            }
            
        }

        searchword && makeApiCalls()  // dont make api calls with empty searchword e.g. when app loads first time.
        
    }, [searchword]);

    
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
            {searchword && results}
        </div>
    )
}