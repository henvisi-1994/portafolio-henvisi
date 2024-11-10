import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { DataManager } from '../../shared/aplications/DataManager';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { Model } from '../../shared/interfaces/Model';
import { Qualification } from '../qualification/domain/Qualification';
import { QualificationColumns } from '../qualification/domain/QualificationColums';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-qualification',
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
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
  providers: [DataManager,provideNativeDateAdapter()],

})
export class QualificationComponent implements OnInit {

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup; // Use MatTabGroup type

  Form: FormGroup;
  accion!: Model<Qualification>;
  constructor(private qualificationManager: DataManager<Qualification>,
    private fb: FormBuilder,
    private formValidationService: FormValidationService) {
    this.Form = this.fb.group({
      type: [{ value: '', disabled: false }, [Validators.required]],
      title: [{ value: '', disabled: false }, [Validators.required]],
      association: [{ value: '', disabled: false }, [Validators.required]],
      description: [{ value: '', disabled: false }, [Validators.required]],
      from: [{ value: '', disabled: false }, [Validators.required]],
      to: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  tableColumns = QualificationColumns;
  tableData: Qualification[][] = [[]];
  cargando: boolean = true;
  disabled: boolean = false;
  type_qualification = [
    { value: "Education", viewValue: "Education" },
    { value: "Work", viewValue: "Work" }
  ]
  get type(): FormControl {
    return this.Form.get('type') as FormControl;
  }
  get title(): FormControl {
    return this.Form.get('title') as FormControl;
  }
  get association(): FormControl {
    return this.Form.get('association') as FormControl;
  }
  get description(): FormControl {
    return this.Form.get('description') as FormControl;
  }
  get from(): FormControl {
    return this.Form.get('from') as FormControl;
  }
  get to(): FormControl {
    return this.Form.get('to') as FormControl;
  }
  ngOnInit() {
    this.listarData();
  }
  listarData() {
    this.qualificationManager.loadData('qualification').subscribe((data) => {
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
  cambiarAccion(event: any | Model<Qualification>) {
    this.accion = event;
  }

}
