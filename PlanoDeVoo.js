import { validate } from "bycontract";

// Clase Plano de Voo
export class PlanoDeVoo {
    #id;
    #matricPiloto;
    #prefixoAeronave;
    #idAerovia;
    #data;
    #horario;
    #horarioChegada;
    #altitude;
    #slots;
    #cancelado;

    // Constructor de criacao
    constructor(matricPiloto, prefixoAeronave, idAerovia, data, horario, horarioChegada, altitude, slots) {
        validate(arguments, ['String', 'String', 'String', 'String', 'String', 'String', 'Number', 'Array.<Number>']);

        this.#matricPiloto = matricPiloto;
        this.#prefixoAeronave = prefixoAeronave;
        this.#idAerovia = idAerovia;
        this.#data = data;
        this.#horario = horario;
        this.#horarioChegada = horarioChegada;
        this.#altitude = altitude;
        this.#slots = slots;
        this.#cancelado = false;
    }

    // Metodos get das propriedades do Plano de Voo
    get id() {
        return this.#id;
    }

    get matricPiloto() {
        return this.#matricPiloto;
    }

    get prefixoAeronave() {
        return this.#prefixoAeronave;
    }

    get idAerovia() {
        return this.#idAerovia;
    }

    get data() {
        return this.#data;
    }

    get horario() {
        return this.#horario;
    }

    get horarioChegada() {
        return this.#horarioChegada;
    }

    get altitude() {
        return this.#altitude;
    }
    
    get slots() {
        return this.#slots.values();
    }

    // Metodo set do id
    set id( id ) {
        this.#id = id;
    }

    // Cancela o plano de voo
    cancelaPlano() {
        this.#cancelado = true;
    }

    // Metodo que retorna se o plano de voo foi cancelado
    isCancelado() {
        return this.#cancelado;
    }

    // Retorna informacoes do plano de voo
    toString(sp, sa, sv) {
        const piloto = sp.recupera(this.matricPiloto);
        const aeronave = sa.recupera(this.prefixoAeronave);
        const aerovia = sv.recuperaId(this.idAerovia);

        let str  = ` Plano de voo: ${this.id}, Status: ${this.isCancelado ? 'Cancelado' : 'Aprovado'}\n`;
            str += `, Data: ${this.data}, Saída: ${this.horario}, Chegada: ${this.horarioChegada}\n\n`;
            str += ` Informações da Aerovia:\n`;
            str += `,${aerovia.toString()}\n`;
            str += `   - Altitude: ${this.altitude}\n\n`;
            str += `Informações do Piloto:\n`;
            str += `,${piloto.toString()}\n\n`;
            str += `Informações da Aeronave:\n`;
            str += `,${aeronave.toString()}`;
        return str;
    }
}

// Classe ServicoPlanos
export class ServicoPlanos {
    #planos;
    #id = 1;

    // Inicializa como array vazio
    constructor() {
        this.#planos = [];
    }

    // Adiciona um plano de voo
    consiste( planoVoo ) {
        validate(planoVoo, PlanoDeVoo); // valida que é instancia de Plano de Voo
        let id = this.#id;
        planoVoo.id = id; // atribui um id ao plano de voo
        this.#planos.push(planoVoo); // adiciona ao array
        this.#id++; // atribui um novo id para o proximo plano
        return id; // retorna o id do plano de voo
    }

    // Consulta planos de voo pelo id
    recupera( id ) {
        return this.#planos.filter(p => p.id === id)[0];
    }
}