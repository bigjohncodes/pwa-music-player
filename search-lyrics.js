const searchSongs = async () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  toggleSpinner();
  // Load Data
  const res = await fetch(url);
  const data = await res.json();
  displaySongs(data.data);
};

// const searchSongs = () => {
//     const searchText = document.getElementById("search-field").value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     // Load Data
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displaySongs(data.data))
//     .catch(data => displayError('Something Went Wrong!! Please Try Again Later.'));
//   };

document.getElementById('search-field')
.addEventListener('keypress', function(event){
    // event.preventDefault();
    // console.log(event.event.key);
    if(event.key == 'Enter'){
        document.getElementById('search-button').click();
    } 
})

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    // if(show){
    //     spinner.classList.remove('d-none');
    // }
    // else{
    //     spinner.classList.add('d-none');
    // }
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
    
}

const displaySongs = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = '';
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
    songContainer.appendChild(songDiv);
    toggleSpinner();
  });
};

const getLyric = async (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('Sorry! I Fales To Load Lyrics, Please Try Again Later!!!')
    }
}

// const getLyric = (artist, title) =>{
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
// }

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
    
}
