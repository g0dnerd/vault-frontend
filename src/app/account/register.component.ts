import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthPayload } from '../_types';
import { register } from '../_store/actions/auth.actions';
import { AuthAppState } from '../_store';

@Component({
  imports: [NgClass, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store$: Store<AuthAppState>,
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    const registerData: AuthPayload = {
      email: this.f['email'].value,
      username: this.f['username'].value,
      password: this.f['password'].value,
    };

    this.store$.dispatch(register({ registerData }));
    this.loading = false;
  }
}
