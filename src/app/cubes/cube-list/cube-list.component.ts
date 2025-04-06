import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { selectAllCubes, State } from '../../_store';
import { initializeCubes } from '../../_store/actions/cubes.actions';
import { Cube } from '../../_types';

@Component({
  selector: 'app-cube-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    NgFor,
    NgIf,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './cube-list.component.html',
  styleUrl: './cube-list.component.scss',
})
export class CubeListComponent implements OnInit {
  cubes$: Observable<Cube[]> = of([]);

  private readonly store$ = inject(Store<State>);

  ngOnInit() {
    this.store$.dispatch(initializeCubes());
    this.cubes$ = this.store$.select(selectAllCubes);
  }
}
