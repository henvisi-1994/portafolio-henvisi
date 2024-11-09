import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { DataManager } from '../../shared/aplications/DataManager';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { Model } from '../../shared/interfaces/Model';
import { Skill } from './domain/Skill';
import { SkillColumns } from './domain/SkillColums';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-skill',
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
    MatSliderModule
  ],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
  providers: [DataManager],

})
export class SkillComponent implements OnInit {

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup; // Use MatTabGroup type

  Form: FormGroup;
  accion!: Model<Skill>;
  constructor(private skillManager: DataManager<Skill>,
    private fb: FormBuilder,
    private formValidationService: FormValidationService) {
    this.Form = this.fb.group({
      name: [{ value: '', disabled: false }, [Validators.required]],
      percent: [{ value: '', disabled: false }, [Validators.required]],
      color: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  tableColumns = SkillColumns;
  tableData: Skill[][] = [[]];
  cargando: boolean = true;
  disabled: boolean = false;
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  } get percent(): FormControl {
    return this.Form.get('percent') as FormControl;
  } get color(): FormControl {
    return this.Form.get('color') as FormControl;
  }
  ngOnInit() {
    this.listarData();
  }
  listarData() {
    this.skillManager.loadData('skill').subscribe((data) => {
      this.tableData = data;
      this.cargando = false;
    });
  }
  errorMessage(controlName: string): string {
    const control = this.Form.get(controlName);
    return control ? this.formValidationService.getErrorMessage(control, controlName) : '';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actualizarData(respuesta: any) {
    this.tableData = respuesta;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deshabilitar(event: any) {
    this.disabled = event;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cambiarAccion(event: any | Model<Skill>) {
    this.accion = event;
  }
}
