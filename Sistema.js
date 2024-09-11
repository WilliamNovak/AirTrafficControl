import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});

// Importa classes
import { Piloto } from './Piloto.js';
import { AeronaveParticular, AeronavePassageiros, AeronaveCarga } from './Aeronave.js';
import { Aerovia } from './Aerovia.js';

// Importa funcoes
import { aprovarPlanoDeVoo, formataData, validaHorario } from './validaDados.js';
import { PlanoDeVoo } from "./PlanoDeVoo.js";

// Funcao para listar pilotos existentes
export const listarPilotos = (s) => {
    let encontrou = false;

    // Percorre todos pilotos encontrados printando suas informacoes
    for (let p of s.todos()) {
        encontrou = true;
        console.log(p.toString());
    }

    // Se nao encontrar, printa mensagem de not found
    if (!encontrou) {
        console.log('Nenhum piloto encontrado.')
    }
}

// Funcao para listar aeronaves existentes
export const listarAeronaves = (s) => {
    let encontrou = false;

    // Percorre todas aeronaves encontradas printando suas informacoes
    for (let a of s.todas()) {
        encontrou = true;
        console.log(a.toString());
    }

    // Se nao encontrar, printa mensagem de not found
    if (!encontrou) {
        console.log('Nenhuma aeronave encontrada.')
    }
}

// Funcao para adicionar um novo piloto
export const adicionarPiloto = (s) => {
    // Solicita dados para o usuario
    let matricula = prompt('Informe a matrícula do piloto: ');
    if (!matricula) {
        console.error('Matrícula deve ser informada.');
        return;
    } else if (s.recupera(matricula)) {
        console.error('Já existe um piloto para essa matrícula.');
        return;
    }

    let nome = prompt('Informe o nome do piloto: ');
    if (!nome) {
        console.error('Nome do piloto deve ser informado.');
        return;
    }

    try {
        // Cria o piloto e adiciona ele
        let piloto = new Piloto(matricula, nome);
        s.adiciona(piloto);
        console.log('Piloto adicionado.');
    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao adicionar piloto: ${error.message}`);
    }
}

// Funcao para consultar um piloto
export const consultarPiloto = (s) => {
    // Solicita a matricula para consulta
    let matricula = prompt('Informe a matrícula do piloto: ');
    try {
        let piloto = s.recupera(matricula); // consulta o piloto
        // Se encontrar printa informacoes retornadas, senao printa mensagem de not found
        if (piloto) {
            return piloto;
        } else {
            console.error('Piloto não encontrado.')
        }
    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao consultar piloto: ${error.message}`);
    }
}

// Funcao para alterar a situacao da habilitacao de um piloto
export const alterarHabilitacao = (s) => {
    // Solicita o piloto para alterar a habilitacao
    let piloto = consultarPiloto(s);
    // Verifica se retornou piloto
    if (piloto instanceof Piloto) {
        console.log(); // linha em branco
        console.log('1 - Ativar Habilitação');
        console.log('2 - Desativar Habilitação');
        console.log('3 - Voltar');
        console.log(); // linha em branco

        // Solicita para usuario informar opcao
        let opcao = prompt('Selecione uma opção: ');

        // Verifica opcao selecionada e executa printando mensagem ou erro
        switch (opcao) {
            case '1':
                if (piloto.isAtiva()) { // verifica se esta ativa
                    console.error('Habilitação do piloto já está ativa.');
                } else {
                    piloto.ativa();
                    console.log('Habilitação ativada.')
                }
                break;
            case '2':
                if (!piloto.isAtiva()) { // verifica se esta inativa
                    console.error('Habilitação do piloto já está inativa.');
                } else {
                    piloto.inativa();
                    console.log('Habilitação desativada.')
                }
                break;
            case '3':
                return;
            default:
                console.error('Opcão inválida!'); // informa usuario, caso opcao for invalida
        }
    }
}

// Funcao para adicionar uma aeronave
export const adicionarAeronave = (s) => {
    try {
        // Solicita dados para o usuario
        let prefixo = prompt('Informe o prefixo da aeronave: ');
        if (!prefixo) {
            console.error('Prefixo deve ser informado.');
            return;
        } else if (s.recupera(prefixo)) {
            console.error('Já existe uma aeronave para esse prefixo.');
            return;
        }

        let velocidade = Number(prompt('Informe a velocidade de cruzeiro em km/h: '));
        if (isNaN(velocidade) || velocidade <= 0) { 
            throw new Error('Velocidade de cruzeiro inválida!'); 
        }

        let autonomia = Number(prompt('Informe a autonomia em km: '));
        if (isNaN(autonomia) || autonomia <= 0) { 
            throw new Error('Autonomia inválida!'); 
        }
        
        // Informa os tipos validos de aeronave
        console.log();
        console.log('Tipos de aeronave:');
        console.log('1 - Aeronave particular de pequeno porte');
        console.log('2 - Aeronave comercial de passageiros');
        console.log('3 - Aeronave comercial de carga\n');
        // Solicita o tipo para o usuario
        let tipo = prompt('Informe o tipo da aeronave: ');

        let aeronave, cia;

        // Verifica o tipo escolhido
        switch(tipo) {
            case '1':
                // Solicita dados e cria aeronave particular
                let respManutencao = prompt('Informe a empresa responsável pela manutenção: ');
                if (!respManutencao) {
                    console.error('Responsável pela manutenção deve ser informado.');
                    return;
                }

                aeronave = new AeronaveParticular(prefixo, velocidade, autonomia, respManutencao);
                break;
            case '2':
                // Solicita dados e cria aeronave de passageiros
                cia = prompt('Informe o nome da companhia aérea: ');
                if (!cia) {
                    console.error('Companhia aérea deve ser informada.');
                    return;
                }
                
                let maxPassageiros = Number(prompt('Informe o capacidade máxima de passageiros: '));
                if (isNaN(maxPassageiros) || maxPassageiros <= 0) { 
                    throw new Error('Quantidade máxima de passageiros inválida!'); 
                }

                aeronave = new AeronavePassageiros(prefixo, velocidade, autonomia, cia, maxPassageiros);
                break;
            case '3':
                // Solicita dados e cria aeronave de carga
                cia = prompt('Informe o nome da companhia aérea: ');
                if (!cia) {
                    console.error('Companhia aérea deve ser informada.');
                    return;
                }

                let pesoMax = Number(prompt('Informe a capacidade máxima de peso em toneladas: '));
                if (isNaN(pesoMax) || pesoMax <= 0) { 
                    throw new Error('Peso máximo inválido!'); 
                }

                aeronave = new AeronaveCarga(prefixo, velocidade, autonomia, cia, pesoMax);
                break;
            default:
                // Dispara erro quando o tipo de aeronave escolhido for invalido
                throw new Error('Tipo de aeronave inválida!');
        }

        s.adiciona(aeronave); // Caso nao ocorra erro, adiciona a aeronave
        console.log('Aeronave adicionada.');

    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao adicionar aeronave: ${error.message}`);
    }
}

// Funcao para consultar uma aeronave
export const consultarAeronave = (s) => {
    try {
        // Solicita o prefixo para consulta
        let prefixo = prompt('Informe o prefixo da aeronave para consulta: ');
        let aeronave = s.recupera(prefixo); // consulta aeronave
        // Se encontrar printa informacoes retornadas, senao printa mensagem de not found
        if (aeronave) {
            console.log(aeronave.toString());
        } else {
            console.error('Aeronave não encontrada!')
        }
    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao consultar aeronave: ${error.message}`);
    }
}

// Funcao para adicionar uma aerovia
export const adicionarAerovia = (s) => {
    try {
        // Solicita dados para o usuario
        let id = prompt('Informe o identificador da aerovia: ');
        if (!id) {
            console.error('Identificador deve ser informado.');
            return;
        } else if (s.recuperaId(id)) {
            console.error('Já existe uma aerovia para esse identificador.');
            return;
        }

        let origem = prompt('Informe o aeroporto de origem da aerovia: ');
        if (!origem) {
            console.error('Aeroporto de origem deve ser informado.');
            return;
        }

        let destino = prompt('Informe o aeroporto de destino da aerovia: ');
        if (!destino) {
            console.error('Aeroporto de destino deve ser informado.');
            return;
        }

        let tamanho = Number(prompt('Informe o tamanho da aerovia em km: '));
        if (isNaN(tamanho) || tamanho <= 0) {
            throw new Error('Tamanho da aerovia inválido!');
        }

        // Cria a aerovia e adiciona ela
        let aerovia = new Aerovia(id, origem, destino, tamanho);
        s.adiciona(aerovia);
        console.log('Aerovia adicionada.');
    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao adicionar aerovia: ${error.message}`);
    }
}

// Funcao para consultar aerovias entre origem e destino
export const consultarAerovia = (s) => {
    try {
        // Solicita origem e destino para consulta
        // converte para upperCase
        let origem = prompt('Informe o aeroporto de origem para consulta: ').toUpperCase();
        if (!origem) {
            console.error('Aeroporto de origem deve ser informado.');
            return;
        }
        let destino = prompt('Informe o aeroporto de destino para consulta: ').toUpperCase();
        if (!destino) {
            console.error('Aeroporto de destino deve ser informado.');
            return;
        }
        
        let encontrou = false;
        // Percorre aerovias encontradas e printa suas informacoes
        for (let a of s.recupera(origem, destino)) {
            encontrou = true;
            console.log(a.toString());
        }

        // Se nao encontrar, printa mensagem de not found
        if (!encontrou) {
            console.log('Nenhuma aerovia encontrada.');
        }
    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao consultar aerovia: ${error.message}`);
    }
}

// Funcao que lista as altitudes disponives em uma aerovia em um determinado horario
export const listarAltitudes = (ocup, sv) => {
    try {
        // Solicita dados para o usuario
        let idAerovia = prompt('Informe o identificador da aerovia: ');
        if (!idAerovia) {
            console.error('Identificador deve ser informado.');
            return;
        } else if (!sv.recuperaId(idAerovia)) {
            console.error('Não existe uma aerovia para esse identificador.');
            return;
        }

        let dataString = prompt('Informe a data para consulta no formato DD/MM/YYYY: ');
        if (!dataString) {
            console.error('Data deve ser informada.');
            return;
        }
        // Executa validacoes e formata a data
        let data = formataData(dataString);
        if (!data) {
            return;
        }

        let horario = prompt('Informe o horário para consulta no formato HH:MM: ');
        // Executa validacoes de horario
        if (!validaHorario(horario)) {
            return;
        }

        // Define o lot baseado no horario
        const slot = parseInt(horario.substring(0, 2));

        // Retorna as altitudes livres
        console.log('\nAltitudes Livres:');
        let encontrou = false;
        
        for (let a of ocup.altitudesLivres( idAerovia, data, slot )) {
            encontrou = true;
            console.log(`${a} - ${a + 1000}`);
        }

        // Se nao tiver altitudes livres, exibe mensagem
        if (!encontrou) { console.log('Nenhuma altitude livre na aerovia para esta data e hora.'); }

    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao listar altitudes livres: ${error.message}`);
    }
}

// Funcao que cria e submete um plano de voo
export const submeterPlanoVoo = (ocup, sp, sa, sv, spv) => {
    try {
        // Solicita dados para o usuario

        // Matricula do piloto
        let matriculaPiloto = prompt('Informe a matrícula do piloto: ');
        if (!matriculaPiloto) {
            console.error('Matrícula deve ser informada.');
            return;
        }
        // Busca piloto
        const piloto = sp.recupera(matriculaPiloto);
        if (!piloto) {
            console.error('Não existe um piloto para essa matrícula.');
            return;
        }

        // Prefixo da aeronave
        let prefixoAeronave = prompt('Informe o prefixo da aeronave: ');
        if (!prefixoAeronave) {
            console.error('Prefixo deve ser informado.');
            return;
        }
        // Busca aeronave
        const aeronave = sa.recupera(prefixoAeronave);
        if (!aeronave) {
            console.error('Não existe uma aeronave para esse prefixo.');
            return;
        }

        // Id da aerovia
        let idAerovia = prompt('Informe o identificador da aerovia: ');
        if (!idAerovia) {
            console.error('Identificador deve ser informado.');
            return;
        }
        // Busca aerovia
        const aerovia = sv.recuperaId(idAerovia);
        if (!aerovia) {
            console.error('Não existe uma aerovia para esse identificador.');
            return;
        }

        // Data
        let dataString = prompt('Informe a data no formato DD/MM/YYYY: ');
        if (!dataString) {
            console.error('Data deve ser informada.');
            return;
        }
        // Executa validacoes e formata a data
        let data = formataData(dataString);
        if (!data) {
            return;
        }

        // Horario
        let horario = prompt('Informe o horário no formato HH:MM: ');
        // Executa validacoes de horario
        if (!validaHorario(horario)) {
            return;
        }

        // Altitude
        let altitude = Number(prompt('Informe a altitude do voo (25000-35000): '));
        if (isNaN(altitude) || altitude < 25000 || altitude > 35000) {
            console.error('Altitude inválida.');
            return;
        }

        console.log(); // linha em branco

        // Chama funcao que valida e aprova o plano de voo
        let planoVoo = aprovarPlanoDeVoo(piloto, aeronave, aerovia, data, horario, altitude, ocup);

        // Se aprovou o plano de voo, consiste ele na memoria
        if (planoVoo) {
            let id = spv.consiste(planoVoo);

            // Retorna mensagem com id do plano de voo aprovado
            console.log(`Plano de voo ${id} aprovado com sucesso!`);
        }

    } catch (error) {
        // Em caso de erro, retorna mensagem para o usuario
        console.error(`Erro ao submeter plano de voo: ${error.message}`);
    }
}

// Funcao que consulta e retorna as informacoes de um plano de voo
export const listarPlano = (sp, sa, sv, spv) => {
    try {
        // Solicita o id do plano para consulta
        let idPlano = Number(prompt('Informe o identificador do plano de voo para consulta: '));
        
        // Valida id informado
        if (isNaN(idPlano)) {
            console.error('Identificador inválido.');
            return;
        } 
        // Busca o plano de voo
        let planoVoo = spv.recupera(idPlano);
        if (!planoVoo) {
            console.error('Plano de voo não encontrado.');
            return;
        }

        // Exibe informações do plano de voo
        console.log(); // linha em branco
        console.log(planoVoo.toString(sp, sa, sv));

    } catch (error) {
        console.error(`Erro ao listar plano de voo: ${error.message}`)
    }
}

// Funcao para cancelar um plano de voo
export const cancelarPlano = (ocup, spv) => {
    // Solicita o id do plano de voo para cancelamento
    let idPlano = Number(prompt('Informe o identificador do plano de voo para cancelamento: '));
        
    // Valida id informado
    if (isNaN(idPlano)) {
        console.error('Identificador inválido.');
        return;
    } 
    // Busca o plano de voo
    let planoVoo = spv.recupera(idPlano);
    if (!planoVoo) {
        console.error('Plano de voo não encontrado.');
        return;
    }
    
    // Verifica se retornou plano de voo
    if (planoVoo instanceof PlanoDeVoo) {
        if (planoVoo.isCancelado()) { // verifica se ja esta cancelado
            console.error('Plano de voo já está cancelado.');
        } else {
            // Cancela o plano de voo
            planoVoo.cancelaPlano();
            // Desocupa aerovia
            for (let slot of planoVoo.slots) {
                ocup.desocupa(planoVoo.idAerovia, planoVoo.data, slot, planoVoo.altitude);
            }
            console.log('Plano de voo cancelado.')
        }
    }
}