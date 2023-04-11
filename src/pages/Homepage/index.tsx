import React, {useEffect, useState} from "react";
import {SoundManager} from "@/Models/SoundManager";
import {Sounds} from "@/Enums/Sounds";
import {MotionManager} from "@/Models/MotionManager";

export default function Homepage(){
    const soundManager = new SoundManager()
    const motionManager = new MotionManager()

    const [beta, setBeta] = useState<any>()
    const [gamma, setGamma] = useState<any>()
    const [alpha, setAlpha] = useState<any>()
    const [facing, setFacing] = useState<string>()
    function handleMotionEvent(event: DeviceOrientationEvent) {
        setBeta(event.beta)
        setGamma(event.gamma)
        setAlpha(event.alpha)
        setFacing(motionManager.getDevicePosition(event.alpha!, event.beta!, event.gamma!))
    }

    useEffect(() => {
        if (facing == "up"){
            console.log("value changed to up")
            soundManager.playSound("pickup")
        }else if (facing == "down") {
            console.log("value changed to down")
            soundManager.playSound("putdown")
        }
    }, [facing])

    useEffect(() => {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener("deviceorientation", handleMotionEvent);
                    }else {
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
            <button onClick={motionManager.askPermission}>Grant Permission</button>
            <button onClick={() => {soundManager.playSound("pickup")}}>Play Sound</button>
        </div>
    );
}