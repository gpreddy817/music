new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Dil ke paas",
          artist: "Armaan Malik",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/06%20Dil%20Ke%20Paas%20(Unplugged)%20Armaan%20Malik%20190Kbps.mp3",
          url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
          favorited: false
        },
        {
          name: "Aashiqui 2 theme",
          artist: "Mix",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/128-Aashiqui%20(The%20Love%20Theme)%20-%20Aashiqui%202%20128%20Kbps.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true
        },
        {
          name: "Desi Girl",
          artist: "Vishal",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/128-Desi%20Girl%20-%20Dostana%20128%20Kbps.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Aawar Sham",
          artist: "Ash",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/128-Aawara%20Shaam%20Hai%20-%20Meet%20Bros%20128%20Kbps.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false
        },
        {
          name: "Tum Hi Ho",
          artist: "Arijit Singh",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/128-Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true
        },
        {
          name: "Teri galiyaan",
          artist: "Ankit Tiwari",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/128-Galliyan%20-%20Ek%20Villain%20128%20Kbps.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false
        },
        {
          name: "Titli",
          artist: "Chinmayi",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/128-Titli%20-%20Chennai%20Express%20128%20Kbps.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "Sweety Sweety",
          artist: "Sidsharth Mahadevan",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/Sweety%20Sweety%20Video%20Song%20_Race%20Gurram%20Video%20Songs%20_%20Allu%20Arjun%2C%20Shruti%20hassan_S.S%20Thaman.m4a",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "gaganave baagi",
          artist: "Shreya Ghoshal",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://github.com/gpreddy817/music/raw/main/mp3/Gaganave-Baagi-Shreya-Ghoshal.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
