import React from "react"
import versionInfo from '../version.json'

export default function Footer(props) {
    //console.log('Rendered - Footer')
    const { solution } = props
    
    let wordSum = 0
    solution.forEach(e => wordSum += e.woorden.length)
    
    return (
        <div className="footer--text">
            <p>{`${wordSum} woorden gevonden - powered by mijnwoordenboek.nl`}</p>
            <p>{`v${versionInfo.commit} (${versionInfo.date})`}</p>
        </div>
        
    )
}