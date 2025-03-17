import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  DraftAppState,
  selectAllCubes,
  selectAllEnrollments,
  selectCurrentDraft,
  selectDraftEnrollments,
  selectTournamentById,
  State,
} from '../_store';
import {
  initializeEnrollmentsForDraft,
  initializeEnrollmentsForTournament,
} from '../_store/actions/enrollment.actions';
import { initializeAllCubes } from '../_store/actions/cube.actions';
// import { DraftService } from '../_services';
import { Draft, Tournament } from '../_types';
import { initializeAllTournaments } from '../_store/actions/tournament.actions';
import { initSingleDraft } from '../_store/actions/draft.actions';

@Component({
  selector: 'app-create-draft',
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatStepperModule,
    NgClass,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './create-draft.component.html',
  styleUrl: './create-draft.component.scss',
})
export class CreateDraftComponent implements OnInit {
  @ViewChild('stepper', { static: true }) stepper!: MatStepper;
  tournamentId = input.required<number>();
  draftId: number | null = null;

  private readonly formBuilder = inject(FormBuilder);
  private readonly draftStore$ = inject(Store<DraftAppState>);
  private readonly store$ = inject(Store<State>);
  readonly cubes$ = this.store$.select(selectAllCubes);
  readonly availableEnrollments$ = this.store$.select(selectAllEnrollments);
  readonly alreadyEnrolled$ = this.store$.select(selectDraftEnrollments);
  draft$: Observable<Draft | null> = of(null);
  tournament$: Observable<Tournament | undefined> = of(undefined);

  form!: FormGroup;

  loading = false;
  submitted = false;

  draftCubeId: WritableSignal<number> = signal(0);
  alreadyEnrolledIds: WritableSignal<number[]> = signal([]);
  edit: Signal<boolean> = computed(() => {
    return this.draftId ? true : false;
  });
  maxTable: WritableSignal<number> = signal(2);
  tableSliderEnabled = false;

  constructor(
    // private readonly draftService: DraftService,
    private readonly route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      cube: [0, Validators.required],
      rounds: [0, [Validators.required, Validators.min(2), Validators.max(10)]],
      players: [[]],
      tableFirst: new FormControl<number>({ value: 1, disabled: true }),
      tableLast: new FormControl<number>({ value: 2, disabled: true }),
    });
  }

  ngOnInit() {
    this.store$.dispatch(
      initializeEnrollmentsForTournament({ tournamentId: this.tournamentId() }),
    );
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeAllCubes());

    this.form.setValue({
      cube: 0,
      rounds: 3,
      players: [],
      tableFirst: 1,
      tableLast: 2,
    });

    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId()),
    );

    // If a draftId gets passed as an optional route parameter,
    // initialize that draft into state and render the form as an edit form for the specified draft.
    const id = this.route.snapshot.paramMap.get('draftId');
    if (id) {
      const draftId = parseInt(id);
      this.draftId = draftId;
      this.draft$ = this.draftStore$.select(selectCurrentDraft);
      this.draftStore$.dispatch(initSingleDraft({ draftId }));
      this.store$.dispatch(initializeEnrollmentsForDraft({ draftId }));

      this.stepper.next();
    }

    this.draft$.subscribe((draft) => {
      if (draft) {
        this.draftCubeId.set(draft.cube!.id);
        this.form.setValue({
          cube: draft.cube!.id,
          rounds: draft.phase?.roundAmount,
          players: this.f['players'].value,
          tableFirst: this.f['tableFirst'].value,
          tableLast: this.f['tableLast'].value,
        });
      }
    });

    this.alreadyEnrolled$.subscribe((enrolled) => {
      this.alreadyEnrolledIds.set(enrolled.map((e) => e.id));
    });
    this.tournament$.subscribe((tournament) => {
      const maxTable = tournament ? tournament.playerCapacity / 2 : 10;
      this.maxTable.set(maxTable);
    });
  }

  get f() {
    return this.form.controls;
  }

  async createDraft() {
    this.submitted = true;

    if (this.form.invalid) {
      // FIXME: Handle error
      return;
    }

    this.loading = true;
    try {
      // const draft = await firstValueFrom(
      //   this.draftService.createDraft(
      //     this.f['cube'].value!,
      //     this.f['']
      //   )
      // )
      // const _ = null;
    } finally {
      this.loading = false;
      this.submitted = false;
      this.form.reset();
    }
  }

  changeTableControl() {
    const tf = this.form.get('tableFirst')!;
    if (tf.enabled) {
      tf.disable();
      this.tableSliderEnabled = true;
    } else {
      tf.enable();
      this.tableSliderEnabled = false;
    }

    const tl = this.form.get('tableLast')!;
    if (tl.enabled) {
      tl.disable();
    } else {
      tl.enable();
    }
  }
}
