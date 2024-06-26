let contaAsHoras;

document.getElementById('btn-acionar').addEventListener('click', function() {
    clearInterval(contaAsHoras);

    const mes = parseInt(document.getElementById('month').value);
    const dia = parseInt(document.getElementById('day').value);

    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = dataAtual.getMonth() + 1;
    let anoAtual = dataAtual.getFullYear();

    if (mes < mesAtual || (mes === mesAtual && dia < diaAtual)) {
        anoAtual += 1;
    }

    const dataDoAniversario = new Date(`${anoAtual}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}T00:00:01`);
    const timestampDoAniversario = dataDoAniversario.getTime();

    contaAsHoras = setInterval(function() {
        const agora = new Date();
        const timestampAtual = agora.getTime();
        const distanciaDoAniversario = timestampDoAniversario - timestampAtual;

        const diaEmMs = 1000 * 60 * 60 * 24;
        const horaEmMs = 1000 * 60 * 60;
        const minutosEmMs = 1000 * 60;

        const diasAteOAniversario = Math.floor(distanciaDoAniversario / diaEmMs);
        const horasAteOAniversario = Math.floor((distanciaDoAniversario % diaEmMs) / horaEmMs);
        const minAteOAniversario = Math.floor((distanciaDoAniversario % horaEmMs) / minutosEmMs);
        const segAteOAniversario = Math.floor((distanciaDoAniversario % minutosEmMs) / 1000);

        document.getElementById('text').innerHTML = `Faltam ${diasAteOAniversario}d ${horasAteOAniversario}h ${minAteOAniversario}m ${segAteOAniversario}s para o seu aniversário`;

        if (distanciaDoAniversario < 0) {
            clearInterval(contaAsHoras);
            document.getElementById('text').innerHTML = 'Feliz Aniversário!';
        }
    }, 1000);
});
