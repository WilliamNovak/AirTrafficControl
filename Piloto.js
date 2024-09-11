import { validate } from "bycontract"

// Classe Piloto
export class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;

    // Constructor de criacao
    constructor(matricula, nome) {
        validate(arguments, ['String','String']); // valida tipo dos parametros
        this.#matricula = matricula;
        this.#nome = nome
        this.#habilitacaoAtiva = true;
    }

    // Metodos get das propriedades do piloto
    get matricula() {
        return this.#matricula;
    }

    get nome() {
        return this.#nome;
    }

    // Define a habilitacao como ativa
    ativa() {
        this.#habilitacaoAtiva = true;
    }

    // Define a habilitacao como inativa
    inativa() {
        this.#habilitacaoAtiva = false;
    }

    // Retorna true habilitacao estiver ativa, ou false para inativa
    isAtiva() {
        return this.#habilitacaoAtiva;
    }

    // Retorna informacoes do piloto
    toString() {
        let str  = ` Matrícula: ${this.matricula}\n`;
            str += `, Piloto: ${this.nome}, habilitação: ${this.isAtiva() ? 'ativa' : 'inativa'}`;
        return str;
    }
}

// Classe ServicoPilotos
export class ServicoPilotos {
    #pilotos

    // Inicializa como array vazio
    constructor() {
        this.#pilotos = []
    }

    // Adiciona um piloto
    adiciona( piloto ) {
        validate(piloto, Piloto); // valida que é instancia de Piloto
        this.#pilotos.push(piloto); // adiciona ao array
        return true;
    }

    // Consulta piloto pela matricula
    recupera( matricula ) {
        return this.#pilotos.filter(p => p.matricula === matricula)[0];
    }

    // Retorna todos pilotos
    todos() {
        return this.#pilotos.values();
    }
}