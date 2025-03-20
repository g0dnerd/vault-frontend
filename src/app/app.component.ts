import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthAppState } from './_store';
import { logout, refreshAuth } from './_store/actions/auth.actions';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authStore$: Store<AuthAppState>,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.authStore$.dispatch(logout());
      this.router.navigateByUrl('/account/login');
    } else {
      this.authStore$.dispatch(refreshAuth());
    }
  }
}
