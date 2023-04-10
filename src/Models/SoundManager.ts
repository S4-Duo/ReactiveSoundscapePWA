
export class SoundManager{
    private pathToSoundsFolder = "/sounds/"
    private audio;

    constructor() {
        this.audio = new Audio()
        this.audio.autoplay = true
    }

    /**
     * Play sound
     * @param sound
     */
    public playSound(sound: String){
        this.audio.src = this.pathToSoundsFolder + sound + ".mp3"
        this.audio.play()
    }
}