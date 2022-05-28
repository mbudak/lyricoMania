// your code
const api_url = 'https://api.lyrics.ovh/suggest';
const api_particular_song = 'https://api.lyrics.ovh/v1/${artist}/${songTitle}';

var search_btn = document.forms['form'][1];
var search_term = document.forms['form'][0];
var result = document.getElementById('result');

search_btn.addEventListener('click', searchSongs);

const showData = (data) => {
    result.innerHTML = `
      <ul class="songs">
        ${data.data
          .map(
            song => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
          )
          .join('')}
      </ul>
    `;
}

const resultNotFound = () => {
    result.innerHTML = `
        <div class="centered not-found">Result not found</div>
    `
}


async function searchSongs() {
    event.preventDefault();
    
    fetch(`${api_url}/${search_term.value}`)
    .then((response) => response.json())
    .then((data) => {
        showData(data);
    }).catch(() => {
        resultNotFound();
    });

  }

