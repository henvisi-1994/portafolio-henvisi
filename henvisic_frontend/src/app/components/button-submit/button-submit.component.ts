/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataManager } from '../../shared/aplications/DataManager';
import { CommonModule } from '@angular/common';
import { acciones } from '../../config/Utils';
import { Model } from '../../shared/interfaces/Model';
import { EntidadAuditable } from '../../shared/domain/EntidadAuditable';

@Component({
  selector: 'app-button-submit',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './button-submit.component.html',
  styleUrl: './button-submit.component.scss',
})
export class ButtonSubmitComponent<T extends EntidadAuditable> {
  @Input() disabled: boolean = false; // Estado de deshabilitado
  @Input() Form!: FormGroup; // Estado de carga
  @Input() tableData: T[][] = []; // Estado de la tabla
  @Input() endpoint: string = ''; // Estado del endpoint para guardar/actualizar los datos
  @Output() actualizarData: EventEmitter<T[][]> = new EventEmitter<T[][]>();
  @Input() accion!: Model<T>;
  @Output() deshabilitar: EventEmitter<boolean> = new EventEmitter<boolean>();

  cargando: boolean = false;
  constructor(private dataManager: DataManager<T>) {}
  onSubmit() {
    if (this.Form.valid) {
      this.cargando = true;
      this.disabled = true;
      if (this.accion === undefined) {
        this.guardar();
      } else if (this.accion.action === acciones.EDITAR) {
        if (this.accion.model?.id) {
          this.editar(this.accion.model.id);
        }
      }
    } else {
      console.log(this.Form)
      console.log('Formulario no válido');
    }
  }
  guardar() {
    this.dataManager.guardar(this.endpoint, this.Form.value).subscribe(() => {
      this.listarData();
      this.disabled = false;
      this.cargando = false;
      this.Form.reset();

    });
  }
  editar(id: number) {
    this.dataManager
      .editar(id, this.endpoint, this.Form.value)
      .subscribe(() => {
        this.listarData();
        this.disabled = false;
        this.cargando = false;
        this.Form.reset();
      });
  }
  cancelar() {
    this.Form.reset();
    this.Form.enable();
    this.deshabilitar.emit(false);
  }
  listarData() {
    this.dataManager.loadData(this.endpoint).subscribe((data) => {
      this.actualizarData.emit(data);
      this.cargando = false;
    });
  }
}
