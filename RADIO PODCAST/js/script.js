let inputDisplay = null;
let inputRange = null;

window.addEventListener('load', start);

function start() {
  inputDisplay = document.querySelector('#inputDisplay');
  inputRange = document.querySelector('#inputRange');
  divPodcast = document.querySelector('.podcast');

  inputRange.addEventListener('input', handleRangeInput);

  renderPodcastFrom(inputRange.value);
}

function handleRangeInput(event) {
  const frequency = event.target.value;
  inputDisplay.value = frequency;

  renderPodcastFrom(frequency);
}

function renderPodcastFrom(frequency) {
  divPodcast.innerHTML = '';

  const podcast = realPodcasts.find((podcast) => podcast.id === frequency);

  if (!podcast) {
    divPodcast.innerHTML = '<p>Nenhum podcast encontrado</p>';
  } else {
    divPodcast.innerHTML = `
      <img class='podcastAvatar' src='./img/${podcast.img}' alt='${podcast.title}' />
      <h2>${podcast.title}</h2>
      <span>${podcast.description}</span>
    `;
  }
}
