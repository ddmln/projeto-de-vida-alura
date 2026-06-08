const botoes = document.querySelectorAll('.botao');
const abas = document.querySelectorAll('.aba-conteudo');
const contadores = document.querySelectorAll('.aba-conteudo .contador');

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const hoje = new Date();
const prazos = [
  addDays(hoje, 30),
  addDays(hoje, 60),
  addDays(hoje, 90),
  addDays(hoje, 120)
];

if (botoes.length === 0 || abas.length === 0 || contadores.length === 0) {
  console.warn('Não há abas ou botões suficientes para inicializar o painel.');
} else {
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function mostraAba(index) {
    abas.forEach((aba, k) => {
      aba.style.display = k === index ? 'block' : 'none';
    });

    botoes.forEach((botao, k) => {
      botao.classList.toggle('ativo', k === index);
    });
  }

  function calculaTempo(dataFinal) {
    const agora = Date.now();
    const diff = dataFinal.getTime() - agora;

    if (diff <= 0) {
      return 'Prazo Finalizado';
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    return `${dias} dias ${horas} horas ${minutos} minutos ${segundos} segundos`;
  }

  function atualizaCronometro() {
    contadores.forEach((contador, index) => {
      const texto = calculaTempo(prazos[index]);
      contador.textContent = texto;
    });
  }

  botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => mostraAba(index));
  });

  mostraAba(0);
  atualizaCronometro();
  setInterval(atualizaCronometro, 1000);
}
