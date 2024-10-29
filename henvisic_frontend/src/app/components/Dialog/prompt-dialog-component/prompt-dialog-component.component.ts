/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy,Component, Inject, signal } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-prompt-dialog-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,FormsModule, ReactiveFormsModule],
  templateUrl: './prompt-dialog.component.html',
  styleUrl: './prompt-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PromptDialogComponent{
  readonly model = new FormControl('', [Validators.required]);

  errorMessage = signal('');

  constructor(   public dialogRef: MatDialogRef<PromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    merge(this.model.statusChanges, this.model.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.model.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.model.hasError('model')) {
      this.errorMessage.set('Not a valid model');
    } else {
      this.errorMessage.set('');
    }
  }
  onConfirm(): void {
    this.dialogRef.close(this.model);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
