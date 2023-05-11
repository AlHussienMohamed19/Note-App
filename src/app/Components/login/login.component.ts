import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  loginError: string = '';
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,15}$/)]),
  })

  login(FormData: FormGroup) {
    if (FormData.valid) {
      this._AuthService.login(FormData.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            localStorage.setItem('userToken', response.token);
            this._AuthService.decodeToken();
            this._Router.navigate(['/home'])
          } else {
            this.loginError = response.message
          }
        }
      })
    }
  }
}
