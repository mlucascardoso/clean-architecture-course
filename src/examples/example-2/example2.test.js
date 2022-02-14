const example2 = require('./example2');

const invalidCpfWithSameDigits = [
    '085.669.959-44',
    '111.111.111-11',
    '222.222.222-22'
];

test("Deve testar um cpf válido", () => {
    const cpf = '085.669.959-45';
    const isValid = example2.validate(cpf);
    expect(isValid).toBeTruthy();
});

describe.each(invalidCpfWithSameDigits)('Deve testar um cpf inválido com dígitos iguais', cpf => {
    test(`${cpf}`, () => {
        const isValid = example2.validate(cpf);
        expect(isValid).toBeFalsy()
    })
})