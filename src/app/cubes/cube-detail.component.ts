import { NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Cube } from '../_types';
import { selectCubeById, State } from '../_store';
import { initializeAllCubes } from '../_store/actions/cube.actions';

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
    NgIf,
    PushPipe,
  ],
  templateUrl: './cube-detail.component.html',
  styleUrl: './cube-detail.component.scss',
})
export class CubeDetailComponent implements OnInit {
  cubeId = input.required<number>();

  private readonly store$ = inject(Store<State>);

  cube$: Observable<Cube | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeAllCubes());
    this.cube$ = this.store$.select(selectCubeById(this.cubeId()));
  }
}
