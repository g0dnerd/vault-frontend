import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { AlertService, DraftService } from '../_services';
import { selectAllCubes, selectAllEnrollments, State } from '../_store';
import { initializeAllCubes } from '../_store/actions/cube.actions';
import { initializeEnrollmentsForTournament } from '../_store/actions/enrollment.actions';

@Component({
  selector: 'app-create-draft',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgClass,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './create-draft.component.html',
  styleUrl: './create-draft.component.scss',
})
export class CreateDraftComponent implements OnInit {
  tournamentId = input.required<number>();
  private readonly store$ = inject(Store<State>);
  readonly cubes$ = this.store$.select(selectAllCubes);
  readonly enrollments$ = this.store$.select(selectAllEnrollments);

  selectedPlayers: WritableSignal<number[]> = signal([]);
  roundNumber: Signal<number> = computed(() => {
    const numPlayers = this.selectedPlayers().length;
    if (numPlayers >= 9 && numPlayers <= 16) {
      return 4;
    } else if (numPlayers >= 17 && numPlayers <= 32) {
      return 5;
    } else if (numPlayers >= 33 && numPlayers <= 64) {
      return 6;
    } else if (numPlayers >= 65 && numPlayers <= 128) {
      return 7;
    } else if (numPlayers >= 129 && numPlayers <= 226) {
      return 8;
    } else if (numPlayers >= 227 && numPlayers <= 409) {
      return 9;
    } else if (numPlayers >= 410) {
      return 10;
    } else {
      return 3;
    }
  });

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly draftService: DraftService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      cube: [null, Validators.required],
      rounds: [0, [Validators.required, Validators.min(2), Validators.max(10)]],
      players: [[]],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.store$.dispatch(initializeAllCubes());
    this.store$.dispatch(
      initializeEnrollmentsForTournament({ tournamentId: this.tournamentId() })
    );
    this.form.setValue({
      cube: null,
      rounds: 3,
      players: [],
    });
  }

  async onSubmit() {
    this.submitted = true;
  }

  playersChanged(players: number[]) {
    this.selectedPlayers.set(players);
  }
}
