import {useEffect, useState} from "react";
import useSound from "use-sound";
export default function AudioPage(){
    const [play] = useSound("/sounds/pickup.mp3");

    const handleClick = () => {
        if (typeof play === 'function') {
            play();
        }
    };

    return(
        <div>
            <button onClick={handleClick}>Play</button>
        </div>
    )
}