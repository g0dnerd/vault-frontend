import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, User } from '../_types';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.USER}`;

  constructor(private readonly http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUserProfile(user: {
    username: string;
    email: string;
    bio?: string;
  }): Observable<User> {
    return this.http.patch<User>(this.apiUrl, user);
  }

  getCurrentUserRoles(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/roles`);
  }

  getAvailableForTournament(tournamentId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/not-enrolled/${tournamentId}`);
  }
}
