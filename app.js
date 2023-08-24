import { getSongs, getSong, editSong, setVolume, getVolume, deleteSong, deleteAllSongs, addLocalFileSong, setArtwork, wasStoreEmpty, sortSongsBy } from "./store.js";
import { Player } from "./player.js";
import { formatTime, openFilesFromDisk, getFormattedDate, canShare, analyzeDataTransfer, getImageAsDataURI } from "./utils.js";
import { importSongsFromFiles } from "./importer.js";
import { Visualizer } from "./visualizer.js";
import { exportSongToFile } from "./exporter.js";
import { loadCustomOrResetSkin, reloadStoredCustomSkin } from "./skin.js";
import { startRecordingAudio, stopRecordingAudio } from "./recorder.js";
import { createSongUI, removeAllSongs, createLoadingSongPlaceholders, removeLoadingSongPlaceholders } from "./song-ui-factory.js";
import { initMediaSession } from "./media-session.js";
import { initKeyboardShortcuts } from "./keys.js";

// Whether the app is running in the Microsoft Edge sidebar.
const isSidebarPWA = (() => {
  if (navigator.userAgentData) {
    return navigator.userAgentData.brands.some(b => {
      return b.brand === "Edge Side Panel";
    });
  }

  return false;
})();

// Whether we are running as an installed PWA or not.
const isInstalledPWA = window.matchMedia('(display-mode: window-controls-overlay)').matches ||
                       window.matchMedia('(display-mode: standalone)').matches;

// All of the UI DOM elements we need.
const playButton = document.getElementById("playpause");
const playButtonLabel = playButton.querySelector("span");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const playHeadInput = document.getElementById("playhead");
const visualizerButton = document.getElementById("toggle-visualizer");
const visualizerEl = document.getElementById("waveform");
const volumeInput = document.getElementById("volume");
const currentTimeLabel = document.getElementById("currenttime");
const durationLabel = document.getElementById("duration");
const playlistEl = document.querySelector(".playlist");
export const playlistSongsContainer = document.querySelector(".playlist .songs");
const addSongsButton = document.getElementById("add-songs");
const songActionsPopover = document.getElementById("song-actions-popover");
const songActionDelete = document.getElementById("song-action-delete");
const songActionCopyUri = document.getElementById("song-action-copy-uri");
const songActionExport = document.getElementById("song-action-export");
const songActionShare = document.getElementById("song-action-share");
const playlistActionsButton = document.getElementById("playlist-actions");
const playlistActionsPopover = document.getElementById("playlist-actions-popover");
const playlistActionDeleteAll = document.getElementById("playlist-action-delete");
const playlistActionExportAll = document.getElementById("playlist-action-export");
const playlistActionAbout = document.getElementById("playlist-action-about");
const playlistActionSortByArtist = document.getElementById("playlist-action-sortbyartist");
const playlistActionSortByAlbum = document.getElementById("playlist-action-sortbyalbum");
const playlistActionSortByDateAdded = document.getElementById("playlist-action-sortbydateadded");
const loadCustomSkinButton = document.getElementById("load-custom-skin");
const recordAudioButton = document.getElementById("record-audio");
const aboutDialog = document.getElementById("about-dialog");
const installButton = document.getElementById("install-button");
const currentSongSection = document.querySelector('.current-song');

let currentSongEl = null;

let isFirstUse = true;

// Instantiate the player object. It will be used to play/pause/seek/... songs. 
const player = new Player();

// Initialize the media session.
initMediaSession(player);

// Instantiate the visualizer object to draw the waveform.
const visualizer = new Visualizer(player, visualizerEl);

// Aa simple interval loop is used to update the UI (e.g. the playhead and current time).
let updateLoop = null;

// The update loop.
function updateUI() {
  // Reset the play states in the playlist. We'll update the current one below.
  playlistSongsContainer.querySelectorAll(".playing").forEach(el => el.classList.remove('playing'));
  playButton.classList.remove('playing');
  playButtonLabel.textContent = 'Play';
  playButton.title = 'Play (space)';
  document.documentElement.classList.toggle('playing', false);

  if (!player.song) {
    // No song is loaded. Show the default UI.
    playHeadInput.value = 0;
    currentTimeLabel.textContent = "00:00";
    durationLabel.textContent = "00:00";

    return;
  }

  // Update the play head and current time/duration labels.
  const currentTime = player.currentTime;
  const duration = player.duration;

  playHeadInput.value = currentTime;
  playHeadInput.max = duration;

  currentTimeLabel.innerText = formatTime(currentTime);
  durationLabel.innerText = formatTime(duration);

  if (player.isPlaying) {
    playButton.classList.add('playing');
    playButtonLabel.textContent = 'Pause';
    playButton.title = 'Pause (space)';
    document.documentElement.classList.toggle('playing', true);
  }

  // Update the play state in the playlist.
  const currentSong = playlistSongsContainer.querySelector(`[id="${player.song.id}"]`);
  currentSong && currentSong.classList.add('playing');
}

// Calling this function starts (or reloads) the app.
// If the store is changed, you can call this function again to reload the app.
export async function startApp() {
  clearInterval(updateLoop);

  removeLoadingSongPlaceholders(playlistSongsContainer);

  // Restore the volume from the store.
  const previousVolume = await getVolume();
  player.volume = previousVolume === undefined ? 1 : previousVolume;
  volumeInput.value = player.volume * 10;

  // Restore the skin from the store.
  await reloadStoredCustomSkin();

  // Reload the playlist from the store.
  const songs = await player.loadPlaylist();

  // Populate the playlist UI.
  removeAllSongs(playlistSongsContainer);
  for (const song of songs) {
    const playlistSongEl = createSongUI(playlistSongsContainer, song);

    playlistSongEl.addEventListener('play-song', () => {
      player.pause();
      player.play(song);
      currentSongEl = playlistSongEl;
    });

    playlistSongEl.addEventListener('edit-song', e => {
      editSong(song.id, e.detail.title, e.detail.artist, e.detail.album);
    });

    playlistSongEl.addEventListener('show-actions', e => {
      // songActionsPopover.showPopover();

      // TODO: anchoring is not yet supported. Once it is, use the ID passed in the event.
      // This is the ID for the button that was clicked.
      // songActionsPopover.setAttribute('anchor', e.detail.id);
      // In the meantime, anchor manually.
      songActionsPopover.style.left = `${e.detail.x - songActionsPopover.offsetWidth}px`;
      songActionsPopover.style.top = `${e.detail.y - playlistEl.scrollTop}px`;

      songActionsPopover.currentSong = song;

      songActionShare.disabled = !canShare(song);
      songActionCopyUri.disabled = song.type !== 'url';
    });
  }

  playlistEl.classList.toggle('has-songs', songs.length > 0);

  // Start the update loop.
  updateLoop = setInterval(updateUI, 500);

  // Show the about dialog if this is the first time the app is started.
  if (wasStoreEmpty && isFirstUse && !isInstalledPWA && !isSidebarPWA) {
    aboutDialog.showModal();
    isFirstUse = false;
  }
}

// Below are the event handlers for the UI.

// Manage the play button.
playButton.addEventListener("click", () => {
  if (player.isPlaying) {
    player.pause();
  } else {
    player.play();
  }
});

// Seek on playhead input.
playHeadInput.addEventListener("input", () => {
  player.currentTime = playHeadInput.value;
});

// Manage the volume input
volumeInput.addEventListener("input", () => {
  player.volume = volumeInput.value / 10;
  setVolume(player.volume);
});

// Manage the previous and next buttons.
function goPrevious() {
  // If this happened in the first few seconds of the song, go to the previous one.
  // Otherwise just restart the current song.
  const time = player.currentTime;
  const isSongStart = time < 3;

  if (isSongStart) {
    player.playPrevious();
  } else {
    player.currentTime = 0;
  }
}

previousButton.addEventListener("click", () => {
  goPrevious();
});

nextButton.addEventListener("click", () => {
  player.playNext();
});

// Also go to the next or previous songs if the SW asks us to do so.
navigator.serviceWorker.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'play':
      player.play();
      break;
    case 'next':
      player.playNext();
      break;
    case 'previous':
      goPrevious();
      break;
  }
});

// Listen to player playing/paused status to update the visualizer.
player.addEventListener("canplay", async () => {
  isVisualizing() && visualizer.start();

  // Also tell the SW we're playing.
  const artworkUrl = player.song.artworkUrl
    ? await getImageAsDataURI(player.song.artworkUrl)
    : 'https://microsoftedge.github.io/Demos/pwamp/adata:image/png;base64,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lbum-art-placeholder.png';

  await sendMessageToSW({
    action: 'playing',
    song: player.song.title,
    artist: player.song.artist,
    playing: true,
    artworkUrl
  });

  // Update the current song section.
  currentSongSection.innerHTML = '';
  createSongUI(currentSongSection, player.song, true);
});

player.addEventListener("paused", () => {
  isVisualizing() && visualizer.stop();

  // Also tell the SW we're paused.
  sendMessageToSW({ action: 'paused' });
});

async function sendMessageToSW(data) {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration.active) {
    registration.active.postMessage(data);
  }
}

// Listen to beforeunload to clean things up.
addEventListener('beforeunload', () => {
  sendMessageToSW({ action: 'paused' });
});

// Listen to song errors to let the user know they can't play remote songs while offline.
player.addEventListener("error", () => {
  if (currentSongEl) {
    currentSongEl.classList.add('error');
  }
});
player.addEventListener("playing", () => {
  if (currentSongEl) {
    currentSongEl.classList.remove('error');
  }
});

// Manage the add song button.
addSongsButton.addEventListener("click", async () => {
  const files = await openFilesFromDisk();

  createLoadingSongPlaceholders(playlistSongsContainer, files.length);

  await importSongsFromFiles(files);

  await startApp();
});

// Manage the song actions.
songActionDelete.addEventListener("click", async () => {
  const song = songActionsPopover.currentSong;
  if (!song) {
    return;
  }

  songActionsPopover.currentSong = null;
  songActionsPopover.hidePopover();

  await deleteSong(song.id);
  await startApp();
});

songActionExport.addEventListener("click", async () => {
  const song = songActionsPopover.currentSong;
  if (!song) {
    return;
  }

  songActionsPopover.currentSong = null;
  songActionsPopover.hidePopover();

  await exportSongToFile(song);
});

songActionShare.addEventListener("click", async () => {
  const song = songActionsPopover.currentSong;
  if (!song || !canShare(song.data)) {
    return;
  }

  songActionsPopover.currentSong = null;
  songActionsPopover.hidePopover();

  navigator.share({
    title: song.title,
    files: [song.data]
  });
});

songActionCopyUri.addEventListener("click", async () => {
  const song = songActionsPopover.currentSong;
  if (!song || song.type !== 'url') {
    return;
  }

  songActionsPopover.currentSong = null;
  songActionsPopover.hidePopover();

  // The current song is a remote one. Let's create a web+amp link for it.
  const url = `web+amp:remote-song:${song.id}`;

  // And put it into the clipboard.
  await navigator.clipboard.writeText(url);
});

// Manage the custom skin button.
loadCustomSkinButton.addEventListener('click', async () => {
  await loadCustomOrResetSkin();
});

function isVisualizing() {
  return document.documentElement.classList.contains('visualizing');
}

// Manage the visualizer button.
visualizerButton.addEventListener('click', toggleVisualizer);

function toggleVisualizer() {
  const isVis = isVisualizing();

  // If we're asked to visualize but no song is playing, start the first song.
  if (!isVis && !player.isPlaying) {
    player.play();
  }

  const label = isVis ? 'Show visualizer (V)' : 'Stop visualizer (V)';
  visualizerButton.title = label;
  visualizerButton.querySelector('span').textContent = label;

  document.documentElement.classList.toggle('visualizing');

  isVis ? visualizer.stop() : visualizer.start();
}

// Manage the record audio button.
recordAudioButton.addEventListener('click', async () => {
  const isRecording = recordAudioButton.classList.contains('recording');

  recordAudioButton.classList.toggle('recording', !isRecording);
  const label = !isRecording ? 'Stop recording' : 'Record an audio clip';
  recordAudioButton.title = label;
  recordAudioButton.querySelector('span').textContent = label;

  if (isRecording) {
    const { blob, duration } = await stopRecordingAudio();
    // Because audio recordings come with a duration already, no need to call
    // importSongFromFile, we can go straight to addLocalFileSong.
    await addLocalFileSong(blob, getFormattedDate(), 'Me', 'Audio recordings', formatTime(duration));
    await startApp();
  } else {
    await startRecordingAudio();
  }
});

// Manage the more tools button.
playlistActionsButton.addEventListener('click', () => {
  // playlistActionsPopover.showPopover();
  playlistActionsPopover.style.left = `${playlistActionsButton.offsetLeft + (playlistActionsButton.offsetWidth / 2) - (playlistActionsPopover.offsetWidth / 2)}px`;
  playlistActionsPopover.style.top = `calc(${playlistActionsButton.offsetTop - playlistActionsPopover.offsetHeight}px - 1rem)`;
});

playlistActionDeleteAll.addEventListener('click', async () => {
  await deleteAllSongs();
  playlistActionsPopover.hidePopover();
  await startApp();
});

playlistActionSortByArtist.addEventListener('click', async () => {
  await sortSongsBy('artist');
  playlistActionsPopover.hidePopover();
  await startApp();
});

playlistActionSortByAlbum.addEventListener('click', async () => {
  await sortSongsBy('album');
  playlistActionsPopover.hidePopover();
  await startApp();
});

playlistActionSortByDateAdded.addEventListener('click', async () => {
  await sortSongsBy('dateAdded');
  playlistActionsPopover.hidePopover();
  await startApp();
});

playlistActionExportAll.addEventListener('click', async () => {
  const songs = await getSongs();
  await Promise.all(songs.map(song => exportSongToFile(song)));
  playlistActionsPopover.hidePopover();
});

playlistActionAbout.addEventListener('click', () => {
  if (typeof aboutDialog.showModal === "function") {
    aboutDialog.showModal();
  }
});

if (!isInstalledPWA && !isSidebarPWA) {
  window.addEventListener('beforeinstallprompt', e => {
    // Don't let the default prompt go.
    e.preventDefault();

    // Instead, wait for the user to click the install button.
    aboutDialog.addEventListener('close', () => {
      if (aboutDialog.returnValue === "install") {
        e.prompt();
      }
    });
  });
} else {
  installButton.disabled = true;
}

addEventListener('appinstalled', () => {
  aboutDialog.close();
});

// Manage drag/dropping songs from explorer to playlist.
addEventListener('dragover', e => {
  e.preventDefault();

  // If we're visualizing, don't allow dropping.
  if (document.documentElement.classList.contains('visualizing')) {
    return;
  }

  // If both songs and images are being dragged, or if other file types are being dragged, don't allow dropping.
  const { containsImages, containsSongs, containsOthers } = analyzeDataTransfer(e);
  if (containsOthers || (containsImages && containsSongs)) {
    return;
  }

  if (containsImages) {
    document.documentElement.classList.add('dropping-artwork');
  } else if (containsSongs) {
    document.documentElement.classList.add('dropping-songs');
  }
});

addEventListener('dragleave', e => {
  e.preventDefault();

  // If we're visualizing, don't allow dropping.
  if (document.documentElement.classList.contains('visualizing')) {
    return;
  }

  // If both songs and images are being dragged, or if other file types are being dragged, don't allow dropping.
  const { containsImages, containsSongs, containsOthers } = analyzeDataTransfer(e);
  if (containsOthers || (containsImages && containsSongs)) {
    return;
  }

  document.documentElement.classList.remove('dropping-songs');
  document.documentElement.classList.remove('dropping-artwork');
});

addEventListener('drop', async (e) => {
  e.preventDefault();

  // If we're visualizing, don't allow dropping.
  if (document.documentElement.classList.contains('visualizing')) {
    return;
  }

  // If both songs and images are being dragged, or if other file types are being dragged, don't allow dropping.
  const { containsImages, containsSongs, containsOthers, files } = analyzeDataTransfer(e);
  if (containsOthers || (containsImages && containsSongs)) {
    return;
  }

  if (containsSongs) {
    document.documentElement.classList.remove('dropping-songs');

    createLoadingSongPlaceholders(playlistSongsContainer, files.length);

    await importSongsFromFiles(files);

    await startApp();
  } else if (containsImages) {
    document.documentElement.classList.remove('dropping-artwork');

    // Only the first artwork is imported.
    const image = files[0];

    const targetSong = e.target.closest('.playlist-song');
    if (targetSong) {
      const song = await getSong(targetSong.id);
      if (song) {
        await setArtwork(song.artist, song.album, image);
      }
    }

    await startApp();
  }
});

// Start the app.
startApp();

// When we first start, tell the SW we're not playing.
sendMessageToSW({ action: 'paused' });

// Initialize the shortcuts.
initKeyboardShortcuts(player, toggleVisualizer);