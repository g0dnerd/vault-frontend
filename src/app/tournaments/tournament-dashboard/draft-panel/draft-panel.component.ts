import { Component, inject, input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { State, selectCurrentDraft } from '../../../_store';
import { MatchPanelComponent } from '../match-panel/match-panel.component';
import { MyPoolComponent } from '../pool/my-pool/my-pool.component';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatchPanelComponent,
    MyPoolComponent,
    NgIf,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.scss',
})
export class DraftPanelComponent {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  readonly draft$ = this.store$.select(selectCurrentDraft);
}
