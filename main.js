const botoes = document.querySelectorAll('.botao');
const abas = document.querySelectorAll('.aba-conteudo');

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const hoje = new Date();
const tempos = [
  addDays(hoje, 30),
  addDays(hoje, 60),
  addDays(hoje, 90),
  addDays(hoje, 120)
];

if (botoes.length === 0 || abas.length === 0) {
  console.warn('Não há abas ou botões suficientes para inicializar o painel.');
} else {
  function mostraAba(index) {
    abas.forEach((aba, k) => {
      aba.style.display = k === index ? 'block' : 'none';
    });

    botoes.forEach((botao, k) => {
      botao.classList.toggle('ativo', k === index);
    });
  }

  function calculaTempo(dataFinal) {
    const agora = new Date();
    const tempoFinal = dataFinal - agora;
    const segundosTotal = Math.floor(tempoFinal / 1000);

    if (tempoFinal <= 0) {
      return [0, 0, 0, 0];
    }

    const dias = Math.floor(segundosTotal / 86400);
    const horas = Math.floor((segundosTotal % 86400) / 3600);
    const minutos = Math.floor((segundosTotal % 3600) / 60);
    const segundos = segundosTotal % 60;

    return [dias, horas, minutos, segundos];
  }

  function atualizaCronometro() {
    for (let i = 0; i < tempos.length; i++) {
      const [dias, horas, min, seg] = calculaTempo(tempos[i]);
      document.getElementById('dias' + i).textContent = dias;
      document.getElementById('horas' + i).textContent = String(horas).padStart(2, '0');
      document.getElementById('min' + i).textContent = String(min).padStart(2, '0');
      document.getElementById('seg' + i).textContent = String(seg).padStart(2, '0');
    }
  }

  botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => mostraAba(index));
  });

  mostraAba(0);
  atualizaCronometro();
  setInterval(atualizaCronometro, 1000);
}
