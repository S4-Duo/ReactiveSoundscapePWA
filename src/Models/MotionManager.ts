export class MotionManager{
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