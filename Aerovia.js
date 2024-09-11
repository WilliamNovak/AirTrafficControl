import { validate } from "bycontract";

// Classe Aerovia
export class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho;

    // Constructor de criacao
    constructor(id, origem, destino, tamanho) {
        validate(arguments, ['String', 'String', 'String', 'Number']); // valida tipo dos parametros

        this.#id = id;
        this.#origem = origem.toUpperCase(); // converte para maiusculas
        this.#destino = destino.toUpperCase(); // converte para maiusculas
        this.#tamanho = tamanho;
    }

    // Metodos get das propriedades da aerovia
    get id() {
        return this.#id;
    }

    get origem() {
        return this.#origem;
    }

    get destino() {
        return this.#destino;
    }

    get tamanho() {
        return this.#tamanho;
    }

    // Retorna informacoes da aerovia
    toString() {
        return ` Aerovia: ${this.id} ${this.origem}-${this.destino}, ${this.#tamanho}km`;
    }
}

// Classe ServicoAerovias
export class ServicoAerovias {
    #aerovias;

    // Inicializa como array vazio
    constructor() {
        this.#aerovias = [];
    }

    // Adiciona uma aerovia
    adiciona( aerovia ) {
        validate(aerovia, Aerovia); // valida que é instancia de Aerovia
        this.#aerovias.push(aerovia); // adiciona ao array
        return true;
    }

    // Consulta aerovias pela origem e destino
    recupera( origem, destino ) {
        // Filtra aerovias por origem e destino e retorna todas que encontrar
        return this.#aerovias.filter(a => a.origem === origem && a.destino === destino).values();
    }

    // Consulta aerovias pelo id
    recuperaId( id ) {
        return this.#aerovias.filter(a => a.id === id)[0];
    }
}