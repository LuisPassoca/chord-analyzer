import { useRef, useCallback, useState, useEffect } from 'react';

function BlackKey({index, toggle, note, octave, playSignal, resetSignal}) {
    const audioRef = useRef(new Audio(`./assets/audio/${note}s${octave}.mp3`))
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (toggled) {
            audio.currentTime = 0;
            audio.play();
        }
    }, [playSignal])

    useEffect(() => {
        if (toggled) {
            const audio = audioRef.current;
            setToggled(a => {
                audio.pause();
                toggle({note: note, index: index});
                return !a;
            })
        }
    }, [resetSignal])
 

    const handleClick = useCallback(() => {
        const audio = audioRef.current;
        setToggled(a => {
            if (!a) {
                audio.currentTime = 0;
                audio.play();
            } else {audio.pause();}

            toggle({note: note + '#', index: index});
            return !a;
        })
    }, [])

    return(<img className={`black octave${octave}`} src={`./assets/image/sharp${toggled}.svg`} draggable={false} onMouseDown={handleClick}></img>)
}

export default BlackKey;