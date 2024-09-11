import moment from "moment";
import { AeronaveCarga, AeronaveParticular, AeronavePassageiros } from "./Aeronave.js";
import { PlanoDeVoo } from "./PlanoDeVoo.js";

// Regex para validar formato de data
const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const horaRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

// Funcao para validar que mes é valido
export function validaMes(mes) {
    return mes >= 1 && mes <= 12;
}

// Funcao para validar que dia do mes é valido
export function validaDia(dia, mes, ano) {
    const diasNoMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    // Ajusta para fevereiro em anos bissextos
    if (mes === 2 && ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
      diasNoMes[1] = 29;
    }
  
    return dia >= 1 && dia <= diasNoMes[mes - 1];
}

// Funcao que valida e retorna a data formatada
export function formataData(data) {
    if (!dataRegex.test(data)) {
        console.error('Formato de data inválido.');
        return false;
    }

    // Converte a data para formato padrao do js
    const partesData = data.split('/');
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]);
    const ano = parseInt(partesData[2]);

    // Valida que o mes é valido
    if (!validaMes(mes)) {
        console.error('Mês inválido.');
        return false;
    }

    // Valida que o dia do mes é válido
    if (!validaDia(dia, mes, ano)) {
        console.error('Dia inválido.');
        return false;
    }

    // Ajustando para o índice do mês em JavaScript
    const mesJs = mes - 1;
    // Formata a data
    const dataFormatada = new Date(ano, mesJs, dia);
    
    // Valida data atual
    const dataAtual = new Date(moment().format('DD/MM/YYYY'));
    
    if (dataFormatada < dataAtual) {
        console.error('Data deve ser maior ou igual a data atual.');
        return false;
    }

    // Retorna data valida
    return dataFormatada.toLocaleDateString();
}

// Funcao para validar horario
export function validaHorario (horario) {
    // Valida formato do horario
    if (!horaRegex.test(horario)) {
        console.error('Formato do horário inválido.');
        return false;
    }
    // Se for valido retorna true
    return true;
}

// Funcao que aprova/recusa o plano de voo
export const aprovarPlanoDeVoo = (piloto, aeronave, aerovia, data, horario, altitude, ocup) => {
    try {
        // Valida habilitacao do piloto
        if (!piloto.isAtiva()) {
            throw new Error('Piloto com habilitação inativa!');
        }

        // Valida autonomia da aeronave
        if (aeronave.autonomia < aerovia.tamanho * 1.1 ) {
            throw new Error('Aeronave não possui autonomia para voar nesta aerovia!');
        }

        // Valida altitude aeronave
        if ((aeronave instanceof AeronavePassageiros && altitude < 28000) || (aeronave instanceof AeronaveParticular && altitude >= 27000)) {
            throw new Error('Altitude não compatível com o tipo de aeronave!');
        }

        // Converte o horario inicial para minutos
        const horaMinuto = horario.split(':');
        const horaInicio = Number(horaMinuto[0]);
        const minutos = (horaInicio * 60) + Number(horaMinuto[1]);

        // Obtem o tempo de voo em minutos
        const tempoVoo = aerovia.tamanho / aeronave.velocidadeCruzeiro;
        const tempoMinutos = tempoVoo * 60;

        // Obtem o horario final do voo
        const minutosFim = minutos + tempoMinutos;
        const horaMinutoFim = minutosFim / 60;
        const horaFim = Math.floor(horaMinutoFim);
        const horarioFim = `${horaFim.toString()}:${Math.ceil((minutosFim % 60)).toString().padStart(2, '0')}`

        // Valida horario aeronave
        if (aeronave instanceof AeronaveCarga && (horaMinutoFim) > 6) {
            throw new Error('Tipo de aeronave não possui autonomia para voar neste horário!');
        }

        // Arredonda altitude para baixo (de 1000 em 1000)
        let altitudeFormatada = Math.floor(altitude / 1000) * 1000;
        
        // Gera slots de tempo e verifica disponibilidade
        let slots = [];
        for (let h = horaInicio; h <= horaFim; h++) {
            // Verifica se esta disponivel
            if (ocup.isOcupado(aerovia.id, data, h, altitudeFormatada)) {
                throw new Error(`Aerovia já ocupada a(s) ${h} hora(s) nesta data e altitude.`);
            }
            // Adiciona o slot no array
            slots.push(h);
        }

        // Se ocorrer tudo certo, ocupa aerovia e cria o retorna o plano de voo criada
        
        for (let slot of slots) {
            ocup.ocupa(aerovia.id, data, slot, altitudeFormatada);
        }

        return new PlanoDeVoo(piloto.matricula, aeronave.prefixo, aerovia.id, data, horario, horarioFim, altitude, slots);

    } catch (error) {
        console.error(`Falha ao aprovar plano de voo: ${error.message}`);
        return false;
    }
}