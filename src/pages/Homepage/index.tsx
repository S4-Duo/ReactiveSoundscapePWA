import React, {useEffect, useState} from "react";
import {SoundManager} from "@/Models/SoundManager";
import {Sounds} from "@/Enums/Sounds";
import {MotionManager} from "@/Models/MotionManager";

export default function Homepage() {
    const soundManager = new SoundManager()
    const motionManager = new MotionManager()

    const [beta, setBeta] = useState<any>()
    const [gamma, setGamma] = useState<any>()
    const [alpha, setAlpha] = useState<any>()
    const [facing, setFacing] = useState<string>()

    const [permission, setPermission] = useState<any>()

    /**
     * This function is being triggered when the user changed the motion of the devide
     * @param event
     */
    function handleMotionEvent(event: DeviceOrientationEvent) {
        setBeta(event.beta)
        setGamma(event.gamma)
        setAlpha(event.alpha)
        setFacing(motionManager.getDevicePosition(event.alpha!, event.beta!, event.gamma!))
    }

    /**
     * Ask for permission to the user, this needs to be here for some reason. I tried to add logic to the MotionManager
     * But that one did not work. The user gets its prompt for allowing device motion. But than nothing happens. The
     * useEffect with the event listener does not know if the user has given access or not
     */
    function askPermission() {
        DeviceOrientationEvent.requestPermission().then(function (result) {
            setPermission(result)
            return console.log(result);
        });
        if (typeof DeviceOrientationEvent !== 'function') {
            return console.log('DeviceOrientationEvent not detected')
        }
        if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
            return console.log('DeviceOrientationEvent.requestPermission not detected')
        }
    }

    /**
     * This useffect is used to play a sound when the user changed the facing to up or down
     */
    useEffect(() => {
        if (facing == "up") {
            console.log("value changed to up")
            soundManager.playSound("pickup")
        } else if (facing == "down") {
            console.log("value changed to down")
            soundManager.playSound("putdown")
        }
    }, [facing])

    /**
     * This useffect is called for managing the event listener. When the deviceorientation changed, execute the handleMotionEvent
     */
    useEffect(() => {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener("deviceorientation", handleMotionEvent);
                    } else {
                        window.addEventListener("deviceorientation", handleMotionEvent);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener("deviceorientation", handleMotionEvent);
        }
    })

    return (
        <div>
            <h2>{beta}</h2>
            <h2>{gamma}</h2>
            <h2>{alpha}</h2>
            <h2>{facing}</h2>
            {
                (permission != "") ? <button onClick={askPermission}>Ask for permission</button> : <></>
            }

            <button onClick={() => {
                soundManager.playSound("pickup")
            }}>Play Sound
            </button>
        </div>
    );
}