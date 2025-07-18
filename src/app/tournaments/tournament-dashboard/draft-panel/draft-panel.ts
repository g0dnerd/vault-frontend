import { Component, inject, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { State, selectCurrentDraft } from '../../../_store';
import { MatchPanel } from '../match-panel/match-panel';
import { MyPool } from '../pool/my-pool/my-pool';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [MatCardModule, MatchPanel, MyPool, PushPipe, RouterLink],
  templateUrl: './draft-panel.html',
  styleUrl: './draft-panel.scss',
})
export class DraftPanel {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  readonly draft$ = this.store$.select(selectCurrentDraft);
}
