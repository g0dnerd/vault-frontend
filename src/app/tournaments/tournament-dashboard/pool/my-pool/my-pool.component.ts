import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import {
  selectAllImages,
  selectCurrentPoolStatus,
  State,
} from '../../../../_store';
import { Image, PoolStatus } from '../../../../_types';
import { ManagePoolComponent } from '../manage-pool/manage-pool.component';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [ManagePoolComponent, MatExpansionModule, NgFor, NgIf, PushPipe],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.scss',
})
export class MyPoolComponent implements OnInit {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  readonly images$: Observable<Image[]> = this.store$.select(selectAllImages);
  readonly poolStatus$: Observable<PoolStatus | null> = this.store$.select(
    selectCurrentPoolStatus,
  );

  ngOnInit() {
    this.images$
      .pipe(
        distinctUntilChanged(),
        map((images) => console.log(JSON.stringify(images))),
      )
      .subscribe();
  }
}
