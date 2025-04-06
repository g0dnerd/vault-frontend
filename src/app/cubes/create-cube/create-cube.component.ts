import { NgClass, NgIf } from '@angular/common';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, map, of, tap } from 'rxjs';

import { CubesService } from '../../_services';
import { selectAllCubes, selectCubesErrorMessage, State } from '../../_store';
import {
  addCube,
  cubeStoreFailure,
  initializeCubes,
} from '../../_store/actions/cubes.actions';

const cobraBaseUrl = 'https://cubecobra.com/cube/overview/';

@Component({
  selector: 'app-create-cube',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './create-cube.component.html',
  styleUrl: './create-cube.component.scss',
})
export class CreateCubeComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  private readonly cubes$ = this.store$.select(selectAllCubes);
  readonly errorMessage$ = this.store$.select(selectCubesErrorMessage);

  form: FormGroup;
  cubeNameFormControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[a-zA-Z ]*$/),
  ]);
  cubeUrlFormControl = new FormControl<string>('', [Validators.required]);
  numCardsFormControl = new FormControl<number | undefined>(450, [
    Validators.min(90),
    Validators.max(9999),
  ]);
  shortDescriptionFormControl = new FormControl<string | undefined>(undefined, [
    Validators.minLength(10),
    Validators.maxLength(90),
  ]);
  longDescriptionFormControl = new FormControl<string>('', [
    Validators.minLength(10),
    Validators.maxLength(900),
    Validators.required,
  ]);

  loading = false;
  submitted = false;
  imgFile: File | null = null;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cubesService: CubesService,
  ) {
    this.form = this.formBuilder.group({
      name: this.cubeNameFormControl,
      url: this.cubeUrlFormControl,
      numCards: this.numCardsFormControl,
      shortDescription: this.shortDescriptionFormControl,
      longDescription: this.longDescriptionFormControl,
    });

    this.errorMessage$
      .pipe(
        distinctUntilChanged(),
        tap((msg) => {
          if (msg) {
            this.openSnackBar(msg, 'Dismiss');
          }
        }),
      )
      .subscribe();
  }

  ngOnInit() {
    this.store$.dispatch(initializeCubes());
    this.cubes$
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          this.loading = false;
          this.submitted = false;
        }),
      )
      .subscribe();

    this.form.controls['name'].valueChanges
      .pipe(
        tap((name) => {
          if (name) {
            this.cubeUrlFormControl.setValue(name.replaceAll(' ', ''));
          }
        }),
      )
      .subscribe();
  }

  get f() {
    return this.form.controls;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.imgFile = file;
    }
  }

  clearNumCards() {
    this.numCardsFormControl.patchValue(undefined);
  }

  async onSubmit() {
    this.submitted = true;

    if (!this.form.valid || !this.imgFile) {
      this.submitted = false;
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('cobraUrl', cobraBaseUrl + this.f['url'].value);
    formData.append('numCards', this.f['numCards'].value);
    formData.append('longDescription', this.f['longDescription'].value);
    formData.append('thumbnail', this.imgFile, this.imgFile.name);

    if (this.f['shortDescription'].value) {
      formData.append('shortDescription', this.f['shortDescription'].value);
    }

    this.cubesService
      .create(formData)
      .pipe(
        map((cube) => {
          this.store$.dispatch(addCube({ cube }));
        }),
        catchError((error) => {
          this.submitted = false;
          this.loading = false;
          return of(
            this.store$.dispatch(
              cubeStoreFailure({ errorMessage: error.error.message }),
            ),
          );
        }),
      )
      .subscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
