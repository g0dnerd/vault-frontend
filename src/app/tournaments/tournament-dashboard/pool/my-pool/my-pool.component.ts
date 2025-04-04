import { NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
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
import { ImagesService } from '../../../../_services';
import { deleteImage } from '../../../../_store/actions/images.actions';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [
    ManagePoolComponent,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    NgIf,
    PushPipe,
  ],
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

  constructor(private readonly imagesService: ImagesService) {}

  ngOnInit() {
    this.images$
      .pipe(
        distinctUntilChanged(),
        map((images) => console.log(JSON.stringify(images))),
      )
      .subscribe();
  }

  deleteImage(id: number) {
    this.imagesService
      .deleteImage(id)
      .pipe(
        map(({ id }) => {
          this.store$.dispatch(deleteImage({ id }));
        }),
      )
      .subscribe();
  }
}
