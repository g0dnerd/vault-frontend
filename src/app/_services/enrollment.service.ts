import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { Enrollment, API_ROUTES, Scorecard } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.ENROLLMENTS}`;

  constructor(private readonly http: HttpClient) {}

  getForUser(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/current`);
  }

  getForTournament(tournamentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(
      `${this.apiUrl}/tournament/${tournamentId}`,
    );
  }

  getForLeague(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/league`);
  }

  enroll(tournamentId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/enroll/${tournamentId}`);
  }

  enrollMany(
    tournamentId: number,
    userIds: number[],
  ): Observable<Enrollment[]> {
    return this.http.post<Enrollment[]>(`${this.apiUrl}/enroll-many`, {
      tournamentId,
      userIds,
    });
  }

  getTournamentStandings(tournamentId: number): Observable<Scorecard[]> {
    return this.http.get<Scorecard[]>(
      `${this.apiUrl}/standings/${tournamentId}`,
    );
  }

  getEnrollmentsForDraft(draftId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/draft/${draftId}`);
  }
}
