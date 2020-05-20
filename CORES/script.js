window.addEventListener('load', start);

function start() {
  // Capturando Tabela
  var Table = document.querySelector('table');

  // Adicionando Listener de change
  Table.addEventListener('input', function (event) {
    // Capturando inputs que receberão os resultados
    let [ResultRed, ResultGreen, ResultBlue] = Array.from(
      document.querySelectorAll("input[type='text']")
    );

    // Capturando valor dos elementos range
    let [InputRed, InputGreen, InputBlue] = Array.from(
      document.querySelectorAll("input[type='range']")
    );

    ResultRed.value = InputRed.value;
    ResultGreen.value = InputGreen.value;
    ResultBlue.value = InputBlue.value;

    var Quadrado = document.querySelector('.Content');
    Quadrado.style.backgroundColor =
      'rgb(' +
      ResultRed.value +
      ',' +
      ResultGreen.value +
      ',' +
      ResultBlue.value +
      ')';
  });
}
