import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthAppState } from './_store';
import { logout, refreshAuth } from './_store/actions/auth.actions';

@Component({
  standalone: true,
  imports: [RouterOutlet, AlertComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authStore$: Store<AuthAppState>,
    private readonly router: Router
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
