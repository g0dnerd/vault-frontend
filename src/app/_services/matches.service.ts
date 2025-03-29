import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, Match, Result } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.MATCHES}`;

  constructor(private readonly http: HttpClient) {}

  getMatchById(matchId: number) {
    return this.http.get<Match>(`${this.apiUrl}/${matchId}`);
  }

  getCurrentMatch(tournamentId: number) {
    return this.http.get<Match>(`${this.apiUrl}/current/${tournamentId}`);
  }

  getOngoingMatches(draftId: number) {
    return this.http.get<Match[]>(`${this.apiUrl}/ongoing/${draftId}`);
  }

  // Reports a result to the API and returns the API response.
  reportResult(matchId: number, result: Result): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/report/${matchId}`, result);
  }

  // PATCH request to confirm the match for `matchId`
  confirmResult(matchId: number): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/confirm/${matchId}`, {
      resultConfirmed: true,
    });
  }

  pairRound(draftId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/pair-round/${draftId}`);
  }
}
