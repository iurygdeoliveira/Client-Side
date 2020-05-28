// Variáveis Globais

var SearchButton = null; // Armazenará o click do botão do usuário
var SearchInput = null; // Armazenará o input do usuário

// Exibirá os usuários encontrados
var UsersFound = document.querySelector('#UsersFound');

// Exibirá as Estatísticas encontradas
var StatisticFound = document.querySelector('#StatisticFound');

// Quando o DOM estiver completamente carregado
window.addEventListener('load', () => {
  SearchButton = document.querySelector('#SearchButton');
  SearchInput = document.querySelector('#SearchInput');

  FocusInput(SearchInput); // Aplicando Foco na inicialização do programa

  // Se o usuário clicar no botão de busca ou digitar enter no input
  SearchButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Pesquisar apenas quando houver valor no input
    if (SearchInput.value === '') {
      // Apagando valores antigos
      UsersFound.innerHTML = '';
      StatisticFound.innerHTML = '';

      const NotFoundUsers = document.querySelector('#NotFoundUsers');
      const NotFoundStatistic = document.querySelector('#NotFoundStatistic');
      NotFoundUsers.innerHTML = 'Nada a ser exibido';
      NotFoundStatistic.innerHTML = 'Nada a ser exibido';
    } else {
      // Buscar usuário
      FetchUsers()
        .then((results) => {
          // Se houver êxito na busca
          // Filtrar Usuário
          const Users = FilterUser(results, SearchInput.value);

          // Exibir Resultados
          RenderUser(Users);
          RenderStatistic(Users);
        })
        .catch((error) => {
          console.group('Falha na Requisição da API');
          console.error(error);
          console.groupEnd();
        });
    }
  });
});

// Capturando dados da API
async function FetchUsers() {
  // Capturando os usuários provenientes da API
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  //Organizando dados obtidos da API
  // E necessário acessar o vetor results, antes de acessar suas
  // posição através do .map
  const ApiUsers = json.results.map((user) => {
    // Utilizando destructing
    let {
      picture: { thumbnail },
      name: { first, last },
      dob: { age },
      gender,
    } = user;

    return {
      name: `${first} ${last}`,
      photo: thumbnail,
      age,
      gender,
    };
  });

  return ApiUsers;
}

// Aplicando Foco no Input
function FocusInput(Event) {
  Event.focus();
}

function FilterUser(results, Valor) {
  const Users = results.filter((person) => {
    return person.name.toLowerCase().includes(Valor.toLowerCase());
  });

  return Users;
}

function RenderUser(Users) {
  // Renderizando a Lista de usuários encontrados
  let ListUsersHTML = '<ul style="list-style-type: none;">';

  // Contando os usuários encontrados
  let CountUsers = 0;

  Users.forEach((person) => {
    // Aplicando Destructing
    const { name, photo, age, gender } = person;

    const ListAttributeUsers = `
           <li><img class="rounded-circle" src="${photo}" alt="${name}"/> ${name}, ${age}, ${gender}</li>
      `;

    ListUsersHTML += ListAttributeUsers;
    CountUsers += 1;
  });

  ListUsersHTML += '</ul>';
  UsersFound.innerHTML = ListUsersHTML; // Inserindo Valores no Site

  // Removendo mensagem nada para ser exibido
  const NotFoundUsers = document.querySelector('#NotFoundUsers');
  NotFoundUsers.innerHTML = '';

  // Exibindo sumários dos usuários encontrados
  const ResultsFoundUser = document.querySelector('#ResultsFoundUser');
  ResultsFoundUser.innerHTML = CountUsers + ' usuários(s) encontrados()';
}

function RenderStatistic(Users) {
  // Renderizando a Lista de usuários encontrados
  let ListStatisticHTML = '<ul style="list-style-type: none;">';

  // Contando os usuários encontrados
  let CountMale = 0;
  let CountFemale = 0;
  let SumAge = 0;
  let AvgAge = 0;
  let CountUsers = 0;

  Users.forEach((person) => {
    // Aplicando Destructing
    const { age, gender } = person;

    if (gender === 'male') {
      CountMale += 1;
    } else {
      CountFemale += 1;
    }

    SumAge += age;
    CountUsers += 1;
  });

  AvgAge = SumAge / CountUsers; // Calculando a média
  AvgAge = AvgAge.toFixed(2); // Arredondando para duas casas decimais

  ListStatisticHTML += `
           <li>Sexo Masculino: <b>${CountMale}</b></li>
           <li>Sexo Feminino: <b>${CountFemale}</b></li>
           <li>Soma das idades: <b>${SumAge}</b></li>
           <li>Média das idades: <b>${AvgAge}</b></li>
           </ul>
      `;

  StatisticFound.innerHTML = ListStatisticHTML; // Inserindo Valores no Site

  // Removendo mensagem nada para ser exibido
  const NotFoundStatistic = document.querySelector('#NotFoundStatistic');
  NotFoundStatistic.innerHTML = '';
}
