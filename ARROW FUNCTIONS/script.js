'use strict'; // Javascript deve acusar mais erros

function sum(a, b) {
  return a + b;
}

//função anônima
const sum2 = function (a, b) {
  return a + b;
};

//arrow function
const sum3 = (a, b) => {
  return a + b;
};

//arrow function reduzida
const sum4 = (a, b) => a + b;

// O arquivo people.js contém um objeto javascript
// chamado people. Dentro do objeto people existe
// um vetor result
window.addEventListener('load', () => {
  // doMap();
  // doFilter();
  // doForEach();
  // doReduce();
  // doFind();
  // doSome();
  // doEvery();
  // doSort();
});

// Para cada posição do Vetor Results, retornar
// nome e email armazenados
function doMap() {
  //Acesso encadeado
  // Primeiro objeto people, depois vetor results
  const Names = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });

  console.log(Names);

  return Names;
}

// Para cada posição do Vetor Results, retornar
// apenas pessoas com mais de 50 anos
function doFilter() {
  //Acesso encadeado
  // Primeiro objeto people, depois vetor results
  const Ages = people.results.filter((person) => {
    return person.dob.age > 50;
  });

  console.log(Ages);
}

// Para cada posição do Vetor retornado por doMap()
// Inserir um valor NameSize
function doForEach() {
  const MappedNames = doMap();

  MappedNames.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log(MappedNames);
}

// Somar as idades de cada pessoa do vetor results
function doReduce() {
  const TotalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(TotalAges);
}

// Retornar a primeira pessoa do vetor
function doFind() {
  const Found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });

  console.log(Found);
}

// Retornar true ou false, na procura por alguém
function doSome() {
  const Found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });

  console.log(Found);
}

// Se todos atenderem a uma determinada regra,
// retornar true, do contrário false
function doEvery() {
  const Every = people.results.every((person) => {
    return person.nat === 'BR';
  });

  console.log(Every);
}

// Se todos atenderem a uma determinada regra,
// retornar true, do contrário false
function doSort() {
  // Capturando as posições do vetor pelo nome, e encadeando
  // uma filtragem em seguida
  const MappedNames = people.results
    .map((person) => {
      return person.name.first;
    })
    .filter((person) => person.startsWith('A'))
    .sort((a, b) => {
      a.localeCompare(b);
    });

  console.log(MappedNames);
}
