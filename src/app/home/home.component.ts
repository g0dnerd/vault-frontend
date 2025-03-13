import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthAppState } from '../_store';
import { initProfile } from '../_store/actions/auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  ngOnInit() {
    this.authStore$.dispatch(initProfile());
  }
}
