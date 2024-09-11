// Importa classes necessarias
import { aprovarPlanoDeVoo } from '../validaDados.js';
import { Piloto } from '../Piloto.js';
import { AeronavePassageiros, AeronaveCarga, AeronaveParticular } from '../Aeronave.js';
import { Aerovia } from '../Aerovia.js';
import { OcupacaoAerovia } from '../OcupacaoAerovia.js';
import { PlanoDeVoo } from '../PlanoDeVoo.js';

describe('aprovarPlanoDeVoo', () => {
    // Mockando objetos para os testes
    const pilotoAtivo = new Piloto('123', 'William');
    const pilotoInativo = new Piloto('456', 'Joao');
    pilotoInativo.inativa();

    const aeronaveParticular = new AeronaveParticular('123', 3000, 1200, 'RESP');
    const aeronavePassageiros = new AeronavePassageiros('ABC', 1000, 2500, 'CIA', 20);
    const aeronaveCarga = new AeronaveCarga('456', 500, 1000, 'CIA', 100);

    const aeroviaCurta = new Aerovia('1', 'SP', 'RJ', 600);
    const aeroviaLonga = new Aerovia('2', 'SP', 'POA', 2000);

    const ocupacaoAerovia = new OcupacaoAerovia();

    describe('deve aprovar', () => {
        it('plano de voo válido de passageiros', () => {
            expect(
                aprovarPlanoDeVoo(pilotoAtivo, aeronavePassageiros, aeroviaLonga, '10/11/2024', '10:00', 30000, ocupacaoAerovia)
            ).toBeInstanceOf(PlanoDeVoo);
            expect(
                aprovarPlanoDeVoo(pilotoAtivo, aeronavePassageiros, aeroviaCurta, '10/11/2024', '04:00', 33000, ocupacaoAerovia)
            ).toBeInstanceOf(PlanoDeVoo);
        });

        it('plano de voo válido particular', () => {
            expect(
                aprovarPlanoDeVoo(pilotoAtivo, aeronaveParticular, aeroviaCurta, '10/11/2024', '10:00', 26000, ocupacaoAerovia)
            ).toBeInstanceOf(PlanoDeVoo);
        });

        it('plano de voo válido de carga', () => {
            expect(
                aprovarPlanoDeVoo(pilotoAtivo, aeronaveCarga, aeroviaCurta, '10/11/2024', '02:00', 33000, ocupacaoAerovia)
            ).toBeInstanceOf(PlanoDeVoo);
        });

        it('mesma aerovia e altitude, em datas diferentes', () => {
            expect(
                aprovarPlanoDeVoo(pilotoAtivo, aeronaveCarga, aeroviaCurta, '11/11/2024', '02:00', 33000, ocupacaoAerovia)
            ).toBeInstanceOf(PlanoDeVoo);
        });
    })

    describe('deve rejeitar', () => {
        it('plano de voo com piloto inativo', () => {
            const plano = aprovarPlanoDeVoo(pilotoInativo, aeronavePassageiros, aeroviaCurta, '10/11/2024', '10:00', 30000, ocupacaoAerovia);
            expect(plano).toBe(false);
        });

        it('plano de voo com aeronave sem autonomia', () => {
            const plano = aprovarPlanoDeVoo(pilotoAtivo, aeronaveCarga, aeroviaLonga, '10/11/2024', '02:00', 28000, ocupacaoAerovia);
            expect(plano).toBe(false);
        });

        it('plano de voo com altitude inválida para aeronave de passageiros', () => {
            const plano = aprovarPlanoDeVoo(pilotoAtivo, aeronavePassageiros, aeroviaLonga, '10/11/2024', '12:50', 27000, ocupacaoAerovia);
            expect(plano).toBe(false);
        });

        it('plano de voo com horário inválido para aeronave de carga', () => {
            const plano = aprovarPlanoDeVoo(pilotoAtivo, aeronaveCarga, aeroviaCurta, '10/11/2024', '12:50', 27000, ocupacaoAerovia);
            expect(plano).toBe(false);
        });

        it('plano de voo com aerovia ocupada', () => {
            let plano = aprovarPlanoDeVoo(pilotoAtivo, aeronavePassageiros, aeroviaCurta, '10/11/2024', '02:00', 33000, ocupacaoAerovia);
            expect(plano).toBe(false);
            plano = aprovarPlanoDeVoo(pilotoAtivo, aeronavePassageiros, aeroviaCurta, '10/11/2024', '03:00', 33000, ocupacaoAerovia);
            expect(plano).toBe(false);
        });

        it('data ou horario invalidos', () => {
            let plano = aprovarPlanoDeVoo(pilotoAtivo, aeronaveCarga, aeroviaCurta, '31/11/2024', '12:50', 27000, ocupacaoAerovia);
            expect(plano).toBe(false);
            plano = aprovarPlanoDeVoo(pilotoAtivo, aeronaveCarga, aeroviaCurta, '30/11/2024', '24:50', 27000, ocupacaoAerovia);
            expect(plano).toBe(false);
        });
    });

    describe('apos reprovar, deve aprovar', () => {
        it('plano de voo com aerovia que foi desocupada', () => {
            ocupacaoAerovia.desocupa('1', '10/11/2024', 2, 33000); // desocupa slot das 2h
            ocupacaoAerovia.desocupa('1', '10/11/2024', 3, 33000); // desocupa slot das 3h

            expect(
                aprovarPlanoDeVoo(pilotoAtivo, aeronavePassageiros, aeroviaCurta, '10/11/2024', '02:00', 33000, ocupacaoAerovia)
            ).toBeInstanceOf(PlanoDeVoo);
        });
    });
});