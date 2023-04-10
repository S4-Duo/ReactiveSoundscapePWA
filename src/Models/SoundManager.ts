
export class SoundManager{
    private pathToSoundsFolder = "/sounds/"
    /**
     * Play sound
     * @param sound
     */
    public playSound(sound: String){
        const audio = new Audio(this.pathToSoundsFolder + sound + ".mp3")
        audio.play()
    }
}