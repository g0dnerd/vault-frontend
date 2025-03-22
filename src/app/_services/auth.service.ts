import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import {
  API_ROUTES,
  AuthInterface,
  AuthPayload,
  GoogleAuthPayload,
} from '../_types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginApiUrl = `${dev.apiUrl}${API_ROUTES.LOGIN}`;
  private readonly registerApiUrl = `${dev.apiUrl}${API_ROUTES.REGISTER}`;
  private readonly statusApiUrl = `${dev.apiUrl}${API_ROUTES.STATUS}`;
  private readonly refreshApiUrl = `${dev.apiUrl}${API_ROUTES.REFRESH_AUTH}`;
  private readonly socialLoginApiUrl = `${dev.apiUrl}${API_ROUTES.SOCIAL_LOGIN}`;

  constructor(private readonly http: HttpClient) {}

  login(payload: AuthPayload): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(this.loginApiUrl, payload);
  }

  register(payload: AuthPayload): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(this.registerApiUrl, payload);
  }

  checkToken(): Observable<boolean> {
    return this.http.get<boolean>(this.statusApiUrl);
  }

  refreshAuth(): Observable<AuthInterface> {
    return this.http.get<AuthInterface>(this.refreshApiUrl);
  }

  socialLogin(payload: GoogleAuthPayload): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(this.socialLoginApiUrl, payload);
  }
}
