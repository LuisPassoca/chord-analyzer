function ChordDisplay({candidates}) {
    if (candidates == undefined) {return (
        <>
            <div className="chordDisplay">---</div>
        </>
    )}   

    const mainCandidate = candidates[0]



    return (
        <div className="chordDisplay">
            <div className="closestMatch">
                <h2>Best match:</h2>
                <h2>
                    {
                    mainCandidate.inversionRoot + 
                    mainCandidate.chordInfo.short + 
                    (mainCandidate.inversionRoot != mainCandidate.chordRoot ? ('/' +  mainCandidate.chordRoot) : '')
                    }
                </h2>
                <h3 className='grayText'>
                    {
                    mainCandidate.inversionRoot + " " +
                    mainCandidate.chordInfo.name +
                    (mainCandidate.inversionRoot != mainCandidate.chordRoot ? (' (over ' +  mainCandidate.chordRoot + ')') : '')
                    }
                </h3>
            </div> 

            {candidates.length > 192 && ( 
                <div className="otherMatches">
                    <h3 className="grayText">Other matches: </h3>
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



    return(
        <>
        <h2>Best Match:</h2>
        <h2>
            {mainCandidate.inversionRoot + mainCandidate.chordInfo.short + (mainCandidate.inversionRoot != mainCandidate.chordRoot ? ('/' +  mainCandidate.chordRoot) : '')}
        </h2>
        <h3>{mainCandidate.inversionRoot + " " + mainCandidate.chordInfo.name}</h3>

        {candidates.length > 1 && (<div><h2>Other possible matches: </h2>
                <ul>
                    {candidates.map((element, index)=> index != 0 && <li key={element.inversionRoot + element.chordInfo.name} title={element.inversionRoot + " " + element.chordInfo.name}>{element.inversionRoot + element.chordInfo.short + (element.inversionRoot != element.chordRoot ? ('/' +  element.chordRoot) : '')}</li>)}
                </ul>
            </div>
            )}
        </>
    )

}

export default ChordDisplay;