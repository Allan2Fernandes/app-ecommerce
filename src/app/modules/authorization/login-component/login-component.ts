import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/authorization-service';
import { TranslatePipe } from "../../../pipes/translate-pipe";

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-component.html',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authorizationService = inject(AuthorizationService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.authorizationService.redirectIfAlreadyLoggedIn();
  }

  login() {
    if(this.form.controls.email.value === null || this.form.controls.password.value === null) {
      return;
    }
    this.authorizationService.login(this.form.controls.email.value, this.form.controls.password.value);
  }
}

