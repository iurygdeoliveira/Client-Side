// Variáveis Globais

// Elementos html que armazenarão as TABs dos países
let TabCountries = null;
let TabFavorites = null;

let AllCountries = []; // Armazenará os dados da API de Países
let FavoriteCountries = []; // Armazenará os dados dos países favoritos

let CountCountries = []; // Armazenará o quantidade de países
let CountFavorites = []; // Armazenará a quantidade de países favoritos

let TotalPopulationList = []; // Armazenará a população total de países
let TotalPopulationFavorites = []; // Armazenará a população total de países favoritos

let NumberFormat = []; // Utilizado para formatar o número

// Quando o DOM estiver completamente carregado
window.addEventListener('load', () => {
  TabCountries = document.querySelector('#tabCountries');
  TabFavorites = document.querySelector('#tabFavorites');

  CountCountries = document.querySelector('#countCountries');
  CountFavorites = document.querySelector('#countFavorites');

  TotalPopulationList = document.querySelector('#totalPopulationList');

  //prettier-ignore
  TotalPopulationFavorites =
    document.querySelector('#totalPopulationFavorites');

  NumberFormat = Intl.NumberFormat('pt-BR');

  FetchCountries();
});

// Capturando dados da API
async function FetchCountries() {
  // Capturando os países provenientes da API
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  //Adicionando páises obtidos na variável AllCountries
  AllCountries = json.map((country) => {
    // Utilizando destructing
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population: population,
      FormattedPopulation: FormatNumber(population),
      flag: flag,
    };
  });

  Render();
}

// Renderizando dados no Página
function Render() {
  RenderCountryList();
  RenderFavorites();
  RenderSummary();
  HandleCountryButtons();
}

// Renderizando a Lista de Países gerais
function RenderCountryList() {
  let CountriesHTML = '<div>';

  AllCountries.forEach((country) => {
    // Aplicando Destructing
    const { name, flag, id, population, FormattedPopulation } = country;

    const CountryHTML = `
    <div class='country'>
      <div>
        <a id="${id}"class="waves-effect waves-light btn"> + </a>
      </div>
      <div>
        <img src="${flag}" alt="${name}"/>
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${FormattedPopulation}</li>
        <ul>
      </div>
    </div>
    `;

    CountriesHTML += CountryHTML;
  });

  CountriesHTML += '</div>;';
  TabCountries.innerHTML = CountriesHTML;
}

// Renderizando a Lista de Países Favoritos
function RenderFavorites() {
  let FavoritesHTML = '<div>';

  FavoriteCountries.forEach((country) => {
    // Aplicando Destructing
    const { name, flag, id, population, FormattedPopulation } = country;

    const FavoriteCountryHTML = `
    <div class='country'>
      <div>
        <a id="${id}"class="waves-effect waves-light btn red darken-4"> - </a>
      </div>
      <div>
        <img src="${flag}" alt="${name}"/>
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${FormattedPopulation}</li>
        <ul>
      </div>
    </div>
    `;

    FavoritesHTML += FavoriteCountryHTML;
  });

  FavoritesHTML += '<div>';
  TabFavorites.innerHTML = FavoritesHTML;
}

// Renderizando o sumario das listas
function RenderSummary() {
  CountCountries.textContent = AllCountries.length;
  CountFavorites.textContent = FavoriteCountries.length;

  // Realizando a Contagem Total da População
  const TotalPopulation = AllCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  // Realizando a Contagem Total da População
  const TotalFavorites = FavoriteCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  TotalPopulationList.textContent = FormatNumber(TotalPopulation);
  TotalPopulationFavorites.textContent = FormatNumber(TotalFavorites);
}

function HandleCountryButtons() {
  const CountryButtons = Array.from(TabCountries.querySelectorAll('.btn'));
  const FavoriteButtons = Array.from(TabFavorites.querySelectorAll('.btn'));

  // Observando click no botão para adicionar aos favoritos
  CountryButtons.forEach((button) => {
    button.addEventListener('click', () => AddToFavorites(button.id));
  });

  // Observando o click no botão para remover dos favoritos
  FavoriteButtons.forEach((button) => {
    button.addEventListener('click', () => RemoveFromFavorites(button.id));
  });
}

function AddToFavorites(id) {
  const CountryToAdd = AllCountries.find((country) => country.id === id);

  // Adicionando novo País, as vetor de paíse favoritos
  FavoriteCountries = [...FavoriteCountries, CountryToAdd];

  // Ordenando o vetor de países favoritos
  FavoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // Removendo da lista de países principal, o país que foi escolhido
  AllCountries = AllCountries.filter((country) => country.id !== id);

  Render();
}

function RemoveFromFavorites(id) {
  const CountryToRemove = FavoriteCountries.find(
    (country) => country.id === id
  );

  // Adicionando o País, as vetor de paíse inicial
  AllCountries = [...AllCountries, CountryToRemove];

  // Ordenando o vetor de países inicial
  AllCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // Removendo da lista de países favorito, o país que foi escolhido
  FavoriteCountries = FavoriteCountries.filter((country) => country.id !== id);
  console.log(FavoriteCountries.length);
  console.log(AllCountries.length);

  Render();
}

function FormatNumber(Number) {
  return NumberFormat.format(Number);
}
