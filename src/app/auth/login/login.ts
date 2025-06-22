import { NgClass } from '@angular/common';
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

import { State, selectAuthErrorMessage } from '../../_store';
import {
  login,
  socialLogin,
  socialLoginFailure,
} from '../../_store/actions/auth.actions';
import { GoogleAuthPayload } from '../../_types';
import { distinctUntilChanged, tap } from 'rxjs';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    NgClass,
    PushPipe,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly errorMessage$ = this.store$.select(selectAuthErrorMessage);

  form!: FormGroup;
  loading = false;
  submitted = false;

  // Password is hidden by default
  hide = signal(true);

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
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

    this.errorMessage$
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          this.loading = false;
          this.submitted = false;
        }),
      )
      .subscribe();
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
    this.loading = true;

    let responsePayload: GoogleAuthPayload | null = null;

    try {
      responsePayload = JSON.parse(atob(response?.credential.split('.')[1]));
    } catch {
      const errorMessage = 'Error while trying to decode token';
      this.store$.dispatch(socialLoginFailure({ errorMessage }));
      this.submitted = false;
      return;
    }

    if (!responsePayload) {
      const errorMessage = 'Received no response while trying to log in.';
      this.store$.dispatch(socialLoginFailure({ errorMessage }));
      this.submitted = false;
      return;
    }

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.store$.dispatch(
      socialLogin({
        loginData: responsePayload,
        returnUrl,
      }),
    );
  }
}
