import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from './domain/Service';
import { ServiceColumns } from './domain/ServiceColumns';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { DataManager } from '../../shared/aplications/DataManager';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { Model } from '../../shared/interfaces/Model';

@Component({
  selector: 'app-service',
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
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [DataManager],

})
export class ServiceComponent implements OnInit {

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup; // Use MatTabGroup type

  Form: FormGroup;
  accion!: Model<Service>;
  constructor(private serviceManager: DataManager<Service>,
    private fb: FormBuilder,
    private formValidationService: FormValidationService) {
    this.Form = this.fb.group({
      name: [{ value: '', disabled: false }, [Validators.required]],
      description: [{ value: '', disabled: false }, [Validators.required]],
      icon: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  tableColumns = ServiceColumns;
  tableData: Service[][] = [[]];
  cargando: boolean = true;
  disabled: boolean = false;
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }  get description(): FormControl {
    return this.Form.get('description') as FormControl;
  }  get icon(): FormControl {
    return this.Form.get('icon') as FormControl;
  }

  ngOnInit() {
    this.listarData();
  }
  listarData() {
    this.serviceManager.loadData('service').subscribe((data) => {
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
  cambiarAccion(event: any | Model<Service>) {
    this.accion = event;
  }

}
