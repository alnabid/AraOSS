export default {
  data() {
    return {
      audioMap: {
        hover: {
          audio: new Audio('/sounds/bong_001.ogg'),
          volume: 0.6
        },
        click: {
          audio: new Audio('/sounds/confirmation_001.ogg'),
          volume: 0.3
        }
      }
    }
  },
  methods: {
    playAudio(key) {
      const entry = this.audioMap[key]
      if (entry && entry.audio) {
        const audio = entry.audio
        audio.volume = entry.volume ?? 1
        audio.currentTime = 0
        audio.play()
        console.log(`audio played: ${key} at volume ${audio.volume}`)
      }
    }
  }
}
