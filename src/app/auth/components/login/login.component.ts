import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    const body = this.formGroup.value as Login;

    this.authService.login$(body).subscribe({
      next: (user) => {
        if (user) {
          this.authService.setLoggedUserInLocalStorage(user);
          
          this.router.navigate(['/main']);
        }
      },
    });
  }
}
