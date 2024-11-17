import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataManager } from '../../shared/aplications/DataManager';
import { UserHome } from './domain/UserHome';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Model } from '../../shared/interfaces/Model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { acciones } from '../../config/Utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';

@Component({
  selector: 'app-about-me',
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
    MatDatepickerModule,
    ImageUploadComponent
  ],
  templateUrl: './AboutMe.component.html',
  styleUrls: ['./AboutMe.component.css'],
  providers: [DataManager, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AboutMeComponent implements OnInit {
  Form: FormGroup;
  accion!: Model<UserHome>;
  disabled: boolean = false;
  previsualizacion: string | null = null;

  constructor(private userHomeManager: DataManager<UserHome>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private formValidationService: FormValidationService) {
    this.Form = this.fb.group({
      name: [{ value: '', disabled: false }, [Validators.required]],
      email: [{ value: '', disabled: false }, [Validators.required]],
      phone: [{ value: '', disabled: false }, [Validators.required]],
      address: [{ value: '', disabled: false }, [Validators.required]],
      job: [{ value: '', disabled: false }, [Validators.required]],
      degree: [{ value: '', disabled: false }, [Validators.required]],
      profilePic: [{ value: '', disabled: false }, [Validators.required]],
      birth_day: [{ value: '', disabled: false }, [Validators.required]],
      experience: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  cargando: boolean = true;
  ngOnInit() {
    this.obtenerUsuario();
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.Form.get('email') as FormControl;
  }
  get phone(): FormControl {
    return this.Form.get('phone') as FormControl;
  }
  get address(): FormControl {
    return this.Form.get('address') as FormControl;
  }
  get job(): FormControl {
    return this.Form.get('job') as FormControl;
  }
  get degree(): FormControl {
    return this.Form.get('degree') as FormControl;
  }
  get profilePic(): FormControl {
    return this.Form.get('profilePic') as FormControl;
  }
  get birth_day(): FormControl {
    return this.Form.get('birth_day') as FormControl;
  }
  get experience(): FormControl {
    return this.Form.get('experience') as FormControl;
  }
  obtenerUsuario() {
    this.userHomeManager.getModelData<UserHome>('aboutme')
      .subscribe({
        next: (data) => {
          this.Form.patchValue(data);
          this.accion = { model: data, action: acciones.EDITAR };
          this.cargando = false;
        },
        error: (error) => {
          this.cargando = false;
          console.error('Error al cargar los datos', error);
        }
      });
  }
  errorMessage(controlName: string): string {
    const control = this.Form.get(controlName);
    return control ? this.formValidationService.getErrorMessage(control, controlName) : '';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deshabilitar(event: any) {
    this.disabled = event;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obtenerImagen(base64String: any) {
    this.profilePic.setValue(base64String);
    this.cdr.detectChanges();
  }
}
