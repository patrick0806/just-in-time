export function validCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '' || cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Calcula e compara os primeiros dígitos verificadores
  let length = cnpj.length - 2;
  let cnpjNumbers = cnpj.substring(0, length);
  const digitos = cnpj.substring(length);
  let sum = 0;
  let position = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(cnpjNumbers.charAt(length - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  // Calcula e compara o segundo dígito verificador
  length++;
  cnpjNumbers = cnpj.substring(0, length);
  sum = 0;
  position = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(cnpjNumbers.charAt(length - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }

  return true;
}
