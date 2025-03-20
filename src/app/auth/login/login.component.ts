import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { AuthAppState, selectAuthErrorMessage } from '../../_store';
import { login } from '../../_store/actions/auth.actions';

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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: this.emailFormControl,
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
          email: this.f['email'].value,
          password: this.f['password'].value,
        },
        returnUrl,
      }),
    );
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
