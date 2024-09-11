// Arquivo que executa o sistema
// Executar: node index.js

import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});

// Importa classes
import * as Sistema from './Sistema.js';
import { Piloto, ServicoPilotos } from './Piloto.js';
import { ServicoAeronaves } from './Aeronave.js';
import { ServicoAerovias } from './Aerovia.js';
import { ServicoPlanos } from './PlanoDeVoo.js';
import { OcupacaoAerovia } from './OcupacaoAerovia.js';

// Cria instancias dos servicos
let fim  = false,
    sp   = new ServicoPilotos(),
    sa   = new ServicoAeronaves(),
    sv   = new ServicoAerovias(),
    spv  = new ServicoPlanos(),
    ocup = new OcupacaoAerovia();

console.log('------------------------');
console.log('SISTEMA DE TRÁFEGO AÉREO');
console.log('------------------------');

// Exibe menu de opcoes ate usuario encerrar (opcao 9)
while (!fim) {
    console.log(); // linha em branco
    console.log('Menu de Opções:');
    console.log(' 1 - Listar pilotos');
    console.log(' 2 - Listar aeronaves');
    console.log(' 3 - Adicionar piloto');
    console.log(' 4 - Consultar piloto');
    console.log(' 5 - Habilitação piloto');
    console.log(' 6 - Adicionar aeronave');
    console.log(' 7 - Consultar aeronave');
    console.log(' 8 - Adicionar aerovia');
    console.log(' 9 - Consultar aerovias');
    console.log('10 - Listar altitudes livres');
    console.log('11 - Submeter plano de voo');
    console.log('12 - Consultar plano de voo');
    console.log('13 - Cancelar plano de voo');
    console.log('14 - Encerrar\n');

    // Solicita opcao para o usuario
    let opcao = prompt('Informe a opção desejada: ');

    // Verifica opcao selecionada e executa funcao do sistema
    switch(opcao) {
        case '1':
            Sistema.listarPilotos(sp);
            break;
        case '2':
            Sistema.listarAeronaves(sa);
            break;
        case '3':
            Sistema.adicionarPiloto(sp);
            break;
        case '4':
            let piloto = Sistema.consultarPiloto(sp);
            // Se retornar um piloto, print no console
            if (piloto instanceof Piloto) {
                console.log(piloto.toString());
            }
            break;
        case '5':
            Sistema.alterarHabilitacao(sp);
            break;
        case '6':
            Sistema.adicionarAeronave(sa);
            break;
        case '7':
            Sistema.consultarAeronave(sa);
            break;
        case '8':
            Sistema.adicionarAerovia(sv);
            break;
        case '9':
            Sistema.consultarAerovia(sv);
            break;
        case '10':
            Sistema.listarAltitudes(ocup, sv);
            break;
        case '11':
            Sistema.submeterPlanoVoo(ocup, sp, sa, sv, spv);
            break;
        case '12':
            Sistema.listarPlano(sp, sa, sv, spv);
            break;
        case '13':
            Sistema.cancelarPlano(ocup, spv);
            break;
        case '14':
            // Retorna que o sistema foi encerrado e finaliza while
            fim = true;
            console.log('Sistema encerrado, até a próxima!');
            break;
        default:
            console.error('Opcão inválida!'); // informa usuario, caso opcao for invalida
        
        console.log(); // linha em branco
    }
}