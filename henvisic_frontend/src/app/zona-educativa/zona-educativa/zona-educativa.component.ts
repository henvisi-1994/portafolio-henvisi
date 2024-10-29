/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { CommonModule } from '@angular/common';
import { ZonaEducativa } from '../domain/ZonaEducativa';
import { ZonaEducativaColumns } from '../domain/ZonaEducativaColums';
import { DataManager } from '../../shared/aplications/DataManager';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { Model } from '../../shared/interfaces/Model';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';

@Component({
  selector: 'app-zona-educativa',
  standalone: true,
  imports: [
    CommonModule,
    MaterialTableComponent,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ButtonSubmitComponent,
  ],
  templateUrl: './zona-educativa.component.html',
  styleUrl: './zona-educativa.component.scss',
  providers: [DataManager],
})
export class ZonaEducativaComponent  implements OnInit {
  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup; // Use MatTabGroup type

  Form: FormGroup;
  accion!: Model<ZonaEducativa>;
  constructor(
    private zonaEducativaManager: DataManager<ZonaEducativa>,
    private fb: FormBuilder,
    private formValidationService: FormValidationService

  ) {
    this.Form = this.fb.group({
      nombre: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  tableColumns = ZonaEducativaColumns;
  tableData: ZonaEducativa[][] = [[]];
  cargando: boolean = true;
  disabled: boolean = false;
  get nombre(): FormControl {
    return this.Form.get('nombre') as FormControl;
  }
  ngOnInit() {
    this.listarData();
  }
  listarData() {
    this.zonaEducativaManager.loadData('zonas-educativas').subscribe((data) => {
      this.tableData = data;
      this.cargando = false;
    });
  }
  errorMessage(controlName: string): string {
    const control = this.Form.get(controlName);
    return control ? this.formValidationService.getErrorMessage(control, controlName) : '';
  }
  actualizarData(respuesta: any) {
    this.tableData = respuesta;
  }
  deshabilitar(event: any) {
    this.disabled = event;
  }
  cambiarAccion(event: any | Model<ZonaEducativa>) {
    this.accion = event;
  }
}
