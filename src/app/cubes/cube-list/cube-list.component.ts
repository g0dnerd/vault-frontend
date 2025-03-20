import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { selectAllCubes, State } from '../../_store';
import { initializeAllCubes } from '../../_store/actions/cube.actions';
import { Cube } from '../../_types';

@Component({
  selector: 'app-cube-list',
  standalone: true,
  imports: [MatCardModule, MatListModule, NgFor, NgIf, PushPipe, RouterLink],
  templateUrl: './cube-list.component.html',
  styleUrl: './cube-list.component.scss',
})
export class CubeListComponent implements OnInit {
  cubes$: Observable<Cube[]> = of([]);

  private readonly store$ = inject(Store<State>);

  ngOnInit() {
    this.store$.dispatch(initializeAllCubes());
    this.cubes$ = this.store$.select(selectAllCubes);
  }
}
