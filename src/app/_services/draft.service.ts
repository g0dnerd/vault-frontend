import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES, Draft } from '../_types';
import { dev } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.DRAFTS}`;

  constructor(private readonly http: HttpClient) {}

  getOngoingDrafts(tournamentId: number): Observable<Draft[]> {
    return this.http.get<Draft[]>(`${this.apiUrl}/ongoing/${tournamentId}`);
  }

  getCurrentDraft(tournamentId: number): Observable<Draft> {
    return this.http.get<Draft>(`${this.apiUrl}/current/${tournamentId}`);
  }

  getDraftById(draftId: number): Observable<Draft> {
    return this.http.get<Draft>(`${this.apiUrl}/${draftId}`);
  }

  seatDraft(draftId: number): Observable<Draft> {
    return this.http.post<Draft>(`${this.apiUrl}/make-seatings/${draftId}`, {});
  }
}
