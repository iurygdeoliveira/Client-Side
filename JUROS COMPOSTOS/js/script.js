$(document).ready(function () {
  $('form').click(function () {
    // Obtendo Valores
    var capital = $('#capital').val();
    var taxa = $('#taxa').val();
    var periodo = $('#periodo').val();

    if (capital !== '' && taxa !== '' && periodo !== '') {
      var financiamento = CalcularFinanciamento(capital, taxa, periodo);

      Render(financiamento);
      //Bora exibir isso em alguns inputs na página
    } else {
      console.log('Não realizar calculo');
    }
  });
});

function FormatarNumero(Numero) {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(Numero);
}

function FormatarNumeroSemR$(Numero) {
  return Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(
    Numero
  );
}

function CalcularPorcentagem(valor, taxa) {
  return valor * (taxa / 100);
}

function CalcularTaxa(juros, capitalInicial) {
  return (juros / capitalInicial) * 100;
}

function CalcularParcela(montante, taxa, jurosAntigo, capitalInicial) {
  let parcela = {
    montante: 0,
    juros: 0,
    taxa: 0,
  };

  parcela.montante = montante + CalcularPorcentagem(montante, taxa);
  parcela.juros = jurosAntigo + CalcularPorcentagem(montante, taxa);
  parcela.taxa = CalcularTaxa(parcela.juros, capitalInicial);

  return parcela;
}

function CalcularFinanciamento(capital, taxa, periodo) {
  let financiamento = new Array();

  capital = new Number(capital);
  taxa = new Number(taxa);
  periodo = new Number(periodo);

  // Calculando primeira parcela
  financiamento.push(CalcularParcela(capital, taxa, 0, capital));

  // Calculando parcelas posteriores
  for (let i = 0; i < periodo - 1; i++) {
    let montante = financiamento[i].montante;
    let jurosAnterior = financiamento[i].juros;
    financiamento.push(CalcularParcela(montante, taxa, jurosAnterior, capital));
  }

  return financiamento;
}

function CreateElement(parcela, montante, juros, taxa) {
  const elemento = `
      <div class="col-sm-2 mb-3">
        <div class="card ">
           <div class="card-header">
            <div id="cardHeader">${parcela} parcela</div>
          </div>
          <div class="card-body">
            <div id="cardMontante">${montante}</div>
            <div id="cardJuros">${juros}</div>
            <div id="cardTaxa">${taxa}</div>
          </div>
        </div>
      </div>
      `;
  return elemento;
}

function Render(financiamento) {
  // Renderizando a Lista de usuários encontrados

  let card = $('#card').html();
  let i = 1;
  console.log(card);

  if (financiamento.length !== 0) {
    financiamento.forEach((parcela) => {
      parcela.montante = FormatarNumero(parcela.montante);
      parcela.juros = FormatarNumero(parcela.juros);
      parcela.taxa = FormatarNumeroSemR$(parcela.taxa) + '%';

      let elemento = CreateElement(
        i++,
        parcela.montante,
        parcela.juros,
        parcela.taxa
      );

      $('#cardAll').append(elemento);
    });
  } else {
    $('#cardHeader').val('Sem Parcelas');
    $('#cardMontante').val('');
    $('#cardJuros').val('');
    $('#cardTaxas').val('');
  }

  console.log(financiamento);
}
