import { useRef, useCallback, useState } from 'react'

function WhiteKey({index, toggle, note, octave, imageId}) {
    const audioRef = useRef(new Audio(`./assets/audio/${note}${octave}.wav`))
    const [toggled, setToggled] = useState(false);

    const handleClick = useCallback(() => {
        const audio = audioRef.current;
        setToggled(a => {
            if (!a) {
                audio.currentTime = 0;
                audio.play();
            } else {audio.pause();}

            toggle({note: note, index: index});
            return !a;
        })
    }, [])

    return(<img className={`white octave${octave}`} src={`./assets/image/note${imageId}${toggled}.svg`} draggable={false} onMouseDown={handleClick}></img>)
}

export default WhiteKey;