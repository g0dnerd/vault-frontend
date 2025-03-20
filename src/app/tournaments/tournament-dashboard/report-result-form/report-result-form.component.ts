import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { matchSumValidator } from '../../../_helpers/match-form.validator';
import { MatchService } from '../../../_services';
import { State, selectCurrentMatch } from '../../../_store';

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

  private readonly store$ = inject(Store<State>);

  readonly currentMatch$ = this.store$.select(selectCurrentMatch);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchService,
  ) {
    // Initialize result reporting form
    // FIXME: move form controls to class members so template can see them
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
    // FIXME: ew
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

    if (this.form.invalid) {
      // TODO: Maybe tell the user it didn't work
      return;
    }
    this.loading = true;

    // FIXME: double ew
    await firstValueFrom(
      this.matchService.reportResult(this.f['matchId'].value, {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
      }),
    );
    this.loading = false;
  }
}
