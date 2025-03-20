import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';

import { matchSumValidator } from '../../../_helpers/match-form.validator';
import { MatchService, MatchWebSocketService } from '../../../_services';
import {
  selectCurrentDraft,
  selectOngoingMatches,
  State,
} from '../../../_store';
import {
  initializeSingleDraft,
  seatDraft,
} from '../../../_store/actions/draft.actions';
import {
  initDraftMatches,
  pairRound,
  updateDraftMatch,
} from '../../../_store/actions/match.actions';
import { Draft, Match } from '../../../_types';

@Component({
  selector: 'app-admin-draft-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    NgFor,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './admin-draft-panel.component.html',
  styleUrl: './admin-draft-panel.component.scss',
})
export class AdminDraftPanelComponent implements OnInit {
  draftId = input.required<number>();
  tournamentId = input.required<number>();

  form: FormGroup;
  loading = false;
  submitted = false;

  private readonly store$ = inject(Store<State>);

  draft$: Observable<Draft | null> = of(null);
  matches$: Observable<Match[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchService,
    private readonly matchWebSocketService: MatchWebSocketService,
  ) {
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.store$.dispatch(updateDraftMatch({ changes: game }));
      });
    this.form = this.formBuilder.group(
      {
        matchId: new FormControl(0, [Validators.required, Validators.min(0)]),
        player1Wins: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(2),
        ]),
        player2Wins: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(2),
        ]),
      },
      { validators: matchSumValidator },
    );
  }

  ngOnInit() {
    this.form.setValue({
      matchId: 0,
      player1Wins: 0,
      player2Wins: 0,
    });

    this.store$.dispatch(initializeSingleDraft({ draftId: this.draftId() }));
    this.store$.dispatch(initDraftMatches({ draftId: this.draftId() }));
    this.draft$ = this.store$.select(selectCurrentDraft);
    this.matches$ = this.store$.select(selectOngoingMatches);
  }

  get f() {
    return this.form.controls;
  }

  pairRound() {
    this.store$.dispatch(pairRound({ draftId: this.draftId() }));
  }

  seatDraft() {
    this.store$.dispatch(seatDraft({ draftId: this.draftId() }));
  }

  async reportResult(matchId: number) {
    this.submitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    await firstValueFrom(
      this.matchService.reportResult(matchId, {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
      }),
    );
    this.loading = false;
  }

  async confirmResult(matchId: number) {
    // TODO: Implement
    console.log(matchId);
  }

  dropPlayer(_playerId: number) {
    // TODO: Implement
    console.log('dropping');
  }
}
