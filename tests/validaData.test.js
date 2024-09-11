import { validaMes, validaDia, formataData, validaHorario } from '../validaDados.js';

describe('Validação de datas', () => {
    describe('validaMes', () => {
        it('deve retornar true para meses válidos', () => {
            expect(validaMes(1)).toBe(true);
            expect(validaMes(12)).toBe(true);
        });

        it('deve retornar false para meses inválidos', () => {
            expect(validaMes(0)).toBe(false);
            expect(validaMes(13)).toBe(false);
            expect(validaMes('abc')).toBe(false); // Teste com um valor não numérico
        });
    });

    describe('validaDia', () => {
        it('deve retornar true para dias válidos', () => {
            expect(validaDia(1, 1, 2023)).toBe(true);
            expect(validaDia(29, 2, 2020)).toBe(true); // Ano bissexto
            expect(validaDia(31, 12, 2023)).toBe(true);
        });

        it('deve retornar false para dias inválidos', () => {
            expect(validaDia(0, 1, 2023)).toBe(false);
            expect(validaDia(32, 1, 2023)).toBe(false);
            expect(validaDia(29, 2, 2021)).toBe(false); // Não é ano bissexto
            expect(validaDia('abc', 1, 2023)).toBe(false); // Teste com valor não numérico
        });
    });

    describe('formataData', () => {
        it('deve retornar false para formato de data inválido', () => {
            const data = '31/13/2023';
            const resultado = formataData(data);
            expect(resultado).toBe(false);
        });
      
        it('deve retornar false para mês inválido', () => {
            const data = '01/13/2024';
            const resultado = formataData(data);
            expect(resultado).toBe(false);
        });
      
        it('deve retornar false para dia inválido', () => {
            const data = '31/02/2023';
            const resultado = formataData(data);
            expect(resultado).toBe(false);
        });
      
        it('deve retornar false para data anterior à data atual', () => {
            // Valida data no passado
            const data = '01/01/2023';
            const resultado = formataData(data);
            expect(resultado).toBe(false);
        });
    });

    describe('validaHorario', () => {
        it('deve retornar true para horários válidos', () => {
            expect(validaHorario('00:00')).toBe(true);
            expect(validaHorario('23:59')).toBe(true);
            expect(validaHorario('12:34')).toBe(true);
            expect(validaHorario('09:00')).toBe(true);
        });
      
        it('deve retornar false para horários inválidos', () => {
            expect(validaHorario('24:00')).toBe(false);
            expect(validaHorario('30:12')).toBe(false);
            expect(validaHorario('12:60')).toBe(false);
            expect(validaHorario('12a34')).toBe(false);
            expect(validaHorario('12 34')).toBe(false);
            expect(validaHorario('12')).toBe(false);
        });
      
        it('deve retornar false para entradas vazias ou nulas', () => {
            expect(validaHorario('')).toBe(false);
            expect(validaHorario(null)).toBe(false);
            expect(validaHorario(undefined)).toBe(false);
        });
    });
});