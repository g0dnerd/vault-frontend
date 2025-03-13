import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, Player } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.PLAYERS}`;

  constructor(private readonly http: HttpClient) {}

  getPoolStatuses(tournamentId: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/pool-status/${tournamentId}`);
  }
}
