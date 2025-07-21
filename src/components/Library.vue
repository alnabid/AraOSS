<template>
  <section v-if="visible">
    <div class="keybinds">
      <h2>Keybinds</h2>
      <div class="instructions">
        <div class="block">
          <div class="keys">
            <div class="key">Space</div>
          </div>
          <div class="action">Close</div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key">W</div>
            <div class="key">S</div>
          </div>
          <div class="action">Select Item</div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key">TAB</div>
          </div>
          <div class="action">Switch tabs</div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="top">
        <div class="tabs">
          <div class="tab" :class="{ active: currentTab === 'Music' }" @click="switchTab('Music')">Music</div>
          <div class="tab" :class="{ active: currentTab === 'Notes' }" @click="switchTab('Notes')">Notes</div>
        </div>
      </div>

      <div class="main">
        <div class="table" ref="itemsList">
          <div
            class="item"
            v-for="(item, index) in items"
            :key="index"
            :ref="el => itemRefs[index] = el"
            :class="{ selected: selectedIndex === index }"
            @click="selectItem(index)"
          >
            <div class="number">{{ index + 1 }}</div>
            {{ item.title }}
          </div>
        </div>

        <div class="right">
          <div class="content">
            <!-- Music -->
            <div v-if="currentTab === 'Music' && selectedIndex === 0">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>All of the songs were hand picked. I picked some of my favourite songs that have futiristic vibe.. which matches with the theme of Ara OSS. I also added ambient music.. and one of my own song.. cuz why not!</p>
              <h4>Tracklist</h4>
              <div class="playlist-table">
                1. Dusqk - 2 AM Lucid <br>
                2. Unbeatable Demo ST - sound test <br>
                3. OSC - Games Bookstore <br>
                4. Adore; vowl. - press play <br>
                5. skysiam; ft. Isaku - pink garden <br>
                6. Pathcel Tarts - Oyasame(?) 
              </div>
            </div>


            <div v-if="currentTab === 'Music' && selectedIndex === 1">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>I wanted to put more of my own music in this playlist and i did play around with fl studio at the last day.. but i simply had no time. I did however select an already existing song I have made.</p>
            </div>


            <div v-if="currentTab === 'Music' && selectedIndex === 2">
              <h3 class="content-title">Dusqk - 2 AM Lucid</h3>
              <p>I love one of this artist's album- Sanctuary OS; which actually inspired this project. This song is not from that album but it has similar futiristic vibe. This is why I have put this as the opening track.</p>
              <a href="https://open.spotify.com/track/6PM5CT3fRUalKO5QfY0joS?si=45d8a5465f4a4eb9" target="_blank">Spotify</a>
            </div>

            <div v-if="currentTab === 'Music' && selectedIndex === 3">
              <h3 class="content-title">UNBEATABLE DEMO SOUNDTRACK - track 35: sound test</h3>
              <p>written, mixed & mastered by rj lake</p>
              <p>This is from an upcoming rhythm game - Unbeatable. I played the demo.. its nice.. waiting for the full thing. I selected this soundtrack because its very video gamey</p>
              <a href="https://www.youtube.com/watch?v=tUJfpZg93YI&ab_channel=D-CELL" target="_blank">YouTube</a>
            </div>

            <div v-if="currentTab === 'Music' && selectedIndex === 4">
              <h3 class="content-title">OSC - Games Bookstore</h3>
              <p>Album: Ambient Time - All Kinds of Jubies...</p>
              <p>This is very relaxing and calming. It's the most ambient track in this playlist. OSC has alot of albums with similar style. They are created with Adventure Time on mind.. I also get alot of minecraft/c418 vibes from these tracks.</p>
              <a href="https://open.spotify.com/track/2mjJrdBgQEnPlU6F7we5bo?si=8de32372ecfe4f34" target="_blank">Spotify</a>
            </div>

            <div v-if="currentTab === 'Music' && selectedIndex === 5">
              <h3 class="content-title">Adore, Vowl. - press play</h3>
              <p>Yep.. this is the only song with vocals on it in this playlist. "Press play"- nice pun for a video game inspired project</p>
              <a href="https://open.spotify.com/track/6vZCWKiXwxCG0buNfWeQD8?si=de2841ee42d44060" target="_blank">Spotify</a>
            </div>

            <div v-if="currentTab === 'Music' && selectedIndex === 6">
              <h3 class="content-title">skysiam - pink garden (ft. Isaku)</h3>
              <p>This is the one I made. I selected this because I am cool, don't you agree?</p>
              <p>Nothing much to talk about it really.. except that.. I made this for a special someone</p>
              <a href="https://www.youtube.com/watch?v=yvqJui4oq24" target="_blank">YouTube</a>
            </div>

            <div v-if="currentTab === 'Music' && selectedIndex === 7">
              <h3 class="content-title">Pathcel Tarts - Oyasame(?)</h3>
              <p>I have no idea what Oyasame means.. is it japanese? did it spell Oyasumi wrong? i have so many questions</p>
              <p>Also I like this track</p>
              <a href="https://open.spotify.com/track/0tIBhanrKCc9SejXsMWhpP?si=1f8b58c18bd24e68" target="_blank">Spotify</a>
            </div>

            <div v-if="currentTab === 'Music' && selectedIndex === 8">
              <h3 class="content-title">Notice</h3>
              <p>This is a fun project with no commercial purpose and no public marketing. I have credited the tracks and put a link to streaming on their respective sections in this library.</p>
              <p>Some of these tracks have given permissions to use for non commercial purposes but not all! If you want any track removed from this project.. please contact me in my email: alnabidrm@gmail.com</p>
              <p>Can't wait for the time when breathing oxygen is no longer legal..</p>
              <p>Am I right?</p>
            </div>

            <!-- Notes -->
            <div v-if="currentTab === 'Notes' && selectedIndex === 0">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>I didn't have much time to test this program. I am not even sure if you're able to run this program right now! uh... i mean.. you are probably able to.. because you're reading this. I haven't written this anywhere else, did I?</p>
              <p>There could be alot of bugs.. maybe most of this program looks unfinished or outright doesnt work. I had very high ambitions but I could just do so much because of time. You probably hoped for more, and I hoped for more too. Sorry it didn't turn out very big content-wise. It was a difficult project.. but very short. Like you can speedrun every corner of this program in 10 seconds.</p>
              <p>If your computer exploded while running this program, I hope you have insurance and- my deepest condolences.</p>
            </div>


            <div v-if="currentTab === 'Notes' && selectedIndex === 1">
              <h3 class="content-title">Special Special Special Special</h3>
              <p>This whole project is dedicated to <b>you</b></p>
              <p>This day is very special to me, you are also very special to me. So this project is also very special to me. Because you're special, and this day is special to you, I hope this project is also very special to you. Do you know what else is special? I don't know. I like playing games and watching football. So playing games is special to me? and watching football is also very special to me? WHY AM I GETTING SIDETRACKED- well- basically- all I have to say is</p>
              <p>You are very special.</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 2">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>I actually thought about making this in a browser.. but this project got very complicated very fast. And my favourite browser wouldnt let me play audio on hover or on load :(( so i switched to making this on a program</p>
              <p>Well it was more difficult.. but it really fits the aesthetic!</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 3">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>This project I initially imagined it to be like video gamey- futiristic- retro etc. I don't know how much of that I successfully accomplished- you are the judge!</p>
              <p>I bumped into this amazing project on YouTube called "Sanctuary OS"- It involves futiristic console aesthetics so I basically just "copied" the idea. Inspiration would be a better word than copy but I really don't want that much credit. Check it out from the link below.</p>
              <a href="https://www.youtube.com/watch?v=d3KfkKXRDzk&list=RDd3KfkKXRDzk&start_radio=1&pp=ygUMc2FuY3R1YXJ5IG9zoAcB" target="_blank">YouTube - Sanctuary OS</a>
              <p>The OS is "Ara OS" is also taken from "Sanctuary <b>OS</b>". I picked Ara because this name is special to me. And "Simulation" means it's a fake operating system, just for fun.</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 4">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>I played around in blender and made a low poly and basic flower.</p>
              <img src="../assets/lpflower1.gif" alt="">
              <p>I'm not that good at modeling so it looks half-assed. I don't even know what kind of flower it is...</p>
              <p>Maybe I'll name it after you..</p>
              <p>Okay! Finalized name. This flower is now called Ara.</p>
              <p>When do I get noble peace prize for my brilliant invention?</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 5">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>I feel ashamed.</p>
              <p>If you clicked on "Start" from the Menu- you will know why am I ashamed.</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 6">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>It plays the same 6 songs on loop. Well, I did use "It's too cold" during development.. it's one of my songs.. I listened to it on repeat so much that it's all that is playing in my head. Well, mainly because I have nothing on my head anyway- so it slipped in easily.</p>
              <p>I was tight on time or else I would make a dedicated radio page.. maybe some day.. i dont know</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 7">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>I wanted to do so much more! but sadly it didnt happen because of time. It's a miracle that I have even done this much.</p>
              <p>I wanted to make more of my own songs. I wanted to make videos too. I wanted to make the themes more interesting. I wanted to make the music feature more interactive. I wanted to make more blender models. I wanted to make the background more interesting. I wanted to write more notes too so you could read longer..</p>
              <p>It's really sad, all I can say is that I'm genuinely sorry.</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 8">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>July 15th is when I started this project.. I have to complete it by 22nd July. That's 7 days? idk im bad at math</p>
              <img src="../assets/setup.png">
              <p>Here's a screenshot after first few lines of code after setup.</p>
              <p>I am using Vue.js to create to program.</p>
              <p>Or should I say- I have used vue.js.. because you know if youre reading this I have already finished making this program.</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 9">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>Here is a screenshot of the early ideas for the UI. I think the current interface is much better though..</p>
              <img src="../assets/interface.png">
              <p>As you can see, I have also moved from browser to program. It's still web-based. I am using Electron.js with Vue.js. I have moved to program solely because I couldnt play audio on load or on hover in browser.. I guess it was a good decision but very difficult too</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 10">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>Here is what I wrote in my notes at this day:</p>
              <p>"I feel like the scope of this project is too big. I still have a lot to do. My head kinda hurts right now, had a really bad stomach ache whole day too. Writing this at 4AM. CANT WAIT to work on this tomorrow again"</p>
              <p>My present self responds to my old self with:</p>
              <p>"Lol noob"</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 11">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>it is 9:18PM right now. So roughly less than 3 hours left. I have to finish this project fast.</p>
              <p>I have added the skip to next song, go back to previous song and the pause feature for music today.</p>
              <p>I have added some more features like dragging window, fixed some bugs, and I am writing notes in Library right now.</p>
              <p>I just have to build this program to .exe later and send it to you. Seems easy but I only have 3 hours left so I'm pretty nervous right now.</p>
              <p>I wonder.. does reading these notes make you feel like you're time travelling?</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 12">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>This is the special moment.</p>
              <p>Maybe I went through difficulties but I do not regret even a bit working on this project. I honestly wanetd to do even more.. and honestly maybe this project doesn't seem that personally attached and I am sorry for that. This is dedicated to you. This is my gift to you. A bit silly because you're 20 now.. but I hope this conquers a special place in your life.</p>
              <p>I have given you more gifts previously and I think this one was the most ambitious, if I had more time it wouldve been better.</p>
              <p>Any frustration that I had during working on this project is just because i suck at coding, I do not regret working on this project whatsoever. I love this project. It was the most complicated and interactive gift to date. I couldn't think of anything better to give. A very busy week but I think it paid off at the end.</p>
              <p>Let's stop talking about the app and let's talk more about you. (I suck at writing notes too apparently, not just coding.)</p>
              <p>You know, last few months I think I'm losing some of the signature parts of my personality. For example, I talk less, I have become worse in consoling people, I haven't really talked deeply about my life. And I think this note that you're reading today could be a surprise. I never really lost these parts of my personality, but I'm afraid I am becoming more and more dull and bland and empty. I am flavorless. I feel like I'm a void.</p>
              <p>Right, right, sorry, no depression in this day!</p>
              <p>But one thing for sure.. I still love you.</p>
              <p>Cake.</p>
              <p>&lt;3</p>
            </div>

            <div v-if="currentTab === 'Notes' && selectedIndex === 13">
              <h3 class="content-title">{{ items[selectedIndex]?.title }}</h3>
              <p>This is 9:32PM. And it is the last note. Let's finish this up quickly.</p>
              <p>It is now 9:45PM, I have finished writing this note (I added this paragraph after writing everything below it). I will now build this app and pray to god everything goes well.</p>
              <p>Maybe the future won't allow some good things we both wish for. Maybe this project will be forgotten and won't be cared for. But it is a memory. It is special to both of us right now, that is what matters. You have seen it with your eyes, it is an event that occured in this universe. And i'm proud of it.</p>
              <p>Thanks for being with me.</p>
              <div class="app-details">
                <div class="detail">
                  <div class="type">
                    Product Name
                  </div>
                  <div class="value">
                    Ara OS Simulation
                  </div>
                </div>
                <div class="detail">
                  <div class="type">
                    Description
                  </div>
                  <div class="value">
                    A web-based fun project <br> that mimics a console OS interface.
                  </div>
                </div>
                <div class="detail">
                  <div class="type">
                    Build
                  </div>
                  <div class="value">
                    Demo
                  </div>
                </div>
                <div class="detail">
                  <div class="type">
                    Version
                  </div>
                  <div class="value">
                    1.0.0
                  </div>
                </div>
                <div class="detail">
                  <div class="type">
                    Stage
                  </div>
                  <div class="value">
                    Stable
                  </div>
                </div>
              </div>
              <p>Sayon<b>ara</b></p>
              <a href="https://github.com/alnabid/araoss">Github</a>
            </div>

          </div>
          <div class="close-btn" @click="close()">Close</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import audioMixin from '../mixins/audioMixin';

export default {
  mixins: [audioMixin],
  data() {
    return {
      visible: false,
      currentTab: 'Notes',
      selectedIndex: 0,
      tabs: ['Music', 'Notes'],
      itemsByTab: {
        Music: [
          { title: 'Playlist' },
          { title: 'Ambitions' },
          { title: 'Track 1: 2 AM Lucid' },
          { title: 'Track 2: sound test' },
          { title: 'Track 3: Games Bookstore' },
          { title: 'Track 4: press play' },
          { title: 'Track 5: pink garden' },
          { title: 'Track 6: Oyasame(?)' },
          { title: 'Notice' },
        ],
        Notes: [
          { title: 'Rough around the edges...' },
          { title: 'Letter' },
          { title: 'Why a program?' },
          { title: 'Design' },
          { title: 'Flower' },
          { title: 'Game' },
          { title: 'Music' },
          { title: 'Ambitions' },
          { title: 'Setup - July 15th' },
          { title: 'Interface - July 17th' },
          { title: 'Difficulties - July 20th' },
          { title: 'Polishing - July 21st' },
          { title: '<3 - July 22nd' },
          { title: 'Credits' },
        ]
      },
      itemRefs: []
    };
  },
  computed: {
    items() {
      return this.itemsByTab[this.currentTab];
    }
  },
  methods: {
    open() {
      this.visible = true;
      document.addEventListener('keydown', this.handleKey);
      document.addEventListener('mousedown', this.handleMouse);
    },
    close() {
      this.visible = false;
      this.playAudio('close');
      document.removeEventListener('keydown', this.handleKey);
      document.removeEventListener('mousedown', this.handleMouse);
    },
    switchTab(tab) {
      this.currentTab = tab;
      this.selectedIndex = 0;
      this.playAudio('click');
    },
    selectItem(index) {
      this.selectedIndex = index;
      this.playAudio('select');
      this.scrollToSelected();
    },
    scrollToSelected() {
      this.$nextTick(() => {
        const selectedEl = this.itemRefs[this.selectedIndex];
        if (selectedEl && selectedEl.scrollIntoView) {
          selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    },
    handleKey(e) {
      if (!this.visible) return;

      const currentTabIndex = this.tabs.indexOf(this.currentTab);

      switch (e.key) {
        case 's':
        case 'S':
          if (this.selectedIndex < this.items.length - 1) {
            this.selectedIndex++;
            this.playAudio('select');
            this.scrollToSelected();
          }
          break;
        case 'w':
        case 'W':
          if (this.selectedIndex > 0) {
            this.selectedIndex--;
            this.playAudio('select');
            this.scrollToSelected();
          }
          break;
        case 'Tab':
          e.preventDefault();
          const nextTabIndex = (currentTabIndex + 1) % this.tabs.length;
          this.switchTab(this.tabs[nextTabIndex]);
          break;
        case ' ':
        case 'Backspace':
          this.close();
          break;
      }
    },
    handleMouse(e) {
      if (!this.visible) return;
      if (e.button === 1) this.close();
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
};
</script>

<style scoped>
.deatil .value {
  width: 200px;
}
.detail .type {
  font-weight: bold;
  width: 200px;
}
.detail {
  display: flex;
  gap: 1rem;
}
.app-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.content-title {
  font-size: 1.5rem;
}
.content > div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.title-input {
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  outline: none;
  width: 100%;
}
.title-input:focus {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
section {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Space Mono';
  backdrop-filter: blur(5px);
}
.Deeppink section {
  background: rgba(73, 0, 35, 0.263);
}
.Grass section {
  background: rgba(0, 73, 7, 0.263);
}
.Night section {
  background: rgba(49, 0, 73, 0.263);
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.tabs {
  display: flex;
  gap: 3rem;
}
.tab {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
}
.tab.active {
  font-weight: bold;
}
.Deeppink .tab.active {
  background: var(--deeppink-1);
}
.Grass .tab.active {
  background: var(--grass-1);
}
.Night .tab.active {
  background: var(--night-1);
}
.main {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: start;
  height: fit-content;
  overflow: hidden;
  margin-top: 3rem;
  gap: 1rem;
}
.table {
  width: 30%;
  overflow-y: auto;
  height: 250px;
}
.item {
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  cursor: pointer;
  color: white;
}
.Deeppink .item.selected {
  background: var(--deeppink-1);
}
.Grass .item.selected {
  background: var(--grass-1);
}
.Night .item.selected {
  background: var(--night-1);
}
.number {
  font-weight: bold;
}
.right {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.content {
  width: 100%;
  padding: 1rem;
  color: var(--black);
  overflow-y: auto;
  height: 350px;
}
.Deeppink .content {
  background: var(--deeppink-2);
  border: 3px solid var(--deeppink-1);
}
.Grass .content {
  background: var(--grass-2);
  border: 3px solid var(--grass-1);
}
.Night .content {
  background: var(--night-2);
  border: 3px solid var(--night-1);
}
.close-btn {
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  width: fit-content;
  margin: 1rem 0;
  align-self: flex-end;
  cursor: pointer;
}
.Deeppink .close-btn {
  background: var(--deeppink-1);
}
.Grass .close-btn {
  background: var(--grass-1);
}
.Night .close-btn {
  background: var(--night-1);
}
.content a {
  width: fit-content;
  text-decoration: none;
  color: unset;
  padding: 0.5rem;
}
.Deeppink .content a {
  background: var(--deeppink-1)
}
.Grass .content a {
  background: var(--grass-1)
}
.Night .content a {
  background: var(--night-1)
}
.keybinds {
  bottom: 80px;
}

/* Custom Scrollbar Styling */
.table::-webkit-scrollbar,
.content::-webkit-scrollbar {
  width: 8px;
}

.table::-webkit-scrollbar-track,
.content::-webkit-scrollbar-track {
  background: transparent;
}

.table::-webkit-scrollbar-thumb,
.content::-webkit-scrollbar-thumb {
  border-radius: 4px;
}

/* Deeppink theme */
.Deeppink .table::-webkit-scrollbar-thumb {
  background-color: var(--deeppink-2);
}
.Deeppink .content::-webkit-scrollbar-thumb {
  background-color: var(--deeppink-1);
}

/* Grass theme */
.Grass .table::-webkit-scrollbar-thumb {
  background-color: var(--grass-2);
}
.Grass .content::-webkit-scrollbar-thumb {
  background-color: var(--grass-1);
}

/* Night theme */
.Night .table::-webkit-scrollbar-thumb {
  background-color: var(--night-2);
}
.Night .content::-webkit-scrollbar-thumb {
  background-color: var(--night-1);
}

.content * {
  user-select: text;
}
</style>
