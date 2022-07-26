
// * Render songs -> ok
// * Scroll top -> ok
// * Play / pause / seek -> ok
// * CD Rotate -> ok
// * Next / previous -> ok
// * Random -> ok
// * Next / Repeat when ended -> ok
// * Active song -> ok
// * Scroll active song into view -> ok
// * Play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const body = $('body')
const player = $('.player')
const playlist = $('.playlist')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const heading = $('header h3')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const timeRunSong = $('.time-run')
const fill = $('.bar .fill')
const timeDurationSong = $('.range .time-duration')
const option = $('.option')
const optionActive = $('.option-block')


const app = {

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    urlImgsBackground: [
        {
            id: 0,
            url: './assets/imgBackgrounds/img1.jpg'
        },
        {
            id: 1,
            url: './assets/imgBackgrounds/img2.jpg'
        },
        {
            id: 2,
            url: './assets/imgBackgrounds/img3.jpg'
        },
        {
            id: 3,
            url: './assets/imgBackgrounds/img4.jpg'
        },
        {
            id: 4,
            url: './assets/imgBackgrounds/img5.jpg'
        },
        {
            id: 5,
            url: './assets/imgBackgrounds/img6.jpg'
        }
    ],

    songs: [
        {
            name: 'Nova',
            author: 'Ahrix',
            path: './assets/songs/song1.mp3',
            image: './assets/imgs/song1.jpg'
        },
        {
            name: 'Spectre',
            author: 'Alan Walker',
            path: './assets/songs/song2.mp3',
            image: './assets/imgs/song2.jpg'
        },
        {
            name: 'Save Me',
            author: 'DREAMN',
            path: './assets/songs/song3.mp3',
            image: './assets/imgs/song3.jpg'
        },
        {
            name: 'Legend Never Die',
            author: 'Riot',
            path: './assets/songs/song4.mp3',
            image: './assets/imgs/song4.jpg'
        },
        {
            name: 'Robin Hustin',
            author: 'NCS',
            path: './assets/songs/song5.mp3',
            image: './assets/imgs/song5.jpg'
        },
        {
            name: 'MBB',
            author: 'Beach',
            path: './assets/songs/song6.mp3',
            image: './assets/imgs/song6.jpg'
        },
        {
            name: 'Lemon Tree',
            author: 'Fools Garden',
            path: './assets/songs/song7.mp3',
            image: './assets/imgs/favicon.jpg'
        },
        {
            name: 'Fly Away',
            author: 'TheFatRat',
            path: './assets/songs/song8.mp3',
            image: './assets/imgs/song8.jpg'
        },
        {
            name: 'Nhạc đám cưới',
            author: 'No singer',
            path: './assets/songs/song9.mp3',
            image: './assets/imgs/favicon.jpg'
        },
    ],

    theNextSong: function() {
        this.currentIndex >= this.songs.length -1 ? this.currentIndex = 0 : this.currentIndex++
        this.loadCurrentSong()
        this.loadTheActiveSong()
    },

    thePreviousSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        this.loadTheActiveSong()
    },

    theRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        this.loadTheActiveSong()
    },

    loadTimeRunSong: function() {
        const newTime = Math.floor(audio.currentTime)
        let minute = 0
        let seconds = 0

        minute = Math.floor(newTime / 60)
        seconds = newTime % 60

        timeRunSong.textContent = (minute < 10 ? minute = "0" + minute : minute) + ' : ' + (seconds < 10 ? seconds = "0" + seconds : seconds)   
    },

    loadTimeDurationSong: function() {
        // Time duration
        if (!audio.duration) {
            timeDurationSong.textContent = '00:00'
        }
        else {
            let minuteDuration = Math.floor(audio.duration / 60)
            let secondsDuration = Math.floor(audio.duration % 60)

            minuteDuration < 10 ? minuteDuration = "0" + minuteDuration : minuteDuration
            secondsDuration < 10 ? secondsDuration = "0" + secondsDuration : secondsDuration
            timeDurationSong.textContent = minuteDuration + ' : ' + secondsDuration
        }

    },

    loadCurrentSong: function() {
        // random background
        const randomNumber = Math.floor(Math.random() * this.urlImgsBackground.length)
        body.style.backgroundImage = `url('${this.urlImgsBackground[randomNumber].url}')`

        // body.style.backgroundImage = `url('${this.currentSong.image}')`
        
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    loadTheActiveSong: function() {
        const thePreActiveSong = $('.song.active')
        thePreActiveSong.classList.remove('active')
        const theCurrentSong = $(`.song[data-index="${this.currentIndex}"]`)
        theCurrentSong.classList.add('active')
    },

    activeSongIntoView: function() {
        const theActiveSong = $('.song.active')
        setTimeout(() => {
            theActiveSong.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 800)
    },

    setBarRange: function() {
        fill.style.width = progress.value + '%'
    },

    handleEvent: function() {
        const _this = this

        // handle zoom in / zoom out CD

        const cdWidth = cd.offsetWidth;

        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // handle CD rotation
        const rotateThumb = cdThumb.animate({
            transform: 'rotate(360deg)'
        },
        {
            duration: 10000,
            iterations: Infinity
        })
        rotateThumb.pause();

        // handle click play button
        playBtn.onclick = () => {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
                _this.activeSongIntoView()
            }

        }

        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
            rotateThumb.play()
        }

        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
            rotateThumb.pause()
        }

        // handle progress
        audio.ontimeupdate = () => {
            if (audio.duration) {
                progress.value = audio.currentTime / audio.duration * 100
            }
            // load time run
            _this.loadTimeRunSong()
            _this.setBarRange()
            this.loadTimeDurationSong()
        }
        
        // handle seek song
        progress.onchange = () => {
            audio.currentTime = progress.value / 100 * audio.duration
        }
        

        // handle next and previous button
        nextBtn.onclick = () => {

            if (_this.isRandom) {
                _this.theRandomSong();
            }
            else {
                _this.theNextSong()
            }
            audio.play()
            _this.activeSongIntoView()
        }

        prevBtn.onclick = () => {

            if (_this.isRandom) {
                _this.theRandomSong();
            }
            else {
                _this.thePreviousSong()
            }
            
            audio.play()
            _this.activeSongIntoView()
        }

        // handle random song
        randomBtn.onclick = function() {

            _this.isRandom = !_this.isRandom

            if ($('.btn.active') && repeatBtn.closest('.btn.active')) {
                $('.btn.active').classList.remove('active')
                randomBtn.classList.add('active')
                _this.isRepeat = !_this.isRepeat
            } 
            else {
                randomBtn.classList.toggle('active', _this.isRandom)
            }
        }

        // The next song / repeat when the song is ended
        // repeat
        repeatBtn.onclick = function() {

            _this.isRepeat = !_this.isRepeat

            if ($('.btn.active') && randomBtn.closest('.btn.active')) {
                $('.btn.active').classList.remove('active')
                repeatBtn.classList.add('active')
                _this.isRandom = !_this.isRandom
            } 
            else {
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }
        }

        // when the song is ended
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play()
            }
            else {
                if (_this.isRandom) {
                    _this.theRandomSong();
                }
                else {
                    _this.theNextSong()
                }
                audio.play()
                _this.activeSongIntoView()
            }
        }

        // active a song when click the song in the playlist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {

                // handle lick

                if (songNode && !e.target.closest('.option')) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.loadTheActiveSong()
                    _this.activeSongIntoView()
                    audio.play()
                }

                if (e.target.closest('.option')) {
                    optionActive.classList.remove('notActive')
                    optionActive.animate()
                }
            }
        }
        // handle turn off the option block
        $('.option-block .notice .icon').onclick = () => {
            optionActive.classList.add('notActive')
        }
    },

    render: function() {
        const htmls = this.songs.map((song, index) => `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.author}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        `)
        playlist.innerHTML = htmls.join('');
    },

    start: function() {
        
        this.defineProperties();

        this.loadCurrentSong();

        this.handleEvent();

        this.render();

    }
}

app.start();

