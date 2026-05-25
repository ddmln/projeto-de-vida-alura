// main.js - cronômetros para cada aba
(function () {
  const abas = document.querySelectorAll('.aba-conteudo');
  if (!abas || abas.length === 0) return;

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

  const contadores = [];

  abas.forEach((aba) => {
    const info = document.createElement('div');
    info.className = 'contador';
    info.style.textAlign = 'center';
    info.style.marginTop = '8px';
    info.textContent = '';
    aba.appendChild(info);
    contadores.push(info);
  });

  function calculaTempo(dataFinal) {
    const agoraMs = Date.now();
    const finalMs = dataFinal.getTime();
    let diff = finalMs - agoraMs;
    if (diff <= 0) return 'Prazo Finalizado';

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= dias * 1000 * 60 * 60 * 24;
    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff -= horas * 1000 * 60 * 60;
    const minutos = Math.floor(diff / (1000 * 60));
    diff -= minutos * 1000 * 60;
    const segundos = Math.floor(diff / 1000);

    return (
      dias + ' dias ' + horas + ' horas ' + minutos + ' minutos ' + segundos + ' segundos'
    );
  }

  function atualizaCronometro() {
    for (let i = 0; i < contadores.length; i++) {
      contadores[i].textContent = calculaTempo(prazos[i]);
    }
  }

  // inicia e atualiza a cada segundo
  atualizaCronometro();
  setInterval(atualizaCronometro, 1000);
})();