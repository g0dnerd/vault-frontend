
import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { selectCubeById, State } from '../../_store';
import { initializeCubes } from '../../_store/actions/cubes.actions';
import { Cube } from '../../_types';

@Component({
  selector: 'app-cube-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    PushPipe
],
  templateUrl: './cube-detail.component.html',
  styleUrl: './cube-detail.component.scss',
})
export class CubeDetailComponent implements OnInit {
  cubeId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  cube$: Observable<Cube | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeCubes());
    this.cube$ = this.store$.select(selectCubeById(this.cubeId()));
  }
}
