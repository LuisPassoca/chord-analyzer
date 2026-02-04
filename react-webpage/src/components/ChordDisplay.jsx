import { useState } from "react"

function ChordDisplay({candidates, activeKeys}) {
    const [checkboxToggled, toggleCheckbox] = useState(false)

    const checkboxClicked = () => {
        toggleCheckbox(a => (!a))
    }

    if (activeKeys.length < 2) 
        return(<div className="chordDisplay"><h2>Please select atleast 2 notes</h2></div>)

    if (candidates == undefined) 
        return (<div className="chordDisplay"><h2>Undefined chord</h2></div>)  

    const mainCandidate = candidates[0]

    return (
        <div className="chordDisplay">
            <div className="closestMatch">
                <h2>Best match:</h2>
                <h2><b>
                    {
                    mainCandidate.inversionRoot + 
                    mainCandidate.chordInfo.short + 
                    (mainCandidate.inversionRoot != mainCandidate.chordRoot ? ('/' +  mainCandidate.chordRoot) : '')
                    }
                    </b>
                </h2>
                <h3 className='grayText'>
                    {
                    mainCandidate.inversionRoot + " " +
                    mainCandidate.chordInfo.name +
                    (mainCandidate.inversionRoot != mainCandidate.chordRoot ? (' (over ' +  mainCandidate.chordRoot + ')') : '')
                    }
                </h3>
            </div> 

            <div className="checkbox">
                <label htmlFor='displaymore'>Display other possible matches?</label>
                <input type='checkbox' id='displaymore' onChange={checkboxClicked} checked={checkboxToggled}></input>
            </div>

            {candidates.length > 1 && checkboxToggled && ( 
                <div className="otherMatches">
                    <h3>Other matches: </h3>
                    <ul>
                        {candidates.map((element, index) => index !=0 &&
                            <li key={index} title={
                                element.inversionRoot + " " +
                                element.chordInfo.name + 
                                (element.inversionRoot != element.chordRoot ? (' (over ' +  element.chordRoot + ')') : '')}
                            >
                                {
                                element.inversionRoot + element.chordInfo.short +
                                (element.inversionRoot != element.chordRoot ? ('/' +  element.chordRoot) : '')
                                }
                            </li>
                        )}
                    </ul>
                </div>
                )}
        </div>
    )
}

export default ChordDisplay;