import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, CreatePhaseDto, Phase } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class PhaseService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.PHASES}`;

  constructor(private readonly http: HttpClient) {}

  createPhase(data: CreatePhaseDto): Observable<Phase> {
    return this.http.post<Phase>(`${this.apiUrl}/no-index`, data);
  }

  getPhasesForTournament(tournamentId: number): Observable<Phase[]> {
    return this.http.get<Phase[]>(`${this.apiUrl}/tournament/${tournamentId}`);
  }
}
