let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
console.log(i);

let album = albums[i];

if(!album){
    container.innerHTML = `Ошибка! Редирект на главную страницу через 5 секунд`
    window.location.pathname=`index.html`

}else{


container.innerHTML =`
<div class="card mb-3">
<div class="row">
    <div class="col-md-4">
        <img src="${album.img}" alt="" class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.description}</p>
            <p class="card-text"><small class="class-muted">Сборник выпущен в ${album.year} году</small></p>
        </div>
    </div>
</div>
</div>
`
let playlist = document.querySelector(`.playlist`);

let tracks = album.tracks;
for(let j=0; j<tracks.length; j++){
    let track = tracks[j];
    playlist.innerHTML += `
    <li class="track list-group-item d-flex align-items-center">
    <img class="img-pause me-3" src="assets/stop.png" height='30px'>
    <img class="img-play me-3 d-none" src="assets/2.png" height='30px'>
    <div>
        <div>${track.title}</div>
        <div class="text-secondary">${track.authuor}</div>
    </div>
    <div class="ms-auto">${track.time}</div>
    <audio class="audio" src="${track.src}"></audio>
    </li>
    `
    }




function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`); 
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i];  
        let timeNode = node.querySelector(`.time`);
        let imgPause = node.querySelector(`.img-pause`);
        let imgPlay = node.querySelector(`.img-play`);
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`); 

        let isPlaying = false;
        node.addEventListener(`click`, function () {
    // Если трек сейчас играет...
    if (isPlaying) {
        isPlaying = false;
        // Поставить на паузу
        audio.pause();
        imgPause.classList.remove(`d-none`);
        imgPlay.classList.add(`d-none`);
    // Если трек сейчас не играет...
    } else {
        isPlaying = true;
        // Включить проигрывание
        audio.play();

        imgPause.classList.add(`d-none`);
        imgPlay.classList.remove(`d-none`);
        updateProgress();
    }
 });
 function updateProgress() {
    // Нарисовать актуальное время
    timeNode.innerHTML = audio.currentTime;
  
    // Нужно ли вызвать её ещё раз?
    if (isPlaying) {
          requestAnimationFrame(updateProgress);
    }
    
  }
    }
}
setupAudio();

}