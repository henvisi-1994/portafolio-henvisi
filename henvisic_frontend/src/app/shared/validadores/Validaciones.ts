/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fechaMayorActual(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor = control.value;
    if (!valor) {
      return null;
    }

    const arrayFechaLimite = valor.split('-'); //devuelve array en formato [dia, mes, año]
    const fechaActual = new Date();
    const fechaRecibida = new Date(+arrayFechaLimite[2], +arrayFechaLimite[1] - 1, +arrayFechaLimite[0]);

    return fechaActual <= fechaRecibida ? null : { 'fechaMayorActual': true };
  };
}

export function valida2rCedula(cedula: string): boolean {
  if (cedula.length !== 10 || isNaN(Number(cedula))) {
    return false;
  }

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  const total_caracteres = cedula.length - 1;
  const digito_verificador = Number(cedula.charAt(total_caracteres));

  for (let i = 0; i < total_caracteres; i++) {
    const valor = Number(cedula.charAt(i));
    let resultado = valor * coeficientes[i];

    if (resultado > 9) {
      resultado = resultado - 9;
    }

    suma += resultado;
  }

  const total = suma + digito_verificador;

  if (total % 10 == 0 && digito_verificador == 0) {
    return true;
  } else if (10 - (total % 10) == digito_verificador) {
    return true;
  } else {
    return false;
  }
}

export function validarCedula(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cedula = control.value;
    let total = 0;
    const longitud = cedula.length;
    const longcheck = longitud - 1;

    if (cedula && longitud === 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          let aux = parseInt(cedula.charAt(i)) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cedula.charAt(i));
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      if (parseInt(cedula.charAt(longitud - 1)) === total) {
        return null;
      } else {
        return { 'validarCedula': false };
      }
    }

    return { 'validarCedula': false };
  };
}
