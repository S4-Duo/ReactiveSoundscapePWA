import React, {useEffect, useState} from "react";
import {func} from "prop-types";


export default function Homepage(){
    const [secure, setSecure] = useState<boolean>()

    const [result, setResult] = useState<any>()
    const [beta, setBeta] = useState<any>()
    const [gamma, setGamma] = useState<any>()
    const [alpha, setAlpha] = useState<any>()

    function handleMotionEvent(event: DeviceOrientationEvent) {
        setBeta(event.beta)
        setGamma(event.gamma)
        setAlpha(event.alpha)
    }

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

    function isInstalled() {
        let isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
        alert(isInStandaloneMode)
    }

    function testDeviceOrientation() {
        DeviceOrientationEvent.requestPermission().then(function(result) {
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
            <button onClick={testDeviceOrientation}>Grant Permission</button>

            <h2>
                {result}
            </h2>

        </div>
    );
}