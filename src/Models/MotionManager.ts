export class MotionManager{
    public getDevicePosition(alpha: number, beta: number, gamma: number): string{
        if (beta > 90 && beta < 180) {
            console.log(`The phone is facing down.`);
            return "down";
        } else if (beta < -90 && beta > -180) {
            console.log(`The phone is facing down.`);
            return "down";
        }else {
            console.log(`The phone is facing up.`);
            return "up";
        }
    }
}