import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, Cube } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class CubesService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.CUBES}`;

  constructor(private readonly http: HttpClient) {}

  get(): Observable<Cube[]> {
    return this.http.get<Cube[]>(this.apiUrl);
  }
}
