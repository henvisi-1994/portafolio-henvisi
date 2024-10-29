import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  getErrorMessage(control: AbstractControl, controlName: string): string {
    if (control.hasError('required')) {
      return 'Este campo es requerido';
    } else if (control.hasError('minlength')) {
      return `El ${controlName} debe tener al menos ${control.getError('minlength').requiredLength} caracteres`;
    } else if (control.hasError('maxlength')) {
      return `El ${controlName} no puede tener más de ${control.getError('maxlength').requiredLength} caracteres`;
    } else if (control.hasError('email')) {
      return 'El correo electrónico no es válido';
    } else if (control.hasError('pattern')) {
      return `El formato de ${controlName} es incorrecto`;
    }
    return '';
  }
}
