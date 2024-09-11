import { validate } from "bycontract";

// Classe que armazena aerovias ocupadas por data e slot
export class OcupacaoAerovia {
    #aeroviasOcupadas;

    // Inicializa como dicionario vazio
    constructor() {
        this.#aeroviasOcupadas = new Map();
    }

    // Metodo para ocupar uma aerovia em uma data, altitude e slot de tempo
    ocupa (idAerovia, data, slot, altitude) {
        validate(arguments, ['String', 'String', 'Number', 'Number']);

        // verifica se ja nao esta ocupado para os parametros
        if (!this.isOcupado(idAerovia, data, slot, altitude)) {
            
            // busca as colecoes ja existentes, ou cria novas
            let aeroviaMap = this.#aeroviasOcupadas.get(idAerovia) || new Map();
            let dataMap = aeroviaMap.get(data) || new Map();
            let slotMap = dataMap.get(slot) || new Map();
            
            // ocupa a aerovia na data, altitude e slot
            slotMap.set(altitude, true);
            dataMap.set(slot, slotMap);
            aeroviaMap.set(data, dataMap);
            this.#aeroviasOcupadas.set(idAerovia, aeroviaMap);
            
        } else {
            // quando ja estiver ocupada, exibe mensagem de aviso
            console.error('Aerovia já está ocupada para esta altitude, neste slot de tempo.')
            return false;
        }
        // se ocorrer tudo certo, retorna true
        return true;
    }

    // Metodo para desocupar uma aerovia em uma data, altitude e slot de tempo
    desocupa (idAerovia, data, slot, altitude) {
        validate(arguments, ['String', 'String', 'Number', 'Number']);
        // Busca nas colecoes pelos parametros
        let aeroviaMap = this.#aeroviasOcupadas.get(idAerovia);
        let dataMap = aeroviaMap.get(data);
        let slotMap = dataMap.get(slot);

        // Desocupa aerovia
        slotMap.set(altitude, false);
        dataMap.set(slot, slotMap);
        aeroviaMap.set(data, dataMap);
        this.#aeroviasOcupadas.set(idAerovia, aeroviaMap);

        return true;
    }

    // Metodo que verifica se aerovia ja esta ocupada na data, altitude e slot
    isOcupado (idAerovia, data, slot, altitude) {
        validate(arguments, ['String', 'String', 'Number', 'Number']);

        const aeroviaMap = this.#aeroviasOcupadas.get(idAerovia);
        // verifica se aerovia ja esta ocupada
        if (aeroviaMap) {
            const dataMap = aeroviaMap.get(data);
            // verifica se data ja esta ocupada
            if (dataMap) {
                const slotMap = dataMap.get(slot);
                // verifica se o slot ja esta ocupado
                if (slotMap) {
                    const altitudeSlot = slotMap.get(altitude);
                    // verifica se a altitude ja esta ocupada
                    if (altitudeSlot) {
                        return true;
                    }
                }
            }
        }
        // Quando nao esta ocupado, retorna false
        return false;
    }

    // Metodo que retorna as altitudes livres em uma aerovia, data e slot
    altitudesLivres (idAerovia, data, slot) {
        validate(arguments, ['String', 'String', 'Number']);
        let livre = [];

        // Percorre as altitudes possiveis
        for (let altitude = 25000; altitude < 35000; altitude += 1000) {

            // Verifica se ja esta ocupada
            if (!this.isOcupado(idAerovia, data, slot, altitude)) {
                // Se nao estiver, adiciona no array
                livre.push(altitude);
            }
        }

        return livre.values();
    }
}