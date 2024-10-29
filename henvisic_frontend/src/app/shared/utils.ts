/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { EntidadAuditable } from './domain/EntidadAuditable';
import { ApiError } from './interfaces/ApiError';
import { MatSnackBar } from '@angular/material/snack-bar';

export function limpiarListado<T>(listado: T[]): void {
  listado.splice(0, listado.length);
}

export function reemplazarListado<T>(listado: T[], elementos: T[]): void {
  listado.splice(0, listado.length, ...elementos);
}

export function compararObjetos(
  data_inicial?: EntidadAuditable,
  data_final?: EntidadAuditable
): boolean {
  return JSON.stringify(data_inicial) !== JSON.stringify(data_final);
}

export function validarKeyBuscar(keyCode?: number): boolean {
  return keyCode === 9 || keyCode === 13;
}

export function validarEmail(email?: string): boolean {
  const validador =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,:\s@']+(\.[^<>()\[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validador.test(String(email).toLowerCase());
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function descargarArchivo(
  data: any,
  titulo: string,
  formato: string,
  tipo = 'application'
): void {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(
    new Blob([data], { type: `${tipo}/${formato}` })
  );
  link.setAttribute('download', `${titulo}.${formato}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function agregarCerosIzquierda(
  num: string | number,
  size: number
): string {
  const parse =
    typeof num === 'string' ? parseInt(num === '' ? '1' : num) : num;
  return (Math.pow(10, size) + parse).toString().substring(1);
}

/* imprimirArchivo(data: any, formato: PrintTypes) {
    const objectUrl = URL.createObjectURL(
      new Blob([data], {type: `application/${formato}`})
    )
    PrintJS({
      printable: objectUrl,
      type: formato
    })
  } */

export function clonar(data: EntidadAuditable): any {
  return JSON.parse(JSON.stringify(data));
}

export function crearIconoHtml(icon: string): any {
  const iconHTML = document.createElement('i');
  iconHTML.classList.add('bi', icon);
  return iconHTML;
}

export function quitarComasNumero(num: string): string {
  let formateo = '0';
  if (num !== undefined) {
    num = `${num}`;
    formateo = num.toString();
    formateo = formateo.replace(/,/gi, '');
  }
  return formateo;
}

export function convertirDecimalFloat(num: string): number {
  return typeof num === 'undefined' ||
    num === null ||
    num === '' ||
    num === '.' ||
    num.toString() === 'NaN'
    ? 0
    : parseFloat(quitarComasNumero(num));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function redondear(numero: any, decimales = 6): number {
  numero = numero ? numero : 0;
  numero = convertirDecimalFloat(numero);
  return +`${Math.round(parseFloat(`${numero}e+${decimales}`))}e-${decimales}`;
}

/**
 *
 * @param entidad: Instancia de entidad
 * @param atributos: Array de atributos que se desean redondear
 * @param decimales: Cantidad de decimales
 */
export function redondearAtributos<R = Record<string, number>>(
  entidad: R,
  atributos: (keyof R)[],
  decimales: number
): void {
  for (const atributo of atributos) {
    entidad[atributo] = redondear(entidad[atributo], decimales) as any;
  }
}

export function formatoNumeroTexto(
  amount: number,
  decimalCount: number
): string {
  return amount
    .toFixed(decimalCount)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function resaltarCampoNoValido(errors: string[]): boolean | null {
  return errors.length > 0 ? false : null;
}

export function mensajeCampoNoValido(errors: string[]): string {
  return errors[0];
}

export function obtenerStringCerosUno(cantidadCeros: number): string {
  return (Math.pow(10, cantidadCeros) + 1).toString().substring(1);
}

export function generarFilters<T>(
  listaIDs: number[],
  campoFiltrado: keyof T
): string | null {
  let res = '';
  listaIDs.forEach((id: number, index: number) => {
    res += `${index > 0 ? '|' : ''}(${campoFiltrado.toString()}=${id})`;
  });
  if (listaIDs.length === 0) return null;
  return res;
}

export function partirNumeroDocumento(numeroDocumento: string): string[] {
  return numeroDocumento.split('-');
}

export function construirNumeroDocumento(
  establecimiento: string,
  punto_emision: string,
  secuencial: string
): string {
  return `${establecimiento}-${punto_emision}-${secuencial}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export function isAxiosError(candidate: any): candidate is ApiError {
  return candidate instanceof ApiError === true;
}

export async function notificarMensajesError(
  mensajes: string[],
  notificaciones: any
): Promise<void> {
  for (let i = 0; i < mensajes.length; i++) {
    notificaciones.notificarAdvertencia(mensajes[i]);
  }
}

// DEPURAR ESTE CODIGO (NO SE USA EN NINGUNA PARTE)
// export function gestionarNotificacionError(
//   error: any,
//   notificaciones: any
// ): void {
//   if (isAxiosError(error)) {
//     const mensajes: string[] = error.erroresValidacion
//     if (mensajes.length > 0) {
//       notificarMensajesError(mensajes, notificaciones)
//     } else {
//       if (error.status === 413) {
//         notificaciones.notificarAdvertencia(
//           'El tamaño del archivo es demasiado grande.'
//         )
//       } else {
//         notificaciones.notificarAdvertencia(error.mensaje)
//       }
//     }
//   } else {
//     notificaciones.notificarAdvertencia(error.message)
//   }
// }

export function wrap(el: HTMLElement, wrapper: HTMLElement) {
  el.parentNode?.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export function resetInput(input: HTMLElement) {
  const form = document.createElement('form');
  wrap(input, form);
  form.reset();
}

// 20-04-2022
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function obtenerFechaActual(formato = 'DD-MM-YYYY'): string {
  const timeStamp = Date.now();
  const formattedString = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(timeStamp);
  return formattedString;
}

/**
 * Funcion para remover tildes o acentos de una cadena
 * @param accents cadena que se va a limpiar
 * @returns cadena sin acentos ni tildes
 */
export function removeAccents(accents: string) {
  return accents.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Lunes, 16 Enero 2023
export function obtenerFechaActualTexto(): string {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(Date.now());
}
// 20-04-2022 12:30:00
export function obtenerFechaHoraActual(): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(Date.now());
}

export function obtenerMensajesError() {
  //
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function stringToArray(listado: string) {
  const array = listado.split(',');
  return array.map((item) => item.trim());
}

export function quitarItemDeArray(listado: any[], elemento: string) {
  return listado.filter((item) => item !== elemento);
}

export function filtrarLista(
  val: string,
  update: any,
  lista: any,
  clave: string,
  defaultValue = []
) {
  if (val === '') {
    update(() => (lista.value = defaultValue));
  } else {
    update(() => {
      const needle = val.toLowerCase();
      lista.value = defaultValue.filter(
        (v: any) => v[clave].toLowerCase().indexOf(needle) > -1
      );
    });
  }
}

/**
 * La función `ordenarLista` ordena una lista determinada según una clave específica.
 * Esta función sirve para ordenar cualquier lista que se muestra en un select.
 * En el metodo popup-show debe envíar como argumentos la lista y la clave por la cual quiere ordenar los registros.
 * @param lista - El parámetro "lista" es una matriz de objetos que desea ordenar.
 * @param {string} clave - El parámetro "clave" es una cadena que representa la clave o propiedad de
 * los objetos en la matriz "lista" que se utilizará para ordenar.
 */
export function ordenarLista(lista: any[], clave: string) {
  lista.sort((a, b) => ordernarListaString(a[clave], b[clave]));
}

/**
 *  Función de comparación para ordenar dos strings, se debe usar de la siguiente manera:
 * (a,b)=>ordenarListaString(a.propiedad, b.propiedad)
 * @param a primer string
 * @param b segundo string
 * @returns el valor de ordenación segun sea menor, mayor o igual la comparación dada
 */
export function ordernarListaString(a: string, b: string) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function extraerRol(roles: string[], rolConsultar: string) {
  return roles.some((rol: string) => rol === rolConsultar);
}

/**
 * La función "extraerPermiso" comprueba si existe un permiso dado en una lista de permisos.
 * @param {string[]} permisos - Una matriz de cadenas que representan los permisos.
 * @param {string} permisoConsultar - El parámetro `permisoConsultar` es una cadena que representa el
 * permiso a consultar. Debe ser en base a la estructura de establecida para nombres de permisos (Ej. 'puede.ver.accion')
 * @returns un valor booleano.
 */
export function extraerPermiso(permisos: string[], permisoConsultar: string) {
  return permisos.some((permiso: string) => permiso === permisoConsultar);
}

export function formatearFecha(fecha: string): string {
  const arrayFecha = fecha.split('-').map(Number); // '2019-06-22' -> [2019, 06, 22]
  const fechaTmp = new Date(arrayFecha[0], arrayFecha[1] - 1, arrayFecha[2]); // MM va de 0 (enero) a 11 (diciembre)
  return fechaTmp.toLocaleDateString(); // Formato: dd/MM/yyyy
}

export function formatearFechaHora(fecha: string, hora: string): string {
  // fecha en formato DD-MM-YYYY
  const [day, month, year] = fecha.split('-').map(Number);
  const [hours, minutes, seconds] = hora.split(':').map(Number);

  const nuevaFecha = new Date(year, month - 1, day, hours, minutes, seconds);
  const yyyy = nuevaFecha.getFullYear();
  const mm = String(nuevaFecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const dd = String(nuevaFecha.getDate()).padStart(2, '0');
  const hh = String(nuevaFecha.getHours()).padStart(2, '0');
  const min = String(nuevaFecha.getMinutes()).padStart(2, '0');
  const ss = String(nuevaFecha.getSeconds()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

// recibe fecha dd-mm-yyyy y sale yyyy-mm-dd con el nuevo separador
export function formatearFechaSeparador(
  fecha: string,
  separador: string,
  sumarTiempo?: { days?: number; months?: number; years?: number }
): string {
  // fecha en formato DD-MM-YYYY
  const [day, month, year] = fecha.split('-').map(Number);
  const nuevaFecha = new Date(year, month - 1, day);

  if (sumarTiempo) {
    if (sumarTiempo.days)
      nuevaFecha.setDate(nuevaFecha.getDate() + sumarTiempo.days);
    if (sumarTiempo.months)
      nuevaFecha.setMonth(nuevaFecha.getMonth() + sumarTiempo.months);
    if (sumarTiempo.years)
      nuevaFecha.setFullYear(nuevaFecha.getFullYear() + sumarTiempo.years);
  }

  const yyyy = nuevaFecha.getFullYear();
  const mm = String(nuevaFecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const dd = String(nuevaFecha.getDate()).padStart(2, '0');

  return `${yyyy}${separador}${mm}${separador}${dd}`;
}

export function formatearFechaTexto(fecha: number) {
  return new Date(fecha).toLocaleDateString('es-Es', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generarColorHexadecimalAleatorio() {
  const r = Math.floor(Math.random() * 128 + 128); // Componente rojo entre 128 y 255
  const g = Math.floor(Math.random() * 128 + 128); // Componente verde entre 128 y 255
  const b = Math.floor(Math.random() * 128 + 128); // Componente azul entre 128 y 255

  const colorHexadecimal =
    '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return colorHexadecimal;
}

function componentToHex(component: any) {
  const hex = component.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export function generarColorPastelAzulAleatorio() {
  const r = Math.floor(Math.random() * 128); // Componente rojo entre 0 y 127
  const g = Math.floor(Math.random() * 128 + 128); // Componente verde entre 0 y 127
  const b = Math.floor(Math.random() * 128); // Componente azul entre 128 y 255

  const colorHexadecimal =
    '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return colorHexadecimal;
}

// --
export function generarColorAzulPastelClaro() {
  // Generar valores RGB altos (entre 150 y 220) para obtener un tono azul claro
  const r = Math.floor(Math.random() * 70) + 150;
  const g = Math.floor(Math.random() * 70) + 150;
  const b = Math.floor(Math.random() * 100) + 155; // Para asegurarse de que el tono sea azul claro

  // Ajustar el brillo para hacerlo más claro (entre 0.7 y 1.0)
  const brillo = Math.random() * 0.3 + 0.7;

  // Convertir a formato hexadecimal
  const colorHex =
    '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  // Aplicar el brillo al color hexadecimal
  const colorClaroHex = ajustarBrillo(colorHex, brillo);

  return colorClaroHex;
}

function ajustarBrillo(colorHex: string, brillo: number) {
  const r = parseInt(colorHex.substr(1, 2), 16);
  const g = parseInt(colorHex.substr(3, 2), 16);
  const b = parseInt(colorHex.substr(5, 2), 16);

  const rNuevo = Math.round(r * brillo);
  const gNuevo = Math.round(g * brillo);
  const bNuevo = Math.round(b * brillo);

  const colorOscuroHex = `#${((rNuevo << 16) | (gNuevo << 8) | bNuevo)
    .toString(16)
    .padStart(6, '0')}`;
  return colorOscuroHex;
}

/**
 * La función verifica si una matriz tiene elementos repetidos.
 * @param array - El parámetro `array` es una matriz de elementos.
 * @returns un valor booleano. Devuelve verdadero si la matriz de entrada tiene elementos repetidos y
 * falso si todos los elementos de la matriz son únicos.
 */
export function tieneElementosRepetidos(array: any[]) {
  const set = new Set(array);
  return set.size !== array.length;
}

/**
 * La función comprueba si una matriz de objetos contiene objetos duplicados.
 * @param arrayDeObjetos - El parámetro `arrayDeObjetos` es una matriz de objetos.
 * @returns un valor booleano. Devuelve verdadero si hay objetos repetidos en la matriz y falso si no
 * hay objetos repetidos.
 */
export function tieneElementosRepetidosObjeto(arrayDeObjetos: any[]) {
  const objetoSet = new Set();
  for (const objeto of arrayDeObjetos) {
    const objetoString = JSON.stringify(objeto);
    if (objetoSet.has(objetoString)) {
      return true;
    } else {
      objetoSet.add(objetoString);
    }
  }
  return false;
}

/**
 * La función calcula el monto del descuento en función del subtotal y el porcentaje de descuento
 * proporcionado.
 * @param {number} subtotal - El subtotal es el monto total antes de aplicar cualquier descuento. Es un
 * valor numérico.
 * @param {number} porcentaje_descuento - El parámetro "porcentaje_descuento" representa el porcentaje
 * de descuento que se aplicará al subtotal.
 * @param {number} decimales - El parámetro "decimales" es el número de decimales al que se redondeará
 * el resultado.
 * @returns el importe del descuento calculado como una cadena con el número especificado de decimales.
 */
export function calcularDescuento(
  subtotal: number,
  porcentaje_descuento: number,
  decimales: number
) {
  return ((subtotal * porcentaje_descuento) / 100).toFixed(decimales);
}

/**
 * La función calcula el monto del IVA (Impuesto al Valor Agregado) en función del subtotal, descuento,
 * porcentaje de IVA y número de decimales.
 * @param {number} subtotal - El subtotal es el monto total antes de que se apliquen descuentos o
 * impuestos. Representa el monto base sobre el cual se realizarán los cálculos.
 * @param {number} descuento - El parámetro "descuento" representa el monto del descuento aplicado al
 * subtotal antes de calcular el impuesto.
 * @param {number} porcentaje_iva - El parámetro "porcentaje_iva" representa el valor porcentual del
 * IVA (Impuesto al Valor Agregado) a aplicar al subtotal luego de restar el descuento.
 * @param {number} decimales - El parámetro "decimales" es el número de decimales al que se redondeará
 * el resultado.
 * @returns el valor calculado del IVA (Impuesto al Valor Agregado) en base a los parámetros dados.
 */
export function calcularIva(
  subtotal: number,
  descuento: number,
  porcentaje_iva: number,
  decimales: number
) {
  return (((subtotal - descuento) * porcentaje_iva) / 100).toFixed(decimales);
}

/**
 * La función "encontrarUltimoIdListado" toma una lista de objetos y devuelve el id del objeto con el
 * valor de id más alto.
 * @param {any} listado - El parámetro "listado" es una matriz de objetos. Cada objeto de la matriz
 * tiene una propiedad llamada "id" que representa el identificador único del objeto.
 * @returns el último valor de identificación de la matriz de listado dada.
 */
export function encontrarUltimoIdListado(listado: any) {
  const objMayorId = listado.reduce(
    (max: any, objeto: any) => (objeto.id > max.id ? objeto : max),
    listado[0]
  );

  return objMayorId.id;
}

export function convertirNumeroPositivo(entidad: any, campo: any) {
  if (entidad[campo]) {
    if (entidad[campo] < 0) {
      entidad[campo] = -1 * entidad[campo];
    }
  }
}

export async function notificarErrores(
  err: HttpErrorResponse,
  _snackBar: MatSnackBar
): Promise<void> {
  try {
    const error = new ApiError(err);
    if (isAxiosError(error)) {
      const mensajes: string[] = error.message.split('\n');
      for (const mensaje of mensajes) {
        _snackBar.open(mensaje, '', {
          duration: 3000,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Espera hasta que el snackbar desaparezca
      }
    } else {
      console.log(err);
    }
  } catch (e) {
    console.error('Error handling notification:', e);
  }
}
