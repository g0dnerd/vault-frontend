
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, tap } from 'rxjs';

import {
  selectAllImages,
  selectCurrentDraft,
  selectCurrentPoolStatus,
  State,
} from '../../../../_store';
import { ImagesService } from '../../../../_services';
import {
  deleteImage,
  initializePlayerImages,
} from '../../../../_store/actions/images.actions';
import { initializeCurrentDraft } from '../../../../_store/actions/drafts.actions';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    PushPipe
],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.scss',
})
export class MyPoolComponent implements OnInit {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  readonly images$ = this.store$.select(selectAllImages);
  readonly poolStatus$ = this.store$.select(selectCurrentPoolStatus);
  readonly draft$ = this.store$.select(selectCurrentDraft);

  loading = false;
  submitted = false;
  imgFile: File | null = null;

  needsCheckIn = signal(false);
  needsCheckOut = signal(false);

  constructor(private readonly imagesService: ImagesService) {}

  ngOnInit() {
    this.store$.dispatch(
      initializeCurrentDraft({ tournamentId: this.tournamentId() }),
    );
    this.store$.dispatch(initializePlayerImages());

    this.draft$
      .pipe(
        map((draft) => {
          if (draft) {
            console.log('has draft', JSON.stringify(draft));
            if (draft.checkinNeeded) {
              this.needsCheckIn.set(draft.checkinNeeded);
            }
            if (draft.checkoutNeeded) {
              this.needsCheckIn.set(draft.checkoutNeeded);
            }
          }
        }),
      )
      .subscribe();

    this.images$
      .pipe(
        distinctUntilChanged(),
        tap(() => (this.loading = false)),
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.imgFile = file;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (!this.imgFile) {
      this.submitted = false;
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.imgFile);
    this.imagesService
      .handleImageUpload(formData, this.tournamentId())
      .pipe(
        map(() => {
          this.store$.dispatch(initializePlayerImages());
        }),
      )
      .subscribe();

    this.imgFile = null;
  }
}
