import {log} from "util";

export class MotionManager{
    // /**
    //  * Ask for permission to the user THIS DOES NOT WORK IN HERE
    //  */
    // public askPermission() {
    //     DeviceOrientationEvent.requestPermission().then(function(result) {
    //         return console.log("Granted");
    //     });
    //     if (typeof DeviceOrientationEvent !== 'function') {
    //         return console.log('DeviceOrientationEvent not detected')
    //     }
    //     if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
    //         return console.log('DeviceOrientationEvent.requestPermission not detected')
    //     }
    // }
    public getDevicePosition(alpha: number, beta: number, gamma: number): string{
        if (beta > 90 && beta < 180) {
            return "down";
        } else if (beta < -90 && beta > -180) {
            return "down";
        }else {
            return "up";
        }
    }
}