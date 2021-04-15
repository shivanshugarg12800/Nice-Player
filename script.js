const musicContainer = document.querySelector('.music-container')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const playBtn = document.querySelector('#play')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const audio = document.querySelector('#audio')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


// songs 
const songs = ['Few_Days', 'Gulab', 'Jatt_Te_Jawani']

let songIndex = 2;


// load songs in DOM
// function to load songs
loadSong(songs[songIndex]);

//---------------------------FUNCTIONS IMPLEMENTED ------------------------------
// update the song
function loadSong(song) {
    console.log(song);
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
}

function playSong() {
     musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    // load the song
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > (songs.length - 1)) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function progressBar(e) {
    // e.src element on console log gives the whole audio tag used in the html
    // it containes two properties duration and currentTime(time of the playing the song)
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    // this gives us the whole width of the container
    const width = this.clientWidth;

    // this will give us the x position of where we cliked
    const clickPos = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickPos / width) * duration;

}


// -------------------------------Event Listeners--------------------------------
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// audio api gives us the timeupdate event listener on the audio
audio.addEventListener('timeupdate', progressBar);
progressContainer.addEventListener('click', setProgress);
// we also have an ended eventListener in the audio
audio.addEventListener('ended', nextSong);