import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { DataManager } from '../../shared/aplications/DataManager';
import { Model } from '../../shared/interfaces/Model';
import { Category } from './domain/Category';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { CategoryColumns } from './domain/CategoryColumns';

@Component({
  selector: 'app-category',
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
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [DataManager],

})
export class CategoryComponent implements OnInit {
  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup; // Use MatTabGroup type

  Form: FormGroup;
  accion!: Model<Category>;
  constructor(private zonaEducativaManager: DataManager<Category>,
    private fb: FormBuilder,
    private formValidationService: FormValidationService) {
      this.Form = this.fb.group({
        name: [{ value: '', disabled: false }, [Validators.required]],
      });
     }
     tableColumns = CategoryColumns;
     tableData: Category[][] = [[]];
     cargando: boolean = true;
     disabled: boolean = false;
     get name(): FormControl {
       return this.Form.get('name') as FormControl;
     }
  ngOnInit() {
    this.listarData();
  }
  listarData() {
    this.zonaEducativaManager.loadData('category').subscribe((data) => {
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
  cambiarAccion(event: any | Model<Category>) {
    this.accion = event;
  }
}
