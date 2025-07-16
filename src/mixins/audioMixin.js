export default {
  data() {
    return {
      audioMap: {
        click: new Audio('@/sounds/click_001.ogg'),
        click2: new Audio('@/sounds/click__002.ogg'),
      }
    }
  },
  methods: {
    playAudio(key) {
      const audio = this.audioMap[key]
      if (audio) {
        audio.currentTime = 0
        audio.play()
        console.log('happened')
      }
    }
  }
}
