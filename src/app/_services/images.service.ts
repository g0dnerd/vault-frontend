import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { Image, API_ROUTES } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.IMAGES}`;

  constructor(private readonly http: HttpClient) {}

  getUserImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/user`);
  }

  handleImageUpload(formData: FormData): Observable<Image> {
    return this.http.post<Image>(`${this.apiUrl}/upload`, formData);
  }
}
