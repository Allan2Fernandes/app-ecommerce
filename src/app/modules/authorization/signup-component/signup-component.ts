import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/authorization-service';
import { TranslatePipe } from "../../../pipes/translate-pipe";

@Component({
  selector: 'app-signup-component',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './signup-component.html',
})
export class SignupComponent implements OnInit{
  fb = inject(FormBuilder);
  authorizationService = inject(AuthorizationService);

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const group = control as FormGroup;

    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { mismatch: true };
  };

  form = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
  {
    validators: this.passwordMatchValidator, // reference the method
  });

  ngOnInit(): void {
    this.authorizationService.redirectIfAlreadyLoggedIn();
  }

  submitForm() {
    if(
      this.form.controls.fullName.value === null ||
      this.form.controls.email.value === null ||
      this.form.controls.password.value === null
    ) {
      return;
    }

    this.authorizationService.registerUser(
      this.form.controls.fullName.value,
      this.form.controls.email.value,
      this.form.controls.password.value
    );
  }
}