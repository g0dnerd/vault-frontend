import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { login } from '../_store/actions/auth.actions';
import { AuthAppState, selectAuthErrorMessage } from '../_store';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgClass,
    NgIf,
    PushPipe,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly authStore$ = inject(Store<AuthAppState>);
  readonly errorMessage$ = this.authStore$.select(selectAuthErrorMessage);

  form!: FormGroup;
  loading = false;
  submitted = false;
  hide = signal(true);

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false;
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

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authStore$.dispatch(
      login({
        loginData: {
          email: this.f['username'].value,
          password: this.f['password'].value,
        },
        returnUrl,
      }),
    );
    this.loading = false;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
