import React, {useEffect, useState} from "react";
import {SoundManager} from "@/Models/SoundManager";
import {Sounds} from "@/Enums/Sounds";
import {MotionManager} from "@/Models/MotionManager";
import useSound from "use-sound";
import {func} from "prop-types";
import {pick} from "next/dist/lib/pick";

export default function Homepage() {
    const soundManager = new SoundManager()
    const motionManager = new MotionManager()
    const [sound, setSound] = useState<string | undefined>()
    const [pickup] = useSound("/sounds/pickup.mp3");
    const [putDown] = useSound("/sounds/putdown.mp3");

    const [result, setResult] = useState<any>()
    const [beta, setBeta] = useState<any>()
    const [gamma, setGamma] = useState<any>()
    const [alpha, setAlpha] = useState<any>()
    const [facing, setFacing] = useState<string>("down")

    useEffect(() => {
        if (facing == "up") {
            console.log("value changed to up")
            setSound("/sounds/putdown.mp3")
            pickup()
        } else if (facing == "down") {
            console.log("value changed to down")
            setSound("/sounds/putdown.mp3")
            putDown()
        }
    }, [facing])

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

    function handleMotionEvent(event: DeviceOrientationEvent) {
        setBeta(event.beta)
        setGamma(event.gamma)
        setAlpha(event.alpha)
        setFacing(motionManager.getDevicePosition(event.alpha!, event.beta!, event.gamma!))
    }

    /**
     * Ask for permission to the user
     */
    function askPermission() {
        DeviceOrientationEvent.requestPermission().then(function (result) {
            return setResult(result);
        });
        if (typeof DeviceOrientationEvent !== 'function') {
            return setResult('DeviceOrientationEvent not detected')
        }
        if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
            return setResult('DeviceOrientationEvent.requestPermission not detected')
        }
    }

    return (
        <div>
            <h2>{beta}</h2>
            <h2>{gamma}</h2>
            <h2>{alpha}</h2>
            <h2>{facing}</h2>
            <button onClick={askPermission}>Grant Permission</button>
            <button onClick={() => {
                if (facing == "up") {
                    setSound("/sounds/putdown.mp3")
                    pickup()
                } else if (facing == "down") {
                    setSound("/sounds/putdown.mp3")
                    putDown()
                }
            }}>Play Sound
            </button>
            <h2>
                {result}
            </h2>

        </div>
    );
}