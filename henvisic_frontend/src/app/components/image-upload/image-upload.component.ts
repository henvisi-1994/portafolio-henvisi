import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonSubmitComponent } from '../button-submit/button-submit.component';
import { MaterialTableComponent } from '../MaterialTable/MaterialTable.component';
import { capturarImagen } from '../../shared/utils';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  standalone:true,
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
    MatDatepickerModule
  ],
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() label: string = 'Upload Image';
  @Input() placeholder: string = 'Required';
  @Output() imageChange = new EventEmitter<string>();
  @Input() preview: string | null = null; // Ahora es @Input para ser controlado externamente

  constructor(private cdr: ChangeDetectorRef) { }

  async onFileChange(event: Event) {
    capturarImagen(event).then((base64String) => {
      this.preview = base64String
      this.imageChange.emit(base64String);
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error(error);
    });
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

}
