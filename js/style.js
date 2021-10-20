const music     = document.querySelector('audio');
const img       = document.querySelector('img');
const play      = document.getElementById('play');
const title     = document.getElementById('title');
const artist    = document.getElementById('artist');
const prev      = document.getElementById('prev');
const next      = document.getElementById('next');
let progress    = document.getElementById('progress');
let total_duration  = document.getElementById('duration'); 
let current_time= document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');

// array object
const songs = [
    {
        name    : 'play1',
        title   : 'song1',
        artist  : 'artist1',
        pic   : 'img1',
    },
    {
        name    : 'play2',
        title   : 'song2',
        artist  : 'artist2',
        pic   : 'img2',
    },
    {
        name    : 'play3',
        title   : 'song3',
        artist  : 'artist3',
        pic   : 'img3',
    }
]

let isPlaying = false;

// for play 
const playMusic = ()=>{
    isPlaying = true;
    music.play()
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('anime');
}

// for pause
    const pauseMusic = ()=>{
    isPlaying = false;
    music.pause()
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('anime');
}

play.addEventListener('click',()=>{
    isPlaying ?  pauseMusic() : playMusic();

});

// changing music data
const loadSong = (songs)=>{
    title.textContent   = songs.title;
    artist.textContent  = songs.artist;
    music.src           = `music/${songs.name}.mp3`;
    img.src             = `images/${songs.pic}.jpg`;
};
// loadSong(songs[2]);

// next and prev

songIndex = 0;
const nextSong = () =>{
    //songIndex++ ; for next but not work on looping
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () =>{
    //songIndex++ ; for next but not work on looping
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// progress bar
music.addEventListener('timeupdate', (event) => {
    const{currentTime,duration} = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration    
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    // console.log(tot_duration);
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }

    // current duration
    let min_currTime = Math.floor(currentTime/60);
    let sec_currTime = Math.floor(currentTime%60);
    
    // console.log(tot_duration);
    if(sec_currTime<10){
        sec_currTime = `0${sec_currTime}`;
    }
    let tot_currTime = `${min_currTime}:${sec_currTime}`;
    current_time.textContent = `${tot_currTime}`;
});

// music end and nest song started
music.addEventListener('ended', nextSong);

// process bar duration
progress_div.addEventListener('click',(event) => {
    const {duration} = music;
    let move_process = 
    (event.offsetX / event.srcElement.clientWidth) * duration;

    // console.log(duration);
    // console.log(move_process);
    music.currentTime = move_process;
});

next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);