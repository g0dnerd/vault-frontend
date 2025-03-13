import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { DraftAppState, selectCurrentDraft } from '../../../_store';
import { MatchPanelComponent } from './match-panel.component';
import { MyPoolComponent } from './my-pool.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraftPanelComponent {
  private readonly draftStore$ = inject(Store<DraftAppState>);

  readonly draft$ = this.draftStore$.select(selectCurrentDraft);
}
