import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { dev } from '../../../../../environments/environment';
import { ImagesService } from '../../../../_services';
import { State } from '../../../../_store';
import { initializePlayerImages } from '../../../../_store/actions/images.actions';

@Component({
  selector: 'app-manage-pool',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-pool.component.html',
  styleUrl: './manage-pool.component.scss',
})
export class ManagePoolComponent implements OnInit {
  tournamentId = input.required<number>();

  loading = false;
  submitted = false;
  imgFile: File | null = null;
  readonly imageUrl = dev.userUploadUrl;

  private readonly store$ = inject(Store<State>);

  constructor(private readonly imageService: ImagesService) {}

  ngOnInit() {
    this.store$.dispatch(initializePlayerImages());
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
    this.imageService
      .handleImageUpload(formData, this.tournamentId())
      .subscribe();
    this.imgFile = null;
    this.loading = false;
  }
}
