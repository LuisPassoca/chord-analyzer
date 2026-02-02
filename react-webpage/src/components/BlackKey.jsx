import { useRef, useCallback, useState } from 'react';

function BlackKey({index, toggle, note, octave}) {
    const audioRef = useRef(new Audio(`./assets/audio/${note}s${octave}.wav`))
    const [toggled, setToggled] = useState(false);

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