
import { Component, inject, OnInit } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { State, selectProfileData } from '../../_store';
import { initProfile, updateUser } from '../../_store/actions/auth.actions';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    PushPipe,
    ReactiveFormsModule
],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly user$ = this.store$.select(selectProfileData);

  form!: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl<string>(
    {
      value: '',
      disabled: true,
    },
    [Validators.required, Validators.email],
  );
  bioFormControl = new FormControl<string | undefined>({
    value: undefined,
    disabled: false,
  });

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.store$.dispatch(initProfile());

    this.form = this.formBuilder.group({
      email: this.emailFormControl,
      username: this.usernameFormControl,
      bio: this.bioFormControl,
    });

    this.user$.subscribe((user) => {
      if (user) {
        this.form.patchValue({
          email: user.email,
          username: user.username,
        });
        if (user.bio) {
          this.form.patchValue({
            bio: user.bio,
          });
        }
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;
    let user = {
      email: this.f['email'].value,
      username: this.f['username'].value,
      bio: this.f['bio'].value,
    };
    this.store$.dispatch(
      updateUser({
        user,
      }),
    );
    this.router.navigate(['/profile']);
  }
}
