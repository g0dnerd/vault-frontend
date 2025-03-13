import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { User } from '../_types';
import { AlertService } from '../_services';
import { AuthAppState, selectProfileData } from '../_store';
import { initProfile, updateUser } from '../_store/actions/auth.actions';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgClass,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  private readonly authStore$ = inject(Store<AuthAppState>);

  user$: Observable<User | null> = of(null);

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.authStore$.dispatch(initProfile());
    this.user$ = this.authStore$.select(selectProfileData);

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.user$.subscribe((user) => {
      if (user) {
        this.form.setValue({
          username: user?.username,
          email: user?.email,
        });
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;
    this.authStore$.dispatch(
      updateUser({
        email: this.f['email'].value,
        username: this.f['username'].value,
      }),
    );
    this.router.navigate(['/profile']);
  }
}
