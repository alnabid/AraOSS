const isDev = import.meta.env.MODE === 'development';

function getAudioPath(filename) {
  return isDev ? `/sounds/${filename}` : `./sounds/${filename}`;
}

function createAudio(src, volume, persistent = true, type = 'sfx') {
  const audio = new Audio(getAudioPath(src));
  audio.volume = volume;
  return {
    name: '',
    audio,
    volume,
    persistent,
    type
  };
}

export const audioMap = {
  hover: {
    ...createAudio('bong_001.ogg', 0.6, false),
    name: 'Hover Sound'
  },
  click: {
    ...createAudio('confirmation_001.ogg', 0.3),
    name: 'Click Sound'
  },
  close: {
    ...createAudio('minimize_001.ogg', 0.1),
    name: 'Close Sound'
  },
  select: {
    ...createAudio('select_006.ogg', 0.3),
    name: 'Select Sound'
  },
  its_too_cold: {
    ...createAudio('its_too_cold.mp3', 0.4, false, 'music'),
    name: 'It’s Too Cold'
  },
  twozero: {
    ...createAudio('2.0.wav', 0.4, false, 'music'),
    name: '2.0'
  },

  two_am_lucid: {
    ...createAudio('2_am_lucid.mp3', 0.4, false, 'music'),
    name: 'Dusqk - 2 AM Lucid'
  },
  sound_test: {
    ...createAudio('sound_test.mp3', 0.4, false, 'music'),
    name: 'Unbeatable Demo ST - sound test'
  },
  games_bookstore: {
    ...createAudio('games_bookstore.mp3', 0.4, false, 'music'),
    name: 'OSC - Games Bookstore'
  },
  press_play: {
    ...createAudio('press_play.mp3', 0.4, false, 'music'),
    name: 'adore; vowl. - press play'
  },
  pink_garden: {
    ...createAudio('pink_garden.mp3', 0.4, false, 'music'),
    name: 'skysiam; ft. isaku - pink garden'
  },
  oyasame: {
    ...createAudio('oyasame.mp3', 0.4, false, 'music'),
    name: 'Pathcel Tarts - Oyasame(?)'
  },
  

};
