
import { Component, inject, input, OnInit, signal } from '@angular/core';
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
import { distinctUntilChanged, firstValueFrom, map } from 'rxjs';

import { matchSumValidator } from '../../../_helpers/match-form.validator';
import { MatchesService, MatchesWebSocketService } from '../../../_services';
import {
  selectCurrentDraft,
  selectOngoingMatches,
  State,
} from '../../../_store';
import {
  initializeSingleDraft,
  seatDraft,
} from '../../../_store/actions/drafts.actions';
import {
  initDraftMatches,
  pairRound,
  updateDraftMatch,
} from '../../../_store/actions/matches.actions';
import { Match } from '../../../_types';

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
    PushPipe,
    ReactiveFormsModule,
    RouterLink
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
  draft$ = this.store$.select(selectCurrentDraft);
  matches$ = this.store$.select(selectOngoingMatches);

  pairingsDisabled = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchesService,
    private readonly matchWebSocketService: MatchesWebSocketService,
  ) {
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.store$.dispatch(updateDraftMatch({ changes: game }));
      });

    // FIXME: Move form controls to class members so the template can see them
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

    this.pairingsDisabled.set(false);

    this.matches$
      .pipe(
        distinctUntilChanged(),
        map((matches) => {
          if (matches.length > 0) {
            this.pairingsDisabled.set(true);
          }
        }),
      )
      .subscribe();

    this.draft$
      .pipe(
        distinctUntilChanged(),
        map((draft) => {
          if (!draft) {
            this.pairingsDisabled.set(true);
          } else {
            this.pairingsDisabled.set(false);
            if (!draft.seated) {
              this.pairingsDisabled.set(true);
            }
          }
        }),
      )
      .subscribe();
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

    // TODO: User feedback
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    // FIXME: no
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
