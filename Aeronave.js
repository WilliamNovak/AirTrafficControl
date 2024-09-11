import { validate } from "bycontract"

// Classe Aeronave
export class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    // Constructor de criacao
    constructor(prefixo, velocidade, autonomia) {
        validate(arguments, ['String','Number','Number']); // valida tipo dos parametros

        this.#prefixo = prefixo;
        this.#velocidadeCruzeiro = velocidade;
        this.#autonomia = autonomia;
    }

    // Metodos get das propriedades da aeronave
    get prefixo() {
        return this.#prefixo;
    }

    get velocidadeCruzeiro() {
        return this.#velocidadeCruzeiro;
    }

    get autonomia() {
        return this.#autonomia;
    }

    // Retorna informacoes da aeronave
    toString() {
        let str = ` Aeronave: ${this.prefixo}, velocidade: ${this.velocidadeCruzeiro} km/h, autonomia: ${this.autonomia} km\n`;
        return str;
    }
}

// Classe AeronaveParticular
export class AeronaveParticular extends Aeronave {
    #respManutencao;

    // Constructor de criacao
    constructor(prefixo, velocidade, autonomia, respManutencao) {
        validate(respManutencao, 'String'); // valida tipo do parametro
        super(prefixo, velocidade, autonomia); // herda constructor da classe pai
        this.#respManutencao = respManutencao;
    }

    // Get do responsavel manutencao
    get respManutencao() {
        return this.#respManutencao;
    }

    // Sobrescreve metodo toString da classe pai, adicionando informacoes
    toString() {
        return super.toString() + `, Particular, responsável manutenção: ${this.respManutencao}`;
    }
}

export class AeronaveComercial extends Aeronave {
    #nomeCIA;

    // Constructor de criacao
    constructor(prefixo, velocidade, autonomia, nomeCia) {
        validate(nomeCia, 'String'); // valida tipo do parametro
        super(prefixo, velocidade, autonomia); // herda constructor da classe pai
        this.#nomeCIA = nomeCia;
    }

    // Get da companhia aerea
    get nomeCia() {
        return this.#nomeCIA;
    }

    // Sobrescreve metodo toString da classe pai, adicionando informacoes
    toString() {
        return super.toString() + `, Comercial, Cia aérea: ${this.nomeCia}`;
    }
}

// Classe AeronavePassageiros
export class AeronavePassageiros extends AeronaveComercial {
    #maxPassageiros;

    // Constructor de criacao
    constructor(prefixo, velocidade, autonomia, nomeCia, maxPassageiros) {
        validate(maxPassageiros, 'Number'); // valida tipo do parametro

        super(prefixo, velocidade, autonomia, nomeCia); // herda constructor da classe pai
        this.#maxPassageiros = maxPassageiros;
    }

    // Get do maximo de passageiros
    get maxPassageiros() {
        return this.#maxPassageiros;
    }

    // Sobrescreve metodo toString da classe pai, adicionando informacoes
    toString() {
        return super.toString() + `, capacidade máxima: ${this.maxPassageiros} passageiros`;
    }
}

// Classe AeronaveCarga
export class AeronaveCarga extends AeronaveComercial {
    #pesoMax;

    // Constructor de criacao
    constructor(prefixo, velocidade, autonomia, nomeCia, pesoMax) {
        validate(pesoMax, 'Number'); // valida tipo do parametro

        super(prefixo, velocidade, autonomia, nomeCia); // herda constructor da classe pai
        this.#pesoMax = pesoMax;
    }

    // Get do peso maximo
    get pesoMax() {
        return this.#pesoMax;
    }

    // Sobrescreve metodo toString da classe pai, adicionando informacoes
    toString() {
        return super.toString() + `, carga máxima: ${this.pesoMax} toneladas`;
    }
}

// Classe ServicoAeronaves
export class ServicoAeronaves {
    #aeronaves

    // Inicializa como array vazio
    constructor() {
        this.#aeronaves = []
    }

    // Adiciona uma aeronave
    adiciona( aeronave ) {
        validate(aeronave, Aeronave); // valida que é instancia de Aeronave
        this.#aeronaves.push(aeronave); // adiciona ao array
        return true;
    }

    // Consulta aeronave pelo prefixo
    recupera( prefixo ) {
        return this.#aeronaves.filter(a => a.prefixo === prefixo)[0];
    }

    // Retorna todas as aeronaves
    todas() {
        return this.#aeronaves.values();
    }
}