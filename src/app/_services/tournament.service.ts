import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, Tournament } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.TOURNAMENTS}`;

  constructor(private readonly http: HttpClient) {}

  createTournament(
    name: string,
    isLeague: boolean,
    isPublic: boolean,
    playerCapacity: number,
    description: string | null,
  ): Observable<Tournament> {
    const tournament = {
      name,
      isLeague,
      public: isPublic,
      playerCapacity,
      description,
    };
    return this.http.post<Tournament>(this.apiUrl, tournament);
  }

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.apiUrl);
  }

  getPublicTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/public`);
  }

  getAvailableTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/available`);
  }

  getEnrolledTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/enrolled`);
  }

  getEnrolledLeagues(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/enrolled-leagues`);
  }
}
