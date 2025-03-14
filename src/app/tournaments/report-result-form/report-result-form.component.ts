import { Component, inject, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { Match } from '../../_types';
import { MatchService } from '../../_services';
import { matchSumValidator } from '../../_helpers/match-form.validator';
import { MatchAppState, selectCurrentMatch } from '../../_store';

@Component({
  selector: 'app-report-result-form',
  standalone: true,
  imports: [NgIf, PushPipe, MatButtonToggleModule, ReactiveFormsModule],
  templateUrl: './report-result-form.component.html',
  styleUrl: './report-result-form.component.scss',
})
export class ReportResultFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  private readonly matchStore$ = inject(Store<MatchAppState>);

  readonly currentMatch$: Observable<Match | null> =
    this.matchStore$.select(selectCurrentMatch);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchService,
  ) {
    // Initialize result reporting form
    this.form = this.formBuilder.group(
      {
        matchId: new FormControl(0, [Validators.required, Validators.min(0)]),
        player1Wins: new FormControl([
          Validators.required,
          Validators.min(0),
          Validators.max(2),
        ]),
        player2Wins: new FormControl([
          Validators.required,
          Validators.min(0),
          Validators.max(2),
        ]),
      },
      // Ensure total number of games reported is not greater than 3
      { validators: matchSumValidator },
    );
  }

  async ngOnInit() {
    // Initial form values
    const matchId = await firstValueFrom(this.currentMatch$);
    this.form.setValue({
      matchId,
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    await firstValueFrom(
      this.matchService.reportResult(this.f['matchId'].value, {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
      }),
    );
    this.loading = false;
  }
}
