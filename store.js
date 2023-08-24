import { get, set } from './idb-keyval.js';
import { getUniqueId } from './utils.js';

export let wasStoreEmpty = false;

// Songs are stored in IDB as an array under the 'songs' key.
//
// Songs have unique IDs to identify them. Songs also have a title, artist, album, and duration.
// We do not read this information from the song file itself, this is stored in IDB too.
// 
// There are 2 types of songs: remote and file.
// A remote song is one that has a URL to a remote audio file. A remote song's ID is its URL.
// A file song is one that was loaded as a file from disk and stored in IDB. A file song's ID
// is a unique ID generated when importing the file.

/**
 * Get the list of all songs stored in IDB.
 */
export async function getSongs() {
  let songs = await get('pwamp-songs');

  if (!songs) {
    wasStoreEmpty = true;

    // The songs array doesn't even exist, so this is the first time we're running.
    // Add a couple of songs to get started so the app isn't empty.
    songs = [
    {
      type: 'url',
      id: 'https://microsoftedge.github.io/Demos/pwamp/songs/Reunion.mp3',
      title: 'Reunion',
      artist: 'David Rousset',
      album: 'Davrous Universe',
      duration: '03:40',
      dateAdded: Date.now()
    },
    {
      type: 'url',
      id: 'https://microsoftedge.github.io/Demos/pwamp/songs/OverTheStargates.mp3',
      title: 'Over The Stargates',
      artist: 'David Rousset',
      album: 'Davrous Universe',
      duration: '01:40',
      dateAdded: Date.now()
    },
    {
      type: 'url',
      id: 'https://archive.org/serve/DWK382/Noi2er_-_01_-_Opening.mp3',
      title: 'Opening',
      artist: 'Noi2er',
      album: 'Beyond Reality (Vacuum) (LP)',
      duration: '03:34',
      dateAdded: Date.now()
    },
    {
      type: 'url',
      id: 'https://archive.org/download/DWK382/Noi2er_-_06_-_Aloe-Almond_Butter_And_Space_Pesto.mp3',
      title: 'Aloe-Almond Butter And Space Pesto',
      artist: 'Noi2er',
      album: 'Beyond Reality (Vacuum) (LP)',
      duration: '01:29',
      dateAdded: Date.now()
    },
    {
      type: 'url',
      title: 'Cold Hearted', 
      artist: 'Glee',
      album: 'Glee',
      id: 'https://xbrpw.github.io/fusion/audio/00 Full Performance of Cold Hearted from Feud GLEE.mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: 'Beautiful Now ', 
      artist: 'Fulla Zed Jon Bellion',
      album: 'Beautiful Now',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/00 Fulla Zedd - Beautiful Now (Official Music Video) ft. Jon Bellion (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/01 [HD] Electro House _ Magic! - Rude (Zedd Remix) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/01 AB Gossip - Love Long Distance (Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/01 Fedde Le Grand and Sultan Ned Shepard - No Good (Official Music Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/01 Proyecto sin título.m4a',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/01 Sheppard - Geronimo (International Version) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/02 Alex Newell - Nobody to Love (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/02 Avicii - Wake Me Up (Official Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/03 American Authors - Best Day Of My Life (Official Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/05 Lana Del Rey vs Cedric Gervais ",Summertime Sadness", Remix (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/06 Alex Newell - This Ain",t Over [Official Audio] (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/07 Calvin Harris - My Way (Official Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/09 Calvin Harris - This Is What You Came For (Official Video) ft. Rihanna (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/10 Mónica Naranjo - Make You Rock (Official Music Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/10 Pharrell Williams - Happy (Official Music Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/12 Selena Gomez - Slow Down (Official Music Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/13 Federico Scavo - Funky Nassau (Radio Edit) [Official] (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/14 Like a Prayer - Madonna (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/20150701_111451_30082022.mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/20150708_104058_30082022.mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/20150708_110929_30082022.mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Boogie Oogie Oogie - A Taste Of Honey (HQ Audio) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_01 Dance Monkey Tones and I (sax cover Graziatto).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_ARIZONA ZERVAS - ROXANNE VIOLIN COVER(1).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_Backclash ft. Aarya - Never A Goodbye (Lyric Video).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_Backclash ft. Aarya - Never A Goodbye (Lyrics).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_C. TANGANA FT ROSALIA - ANTES DE MORIRME (LETRA).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_d Dua Lipa - Don",t Start Now (Lyrics Español) Video Official.mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_Dance Monkey - Tones And I (Cover by Alexander Stewart).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Convert_Demi Lovato – Sorry Not Sorry (Lyrics) 🎵(1).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/David Guetta Listen (feat. John Legend) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/DJane HouseKat Feat. Rameez - Girls In Luv (Official Audio) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Dua Lipa - Don",t Start Now -- Español (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Gnarls+Barkley+-+Crazy+(Official+Video) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/Offer Nissim ft. Maya - First time (Full Club Mix) (128 kbps).mp3',
      dateAdded: Date.now()
      },
      {
      type: 'url',
      title: '', 
      artist: '',
      album: '',
      duration: '',
      id: 'https://xbrpw.github.io/fusion/audio/We_Are_The_Brave.mp3',
      },
      {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 Dimestore Diamond.m4a',
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 Fulla Zedd - Beautiful Now (Official Music Video) ft. Jon Bellion (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 Fullb Phi Phi O",hara - Bitchy Official Music Video (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 Fullba Capital Cities - Safe And Sound (Official Music Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 Fullc XELLE ft Mimi Imfurst Queen Official Music Video (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 fullcd Sound Bell (Campana) (128 kbps) - copia.mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/00 Fulld Bon Jovi - It",s my life(Sub Español Lyrics) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/01 [HD] Electro House _ Magic! - Rude (Zedd Remix) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/01 AB Gossip - Love Long Distance (Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/01 Fedde Le Grand and Sultan Ned Shepard - No Good (Official Music Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/01 Proyecto sin título.m4a',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/01 Sheppard - Geronimo (International Version) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/01 Welcome To Disgraceland - Courtney Act (Official Music Video) HD (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/02 Alex Newell - Nobody to Love (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/02 Avicii - Wake Me Up (Official Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/02 Heavy Cross.m4a',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/02 One More Night (Cutmore Club Mix).m4a',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/03 American Authors - Best Day Of My Life (Official Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/04 Dem Beats (ft. RuPaul) by TODRICK HALL (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/05 Lana Del Rey vs Cedric Gervais ",Summertime Sadness", Remix (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/07 Calvin Harris - My Way (Official Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/09 Calvin Harris - This Is What You Came For (Official Video) ft. Rihanna (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/10 Andra feat. David Bisbal - Without You (Official Video).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/10 Jonas Brothers - Sucker (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/10 jonas c Andra - Shukar.mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/10 Mónica Naranjo - Make You Rock (Official Music Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/10 Pharrell Williams - Happy (Official Music Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/11 a Meghan Trainor - All About That Bass (Official Music Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/11 Guy Sebastian - Choir (Alan Walker Remix) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/11 Major Lazer – Light it Up (feat. Nyla & Fuse ODG) (Music Video Remix) by Method Studios (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/12 Selena Gomez - Slow Down (Official Music Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/13 Federico Scavo - Funky Nassau (Radio Edit) [Official] (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/14 Like a Prayer - Madonna (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Boogie Oogie Oogie - A Taste Of Honey (HQ Audio) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/David Guetta Listen (feat. John Legend) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/DECADE OF POP - The Megamix (2008-2018) -- by Adamusic.mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/DJ Snake - Middle ft. Bipolar Sunshine.mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/DJane HouseKat Feat. Rameez - Girls In Luv (Official Audio) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Dua Lipa - Don",t Start Now -- Español (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Espen Gulbrandsen Vs DJ Julian Vi.m4a',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Gnarls+Barkley+-+Crazy+(Official+Video) (128 kbps).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/J. Balvin, Willy William - Mi Gente (Official Video).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Justin Casse - Summer Waves (Official Video).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Kiesza - Hideaway (Official Video).mp3',
        dateAdded: Date.now()
        },
        {
        type: 'url',
        title: '', 
        artist: '',
        album: '',
        duration: '',
        id: 'https://xbrpw.github.io/fusion/en/Offer Nissim ft. Maya - First time (Full Club Mix) (128 kbps).mp3',
        },
        {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/00 Fulla Zedd - Beautiful Now (Official Music Video) ft. Jon Bellion (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/00 Fullba Capital Cities - Safe And Sound (Official Music Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/00 fullcd Sound Bell (Campana) (128 kbps) - copia.mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/00 Fulld Bon Jovi - It",s my life(Sub Español Lyrics) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/01 [HD] Electro House _ Magic! - Rude (Zedd Remix) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/01 AB Gossip - Love Long Distance (Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/01 Fedde Le Grand and Sultan Ned Shepard - No Good (Official Music Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/01 Sheppard - Geronimo (International Version) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/02 Alex Newell - Nobody to Love (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/02 Avicii - Wake Me Up (Official Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/03 American Authors - Best Day Of My Life (Official Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/05 Lana Del Rey vs Cedric Gervais ",Summertime Sadness", Remix (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/06 Alex Newell - This Ain",t Over [Official Audio] (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/07 Calvin Harris - My Way (Official Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/10 Mónica Naranjo - Make You Rock (Official Music Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/10 Pharrell Williams - Happy (Official Music Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/12 Selena Gomez - Slow Down (Official Music Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/13 Federico Scavo - Funky Nassau (Radio Edit) [Official] (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/14 Like a Prayer - Madonna (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/Boogie Oogie Oogie - A Taste Of Honey (HQ Audio) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/David Guetta Listen (feat. John Legend) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/DJane HouseKat Feat. Rameez - Girls In Luv (Official Audio) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/Dua Lipa - Don", Start Now -- Español (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/Gnarls+Barkley+-+Crazy+(Official+Video) (128 kbps).mp3',
          dateAdded: Date.now()
          },
          {
          type: 'url',
          title: '', 
          artist: '',
          album: '',
          duration: '',
          id: 'https://xbrpw.github.io/fusion/play/Offer Nissim ft. Maya - First time (Full Club Mix) (128 kbps).mp3',
          },
          {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/08 Camilo, Shakira, Pedro Capó - Tutu (Remix - Audio) (128 kbps).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/15 Lo Malo (Remix) (128 kbps).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/16 SOFIA ALVARO SOLER (LETRA) (128 kbps).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/17 Becky G - Mayores (Official Video) ft. Bad Bunny.mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/18 Becky G - Sola (Audio).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/19 Carlos Vives, Shakira - La Bicicleta (Official Video).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/20 Enrique Iglesias - DUELE EL CORAZON ft. Wisin.mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Enrique Iglesias - SUBEME LA RADIO (Official Video) ft. Descemer Bueno, Zion & Lennox.mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Fangoria - La revolución sexual (Lyric Video) (128 kbps).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Habla Como Hombre - (Me llamo) Sebastián.mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Hellogoodbye - Here (In Your Arms) (Official Video) (128 kbps).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Jesse & Joy - No Soy Una de Esas ft. Alejandro Sanz (Video Oficial).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Juan Magan - Baila Conmigo ft. Luciana.mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/La Rompe Corazones Video Oficial - Daddy Yankee ft Ozuna.mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Maluma - Felices los 4 (Official Video).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/María José - Du-AudioConverter.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Maria Jose Prefiero ser su amante [Letra].mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/María León - Locos (128 kbps).mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Mente mayor Christopher von Uckerman.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Nacho - Bailame.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Natti Natasha x Ozuna - Criminal [Official Video].mp3',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Prefiero ser su-Amante.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Ricky Martin - vente pa"ca.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Shakira - Chantantaje.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/Thalía - Desde -esa-noche.ogg',
            dateAdded: Date.now()
            },
            {
            type: 'url',
            title: '', 
            artist: '',
            album: '',
            duration: '',
            id: 'https://xbrpw.github.io/fusion/musica/TINI2C+Lalo+Ebrard.ogg',
            dateAdded: Date.now()
            },
            {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/00 Esteman - Baila (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/01 MEME - Todo Va a Estar Bien (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/02 Mabel - Boyfriend (Official Video) (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/03 Carlos+Rivera,+Becky+G,+Pedro+Capó+-+Perdiendo+la+Cabeza+(Lyric+Video) (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/04 Tiempo, Profetas - Vídeo Oficial (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/05 Matisse, Guaynaa • Imposible Amor • Letra (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/06 Carlos Rivera - Amo Mi Locura (Cover Audio) (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/07 Esteman, Javiera Mena - Amor Libre (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/08 Reyli Barba - Todo Lo Que Está Pasando Me Gusta (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/09 Feliz-Fanny Lu(Letra)El grinch soundtrack_LetrasLyrics (128 kbps).mp3',
              dateAdded: Date.now()
              },
              {
              type: 'url',
              title: '', 
              artist: '',
              album: '',
              duration: '',
              id: 'https://xbrpw.github.io/Mix/musica/10 Cuenta Regresiva De Minuto Para Ganar "Versión En Español" 2015 (128 kbps).mp3',
              dateAdded: Date.now()
              }
          
  ];

    await set('pwamp-songs', songs);

    // And store the artwork for those songs.
    await setArtwork('Noi2er', 'Beyond Reality (Vacuum) (LP)', 'https://ia803401.us.archive.org/11/items/DWK382/Noi2er_-_Beyond_Reality_Vacuum_Front.jpg');
    await setArtwork('David Rousset', 'Davrous Universe', 'https://microsoftedge.github.io/Demos/pwamp/songs/Reunion.jpg');
  }

  // Verify that all songs have the new dateAdded field,
  // If not, set it to the current date.
  for (let i = 0; i < songs.length; i++) {
    let needToStore = false;
    if (!songs[i].dateAdded) {
      songs[i].dateAdded = Date.now();
      needToStore = true;
    }

    if (needToStore) {
      await set('pwamp-songs', songs);
    }
  }

  return songs;
}

/**
 * Get a song by its ID.
 */
export async function getSong(id) {
  const songs = await getSongs();
  return songs.find(song => song.id === id);
}

/**
 * Check if the given remote song URL is already in IDB.
 */
export async function hasRemoteURLSong(url) {
  const songs = await getSongs();
  return !!songs.find(s => s.id === url);
}

/**
 * Add a new remote song to the list of songs in IDB.
 */
export async function addRemoteURLSong(url, title, artist, album, duration) {
  await addSong('url', url, title, artist, album, duration);
}

/**
 * DO NOT LOOP OVER THIS FUNCTION TO IMPORT SEVERAL FILES, THIS WILL LEAD TO
 * AN INCONSISTENT STORE STATE. USE addMultipleLocalFileSongs() INSTEAD.
 * Add a new file song to the list of songs in IDB.
 * The song is expected to be passed as a File object.
 */
export async function addLocalFileSong(file, title, artist, album, duration) {
  const id = getUniqueId();
  await addSong('file', id, title, artist, album, duration, file);
}

/**
 * Add several new file songs to the list of songs in IDB.
 */
export async function addMultipleLocalFileSongs(fileSongs) {
  fileSongs = fileSongs.map(fileSong => {
    return {
      title: fileSong.title,
      artist: fileSong.artist,
      album: fileSong.album,
      duration: fileSong.duration,
      data: fileSong.file,
      type: 'file',
      id: getUniqueId(),
      dateAdded: Date.now()
    }
  });

  let songs = await getSongs();
  songs = [...songs, ...fileSongs];
  await set('pwamp-songs', songs);
}

/**
 * Private implementation of addSong.
 */
async function addSong(type, id, title, artist, album, duration, data = null) {
  const song = {
    type,
    id,
    title,
    artist,
    album,
    duration,
    dateAdded: Date.now(),
    data
  };

  let songs = await getSongs();
  songs.push(song);
  await set('pwamp-songs', songs);
}

/**
 * Given the unique ID to an existing song, edit its title, artist and album.
 */
export async function editSong(id, title, artist, album) {
  const songs = await getSongs();
  const song = songs.find(s => s.id === id);
  if (!song) {
    throw new Error(`Could not find song with id ${id}`);
  }

  song.title = title;
  song.artist = artist;
  song.album = album;

  await set('pwamp-songs', songs);
}

/**
 * Given the unique ID to an existing song, delete it from IDB.
 */
export async function deleteSong(id) {
  let songs = await getSongs();
  songs = songs.filter(song => song.id !== id);
  await set('pwamp-songs', songs);
}

/**
 * Delete all songs from IDB.
 */
export async function deleteAllSongs() {
  await set('pwamp-songs', []);
}

export async function sortSongsBy(field) {
  if (['dateAdded', 'title', 'artist', 'album'].indexOf(field) === -1) {
    return;
  }

  let songs = await getSongs();

  songs = songs.sort((a, b) => {
    if (a[field] < b[field]) {
      return field === 'dateAdded' ? 1 : -1;
    } else if (a[field] > b[field]) {
      return field === 'dateAdded' ? -1 : 1;
    } else {
      return 0;
    }
  });
  await set('pwamp-songs', songs);
}

/**
 * Set the volume in IDB so that we can remember it next time.
 */
export async function setVolume(volume) {
  await set('pwamp-volume', volume);
}

/**
 * Get the stored volume.
 */
export async function getVolume() {
  return await get('pwamp-volume');
}

/**
 * Set a custom skin in IDB.
 */
export async function setCustomSkin(skin) {
  await set('pwamp-customSkin', skin);
}

/**
 * Get the currently stored custom skin.
 */
export async function getCustomSkin(skin) {
  return await get('pwamp-customSkin');
}

/**
 * Store a new artwork for the given artist and album.
 */
export async function setArtwork(artist, album, image) {
  let artworks = await get('pwamp-artworks');
  if (!artworks) {
    artworks = {};
  }
  artworks[`${artist}-${album}`] = image;
  await set('pwamp-artworks', artworks);
}

/**
 * Get the stored artworks.
 */
export async function getArtworks() {
  return await get('pwamp-artworks') || {};
}
