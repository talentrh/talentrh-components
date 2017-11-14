export default {

  isValidCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999") {
        return false;
      }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11)
      rev = 0;

    if (rev != parseInt(cpf.charAt(9))) {
      return false;
    }

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;

    if (rev != parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  },

  isValidCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '' || cnpj.length !== 14) {
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999") {
        return false;
      }

    // Valida DVs
    var len = cnpj.length - 2
    var numbers = cnpj.substring(0, len);
    var digits = cnpj.substring(len);
    var sum = 0;
    var pos = len - 7;
    for (var i = len; i >= 1; i--) {
      sum += numbers.charAt(len - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== digits.charAt(0)) {
      return false;
    }

    len = len + 1;
    numbers = cnpj.substring(0, len);
    sum = 0;
    pos = len - 7;
    for (i = len; i >= 1; i--) {
      sum += numbers.charAt(len - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== digits.charAt(1)) {
      return false;
    }

    return true;
  }

};
