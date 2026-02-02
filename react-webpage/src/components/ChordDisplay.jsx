function ChordDisplay({candidates}) {
    if (candidates == undefined) {return (
        <>
            <h2>Best Match:</h2>
            <h2>---</h2>
        </>
    )}   

    const mainCandidate = candidates[0]

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