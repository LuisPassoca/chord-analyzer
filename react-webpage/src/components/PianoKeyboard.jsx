import WhiteKey from "./WhiteKey";
import BlackKey from "./BlackKey";
import { useState } from "react";
import findChord from "./chordAnalyzer";
import ChordDisplay from "./ChordDisplay";
import Button from "./Button";

const notes = [
    {note: 'A', imageId: 1, sharp: true},
    {note: 'B', imageId: 2, sharp: false},
    {note: 'C', imageId: 3, sharp: true},
    {note: 'D', imageId: 1, sharp: true},
    {note: 'E', imageId: 2, sharp: false},
    {note: 'F', imageId: 3, sharp: true},
    {note: 'G', imageId: 1, sharp: true},
]

const keys = []

const octaves = 2;
const notesToRender = (octaves * 7) + 3;

for (let i = 0; i < notesToRender; i++) {
    const indexWrap = i % 7;
    const note = {...notes[indexWrap]}
    note.octave = Math.floor(i / 7);
    keys.push(note);
}

keys[0].imageId = 3;
keys[keys.length - 1].imageId = 0;
keys[keys.length - 1].sharp = false;

const activeKeys = []

function PianoKeyboard() {
    const [currentChord, setChord] = useState(undefined)

    const handleKeyToggle = (note) => {
        const index = activeKeys.findIndex(item => item.index == note.index)
        if (index > -1) {activeKeys.splice(index, 1)}
        else {activeKeys.push(note)}

        activeKeys.sort((a, b) => (a.index - b.index));
        
        if (activeKeys.length > 1) {
            const chordInput = [];
            activeKeys.forEach(key => chordInput.push(key.note));
            const candidates = findChord(chordInput);
            setChord(candidates);
        } 
        else {setChord(undefined)}
    }

    const [playSignal, sendSignal] = useState(0)
    const playClicked = () => {
        sendSignal(a => (a+1))
    }

    const [resetSignal, sendReset] = useState(0)
    const resetClicked = () => {
        sendReset(a => (a+1))
    }

    return (
        <>
        <div className="pianoElement">
            <div id="button">
                <div id="pianoButton"></div>
                <div id="light"></div>
            </div>
            <div className="pianoStripe" id='gray'></div>
            <div className="pianoStripe" id='red'></div>

            <div className="pianoKeyboard">
                {keys.map((key, index) => (
                    <div className="keyWrapper" key={key.note + key.octave}>
                        <WhiteKey index={(index * 10) - 5} toggle={handleKeyToggle} note={key.note} octave={key.octave} imageId={key.imageId} playSignal={playSignal} resetSignal={resetSignal}/>
                        {key.sharp && <BlackKey index={index * 10} toggle={handleKeyToggle} note={key.note} octave={key.octave} playSignal={playSignal} resetSignal={resetSignal}/>}
                    </div>
                ))}
            </div>
        </div>
        <div className="buttons">
            <Button usage={'play'} funct={playClicked}/>
            <Button usage={'reset'} funct={resetClicked}/>
        </div>
        <ChordDisplay candidates={currentChord} activeKeys={activeKeys}/>
        </>
    )
}

export default PianoKeyboard;