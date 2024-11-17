import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { Setting } from './domain/Setting';
import { DataManager } from '../../shared/aplications/DataManager';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { Model } from '../../shared/interfaces/Model';
import { SettingColumns } from './domain/SettingColumns';
import { acciones } from '../../config/Utils';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';

@Component({
  selector: 'app-setting',
  templateUrl: './Setting.component.html',
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
    ImageUploadComponent
  ],
  styleUrls: ['./Setting.component.css'],
  providers: [DataManager],

})
export class SettingComponent implements OnInit {
  Form: FormGroup;
  accion!: Model<Setting>;
  constructor(private settingManager: DataManager<Setting>,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private formValidationService: FormValidationService) {
    this.Form = this.fb.group({
      about_title: [{ value: '', disabled: false }, [Validators.required]],
      about_description: [{ value: '', disabled: false }, [Validators.required]],
      about_photo: [{ value: '', disabled: false }, [Validators.required]],
      fb_url: [{ value: '', disabled: false }, [Validators.required]],
      github_url: [{ value: '', disabled: false }, [Validators.required]],
      freelance_url: [{ value: '', disabled: false }, [Validators.required]],
      linkedin_url: [{ value: '', disabled: false }, [Validators.required]],
      cv_url: [{ value: '', disabled: false }, [Validators.required]],
      video_url: [{ value: '', disabled: false }, [Validators.required]],
      contact_mail: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  tableColumns = SettingColumns;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  archivos: any = []
  cargando: boolean = true;
  disabled: boolean = false;
  previsualizacion: string | null = null;
  get about_title(): FormControl {
    return this.Form.get('about_title') as FormControl;
  }
  get about_description(): FormControl {
    return this.Form.get('about_description') as FormControl;
  }
  get about_photo(): FormControl {
    return this.Form.get('about_photo') as FormControl;
  }
  get fb_url(): FormControl {
    return this.Form.get('fb_url') as FormControl;
  }  get github_url(): FormControl {
    return this.Form.get('github_url') as FormControl;
  }  get linkedin_url(): FormControl {
    return this.Form.get('linkedin_url') as FormControl;
  }  get freelance_url(): FormControl {
    return this.Form.get('freelance_url') as FormControl;
  }  get cv_url(): FormControl {
    return this.Form.get('cv_url') as FormControl;
  }  get video_url(): FormControl {
    return this.Form.get('video_url') as FormControl;
  }get contact_mail(): FormControl {
    return this.Form.get('contact_mail') as FormControl;
  }

  ngOnInit() {
    this.obtenerSetting();
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
  cambiarAccion(event: any | Model<Setting>) {
    this.accion = event;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obtenerImagen(base64Image: any) {
    this.about_photo.setValue(base64Image)
    this.cdr.detectChanges();
  }
  obtenerSetting() {
    this.settingManager.getModelData<Setting>('setting')
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

}
