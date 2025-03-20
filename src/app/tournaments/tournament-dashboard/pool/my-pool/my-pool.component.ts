import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCurrentPoolStatus, State } from '../../../../_store';
import { PoolStatus } from '../../../../_types';
import { ManagePoolComponent } from '../manage-pool/manage-pool.component';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [ManagePoolComponent, MatExpansionModule, NgIf, PushPipe],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.scss',
})
export class MyPoolComponent {
  private readonly store$ = inject(Store<State>);

  readonly poolStatus$: Observable<PoolStatus | null> = this.store$.select(
    selectCurrentPoolStatus,
  );
}
