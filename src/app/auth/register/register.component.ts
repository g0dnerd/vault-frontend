import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { register } from '../../_store/actions/auth.actions';
import { State, selectAuthErrorMessage } from '../../_store';
import { AuthPayload } from '../../_types';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    NgClass,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  private readonly store$ = inject(Store<State>);
  readonly errorMessage$ = this.store$.select(selectAuthErrorMessage);

  form: FormGroup;
  loading = false;
  submitted = false;

  // Password is hidden by default
  hide = signal(true);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: this.usernameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    this.loading = true;

    const registerData: AuthPayload = {
      email: this.f['email'].value,
      username: this.f['username'].value,
      password: this.f['password'].value,
    };

    this.store$.dispatch(register({ registerData }));
  }

  // Toggle show/hide password state
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
