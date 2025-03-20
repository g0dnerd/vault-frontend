import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { dev } from '../../../../../environments/environment';
import { ImageService } from '../../../../_services';
import { selectAllImages, State } from '../../../../_store';
import { Image } from '../../../../_types';

@Component({
  selector: 'app-manage-pool',
  standalone: true,
  imports: [CommonModule, MatListModule, PushPipe],
  templateUrl: './manage-pool.component.html',
  styleUrl: './manage-pool.component.scss',
})
export class ManagePoolComponent {
  loading = false;
  submitted = false;
  imgFile: File | null = null;
  readonly imageUrl = dev.userUploadUrl;

  private readonly store$ = inject(Store<State>);
  readonly images$: Observable<Image[]> = this.store$.select(selectAllImages);

  constructor(private readonly imageService: ImageService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.imgFile = file;
    }
  }

  async onSubmit() {
    this.submitted = true;

    if (!this.imgFile) {
      this.submitted = false;
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.imgFile);
    this.imageService.handleImageUpload(formData).subscribe();
    this.imgFile = null;
    this.loading = false;
  }
}
