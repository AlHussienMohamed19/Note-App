import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  emailExistMsg: string = ''
  hide = true;

  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,15}$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(60)]),
  })

  register(FormData: FormGroup) {
    // console.log(FormData);
    if (FormData.valid) {
      this._AuthService.register(FormData.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            this._Router.navigate(['/login'])
          } else {
            this.emailExistMsg = response.errors.email.message;
          }
        }
      })
    }

  }
}
