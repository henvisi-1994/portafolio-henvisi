// login.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injectable,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './data-access/login.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserLogin } from './domain/UserLogin.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStore } from './data-access/authStore';
import { User } from './domain/User.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Nota: Cambia 'styleUrl' a 'styleUrls'
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService],
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent {
  loginForm: FormGroup;
  currentToken: string | null = null;
  currentUser: UserLogin | null = null;
  error: WritableSignal<HttpErrorResponse | null>;
  user: WritableSignal<User | null>;
  authStore = inject(AuthStore);
  data = null;
  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router:Router
  ) {
    this.error = this.loginService.error;
    this.user = this.loginService.user;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // Usa `effect` dentro del constructor para reaccionar a los cambios en la señal
    effect(() => {
      const currentError = this.error();
      const user = this.user();
      if (currentError) {
        this._snackBar.open(currentError.error.message, '', {
          duration: 3000,
        });
      } else {
        if (user) {
          this.authStore.setUser(user);
          this.router.navigate(['/admin/portfolio']);
        }
        this.updateErrorMessage();
      }
    }, { allowSignalWrites: true });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  errorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    } else if (control?.hasError('email')) {
      return 'El email no es válido';
    } else if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  updateErrorMessage() {
    // Aquí puedes actualizar mensajes de error personalizados si es necesario.
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
