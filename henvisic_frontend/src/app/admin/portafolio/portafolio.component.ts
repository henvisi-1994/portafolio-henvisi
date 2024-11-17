import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { DataManager } from '../../shared/aplications/DataManager';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { Model } from '../../shared/interfaces/Model';
import { Portafolio } from './domain/Portafolio';
import { PortafolioColumns } from './domain/PortafolioColumns';
import { Category } from '../category/domain/Category';
import { catchError, map, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { capturarImagen } from '../../shared/utils';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
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
    MatSelectModule,
  ],
  styleUrls: ['./portafolio.component.css'],
  providers: [DataManager],

})
export class PortafolioComponent implements OnInit {

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup; // Use MatTabGroup type

  Form: FormGroup;
  accion!: Model<Portafolio>;
  constructor(private portafolioManager: DataManager<Portafolio>,
    private sanitizer: DomSanitizer,
    private categoryManager: DataManager<Category>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private formValidationService: FormValidationService) {
    this.Form = this.fb.group({
      title: [{ value: '', disabled: false }, [Validators.required]],
      image: [{ value: '', disabled: false }, [Validators.required]],
      project_url: [{ value: '', disabled: false }, [Validators.required]],
      cat_id: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  tableColumns = PortafolioColumns;
  tableData: Portafolio[][] = [[]];
  categories: Category[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  archivos: any = []
  cargando: boolean = true;
  disabled: boolean = false;
  previsualizacion: string | null = null;
  get title(): FormControl {
    return this.Form.get('title') as FormControl;
  }
  get image(): FormControl {
    return this.Form.get('image') as FormControl;
  }
  get project_url(): FormControl {
    return this.Form.get('project_url') as FormControl;
  }
  get cat_id(): FormControl {
    return this.Form.get('cat_id') as FormControl;
  }

  ngOnInit() {
    this.listarData();
    this.listarCategory();
  }
  listarData() {
    this.portafolioManager.loadData('portfolio').subscribe((data) => {
      this.tableData = data;
      this.cargando = false;
    });
  }
  listarCategory() {
    this.categoryManager.loadData('category')
      .pipe(
        map(data => data.flat() as Category[]), // Asegúrate de que `data` es un arreglo de arreglos o ajusta `flat` si no es necesario
        catchError(error => {
          console.error('Error fetching data:', error);
          return of([]); // Devuelve un arreglo vacío en caso de error
        })
      )
      .subscribe(homeModel => {
        this.categories = homeModel;
      });

  }
  errorMessage(controlName: string): string {
    const control = this.Form.get(controlName);
    return control ? this.formValidationService.getErrorMessage(control, controlName) : '';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actualizarData(respuesta: any) {
    this.tableData = respuesta;
    this.previsualizacion = null
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deshabilitar(event: any) {
    this.disabled = event;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cambiarAccion(event: any | Model<Portafolio>) {
    this.accion = event;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obtenerImagen(event: any) {
   capturarImagen(event).then((base64String) => {
      this.previsualizacion = base64String
      this.image.setValue(this.previsualizacion)
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error(error);
    });
  }

}
