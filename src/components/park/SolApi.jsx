import React from "react";
import Axios from "axios";
import { load } from "cheerio";


const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/'
const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)'

const searchSolution = [];
let searchWord = '';
let count = 0;

function appendOrUpdateWoord(arr, woord) {
    if ((woord.includes(' letters') ||
        woord.includes('\n')) ||
        woord.startsWith(`${searchWord.toUpperCase()}`)
        ) return
    const a = woord.split(' (')[0]
    const i = arr.findIndex(e => e.letters === a.length);
    if (i > -1) arr[i].woorden.push(a)
    else arr.push({ "letters": a.length, "woorden": [a] })
    count++;
    //return arr;
}

React.useEffect(() => {
    Axios.get(`${baseURL}${searchWord}\\1\\1`)
      .then(response => { 
          const $ = load(response.data)
          //$(selector2).toArray().map(item => console.log($(item).text()))
          $(selector2).toArray().map(item => appendOrUpdateWoord(searchSolution,$(item).text()))
        const $data = $(selector2)
       setPost({title:"text", body: `${$data.text()}`} );
       console.log(searchSolution)//setPost({title:'Title',body:'body'})
      })
        .catch(error => console.log(error))
}, []);