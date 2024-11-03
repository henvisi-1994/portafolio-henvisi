import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidationService } from '../../shared/infraestructure/form-validation.service';
import { DataManager } from '../../shared/aplications/DataManager';
import { Contact } from './domain/Contact';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';
import { MaterialTableComponent } from '../../components/MaterialTable/MaterialTable.component';
import { Model } from '../../shared/interfaces/Model';

@Component({
  selector: 'app-contact',
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
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  Form: FormGroup;
  tableData: Contact[][] = [[]];
  accion!: Model<Contact>;
  endpoint: string ="contact";

  constructor( private contactManager: DataManager<Contact>,
    private fb: FormBuilder,

    private formValidationService: FormValidationService) {
      this.Form = this.fb.group({
        name: [{ value: '', disabled: false }, [Validators.required]],
        email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
        subject_mail: ['', [Validators.required]],
        content: ['', [Validators.required]]
      });
    }
    cargando: boolean = true;
    disabled: boolean = false;
    get name(): FormControl {
      return this.Form.get('name') as FormControl;
    }
    get email(): FormControl {
      return this.Form.get('email') as FormControl;
    }
    get subject_mail(): FormControl {
      return this.Form.get('subject_mail') as FormControl;
    }
    get content(): FormControl {
      return this.Form.get('content') as FormControl;
    }


  ngOnInit() {
    console.log();

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
  actualizarData(respuesta: any) {
    this.tableData = respuesta;
  }
  guardar() {
    this.cargando = true;
    this.disabled = true;
    this.contactManager.guardar(this.endpoint, this.Form.value).subscribe(() => {
      this.disabled = false;
      this.cargando = false;
      this.Form.reset();

    });
  }


}
