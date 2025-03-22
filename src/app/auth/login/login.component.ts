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
import { CredentialResponse } from 'google-one-tap';

import { AuthAppState, selectAuthErrorMessage } from '../../_store';
import { login, socialLogin } from '../../_store/actions/auth.actions';
import { GoogleAuthPayload } from '../../_types';

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
  private readonly store$ = inject(Store<AuthAppState>);
  readonly errorMessage$ = this.store$.select(selectAuthErrorMessage);

  form!: FormGroup;
  loading = false;
  submitted = false;

  // Password is hidden by default
  hide = signal(true);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  ngOnInit() {
    // Initialize the Google One-Tap iframe with our client ID and config
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          '57824242125-g7mjm9qdlp2dl5d67hkhids8ho78gbse.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: true,
        cancel_on_tap_outside: false,
      });

      // Render the Google One-Tap popup
      // @ts-ignore
      google.accounts.id.prompt();
    };
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // FIXME: User feedback
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    this.loading = true;

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.store$.dispatch(
      login({
        loginData: {
          email: this.f['email'].value,
          password: this.f['password'].value,
        },
        returnUrl,
      }),
    );
  }

  // Toggle show/hide password state
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  handleCredentialResponse(response: CredentialResponse) {
    this.submitted = true;
    let responsePayload: GoogleAuthPayload | null = null;

    try {
      responsePayload = JSON.parse(atob(response?.credential.split('.')[1]));
    } catch (e) {
      // TODO: Render error response
      console.error('Error while trying to decode token', e);
    }

    this.loading = true;

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (!responsePayload) {
      // TODO: Render error response
      console.error('Received no response payload');
      return;
    }

    this.store$.dispatch(
      socialLogin({
        loginData: responsePayload,
        returnUrl,
      }),
    );
  }
}
