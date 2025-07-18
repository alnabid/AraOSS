export const audioMap = {
  hover: {
    name: 'Hover Sound',
    audio: new Audio('/sounds/bong_001.ogg'),
    volume: 0.6,
    persistent: false,
    type: 'sfx',
  },
  click: {
    name: 'Click Sound',
    audio: new Audio('/sounds/confirmation_001.ogg'),
    volume: 0.3,
    persistent: true,
    type: 'sfx',
  },
  its_too_cold: {
    name: 'It’s Too Cold',
    audio: new Audio('/sounds/its_too_cold.mp3'),
    volume: 0.4,
    persistent: false,
    type: 'music',
  },
  twozero: {
    name: '2.0',
    audio: new Audio('/sounds/2.0.wav'),
    volume: 0.4,
    persistent: false,
    type: 'music',
  },
};
