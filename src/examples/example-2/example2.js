const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;

exports.validate = (cpf) => {
    if (!cpf) {
        return false;
    }

    cpf = cpfWithDigitsOnly(cpf);
    if (!isValidLength(cpf)) {
        return false;
    }
    if (hasAllDigitsEqual(cpf)) {
        return false;
    }
    const digit1 = calculateCheckDigit(cpf, FACTOR_DIGIT_1);
    const digit2 = calculateCheckDigit(cpf, FACTOR_DIGIT_2);
    const checkDigit = extractCheckDigit(cpf);
    const calculatedDigit = `${digit1}${digit2}`;
    return checkDigit == calculatedDigit;
}

const cpfWithDigitsOnly = cpf => cpf.replace(/[\.\-]/g, '').trim();

const isValidLength = cpf => cpf.length === 11;

const hasAllDigitsEqual = cpf => {
    const [firstDigit] = cpf;
    return [...cpf].every(digit => digit === firstDigit);
};

const extractCheckDigit = cpf => cpf.slice(9);

const calculateCheckDigit = (cpf, factor) => {
    let total = 0;
    for (const digit of cpf) {
        if (factor > 1) {
            total += digit * factor--;
        }
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : (11 - rest);
}