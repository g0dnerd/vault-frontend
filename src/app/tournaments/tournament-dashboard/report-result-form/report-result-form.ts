import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs';

import { matchSumValidator } from '../../../_helpers/match-form.validator';
import { MatchesService } from '../../../_services';
import { State, selectCurrentMatch } from '../../../_store';

@Component({
  selector: 'app-report-result-form',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatInputModule,
    PushPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './report-result-form.html',
  styleUrl: './report-result-form.scss',
})
export class ReportResultForm implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly currentMatch$ = this.store$.select(selectCurrentMatch);

  form: FormGroup;
  loading = false;
  submitted = false;

  matchIdFormControl = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
  ]);
  player1WinsFormControl = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(2),
  ]);
  player2WinsFormControl = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(2),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchesService,
  ) {
    // Initialize result reporting form
    this.form = this.formBuilder.group(
      {
        matchId: this.matchIdFormControl,
        player1Wins: this.player1WinsFormControl,
        player2Wins: this.player2WinsFormControl,
      },
      // Ensure total number of games reported is not greater than 3
      { validators: matchSumValidator },
    );
  }

  async ngOnInit() {
    // Initial form values
    this.currentMatch$
      .pipe(
        distinctUntilChanged(),
        map((match) => {
          if (match) {
            this.form.patchValue({ matchId: match.id });
          }
        }),
      )
      .subscribe();
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      // TODO: Maybe tell the user it didn't work
      return;
    }
    this.loading = true;

    this.matchService.reportResult(this.f['matchId'].value, {
      player1Wins: this.f['player1Wins'].value,
      player2Wins: this.f['player2Wins'].value,
    });
  }
}
