import React from "react"
import data from "./data"

export default function Results(props) {
    const resultdata = data.data.solutions
    //console.log
    console.log(props.searchword)


    // const results = resultdata.filter(ele => 
    //         ele.searchWord === "BOOM")[0].data.map(e =>
    //         <p key={e} className="results">{e}</p>)
    // console.log('check')
    // console.log(results)

    return (
        <div className="results--form">
            {props.searchword}
        </div>
    )
}