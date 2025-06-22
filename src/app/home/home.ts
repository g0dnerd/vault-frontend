import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../_store';
import { initProfile } from '../_store/actions/auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private readonly store$: Store<State>) {}

  ngOnInit() {
    this.store$.dispatch(initProfile());
  }
}
