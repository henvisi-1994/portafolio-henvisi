import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/Dialog/confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from '../../components/Dialog/prompt-dialog-component/prompt-dialog-component.component';
import { CustomActionPrompt } from './CustomActionPrompt';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  notificarMensajesError(mensajes: string[]) {
    throw new Error("Method not implemented.");
  }
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  obtenerMensaje(mensaje: string | string[]): string {
    return Array.isArray(mensaje) ? mensaje.join('<br/>') : mensaje;
  }

  notificarInformacion(mensaje: string | string[]): void {
    this.snackBar.open(this.obtenerMensaje(mensaje), 'Información', {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  notificarCorrecto(mensaje: string | string[]): void {
    this.snackBar.open(this.obtenerMensaje(mensaje), 'Correcto', {
      duration: 3000,
      panelClass: ['green-snackbar'],
    });
  }

  notificarError(mensaje: string | string[]): void {
    this.snackBar.open(this.obtenerMensaje(mensaje), 'Error', {
      duration: 3000,
      panelClass: ['red-snackbar'],
    });
  }

  notificarAdvertencia(mensaje: string | string[]): void {
    this.snackBar.open(this.obtenerMensaje(mensaje), 'Advertencia', {
      duration: 3000,
      panelClass: ['amber-snackbar'],
    });
  }

  confirmar(mensaje: string | string[], callback: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.obtenerMensaje(mensaje),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback();
      }
    });
  }

  prompt(config: CustomActionPrompt): void {
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      data: {
        ...config,
        message: this.obtenerMensaje(config.mensaje),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        config.accion(result);
      }
    });
  }

  promptItems(config: CustomActionPrompt): void {
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      data: {
        ...config,
        message: this.obtenerMensaje(config.mensaje),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        config.accion(result);
      }
    });
  }
}
