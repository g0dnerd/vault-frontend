import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  numberAttribute,
  OnInit,
  signal,
  Signal,
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
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import {
  selectAllCubes,
  selectAllEnrollments,
  selectAllPhases,
  selectCurrentDraft,
  selectPlayersForDraft,
  selectTournamentById,
  State,
} from '../../../_store';
import { initializeCubes } from '../../../_store/actions/cubes.actions';
import {
  CreateDraftDto,
  CreatePhaseDto,
  Draft,
  Player,
  Tournament,
} from '../../../_types';
import { initializeAllTournaments } from '../../../_store/actions/tournaments.actions';
import { initializeSingleDraft } from '../../../_store/actions/drafts.actions';
import { initializePhasesForTournament } from '../../../_store/actions/phases.actions';
import {
  DraftsService,
  EnrollmentsService,
  PhasesService,
} from '../../../_services';
import { initializeEnrollments } from '../../../_store/actions/enrollments.actions';

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
    MatTooltipModule,
    NgClass,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './create-draft.component.html',
  styleUrl: './create-draft.component.scss',
})
export class CreateDraftComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store$ = inject(Store<State>);

  tournamentId = input(0, { transform: numberAttribute });

  readonly cubes$ = this.store$.select(selectAllCubes);
  readonly availableEnrollments$ = this.store$.select(selectAllEnrollments);
  readonly phases$ = this.store$.select(selectAllPhases);
  alreadyEnrolled$: Observable<Player[]> = of([]);
  draft$: Observable<Draft | null> = of(null);
  tournament$: Observable<Tournament | undefined> = of(undefined);

  form!: FormGroup;
  playerForm!: FormGroup;
  readonly cubeFormControl = new FormControl<number | null>(
    {
      value: null,
      disabled: false,
    },
    Validators.required,
  );
  readonly phaseFormControl = new FormControl<number | null>(
    {
      value: null,
      disabled: true,
    },
    Validators.required,
  );
  readonly tableFirstFormControl = new FormControl<number | null>({
    value: null,
    disabled: true,
  });
  readonly tableLastFormControl = new FormControl<number | null>({
    value: null,
    disabled: true,
  });
  readonly numRoundsFormControl = new FormControl<number>(
    {
      value: 0,
      disabled: true,
    },
    [Validators.required, Validators.min(2), Validators.max(10)],
  );
  readonly playersFormControl = new FormControl<number[]>({
    value: [],
    disabled: false,
  });
  loading = false;
  submitted = false;

  alreadyEnrolledIds: WritableSignal<number[]> = signal([]);
  edit: Signal<boolean> = computed(() => {
    return this.draftId ? true : false;
  });
  maxTable: WritableSignal<number> = signal(2);

  draftId: number | null = null;
  useExistingPhase = false;
  tableSliderEnabled = false;

  constructor(
    private readonly draftService: DraftsService,
    private readonly enrollmentService: EnrollmentsService,
    private readonly route: ActivatedRoute,
    private readonly phaseService: PhasesService,
  ) {
    this.form = this.formBuilder.group({
      cubeId: this.cubeFormControl,
      numRounds: this.numRoundsFormControl,
      tableFirst: this.tableFirstFormControl,
      tableLast: this.tableLastFormControl,
      phaseId: this.phaseFormControl,
    });
    this.playerForm = this.formBuilder.group({
      players: this.playersFormControl,
    });
  }

  ngOnInit() {
    const tournamentId: number = this.tournamentId();

    this.store$.dispatch(initializeEnrollments());
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeCubes());
    this.store$.dispatch(initializePhasesForTournament({ tournamentId }));
    this.tournament$ = this.store$.select(selectTournamentById(tournamentId));

    // If a draftId gets passed as an optional route parameter,
    // initialize that draft into state and render the form as an edit form for the specified draft.
    const id = this.route.snapshot.paramMap.get('draftId');
    if (id) {
      const draftId = parseInt(id);
      this.draftId = draftId;
      this.draft$ = this.store$.select(selectCurrentDraft);
      this.alreadyEnrolled$ = this.store$.select(
        selectPlayersForDraft(draftId),
      );
      this.store$.dispatch(initializeSingleDraft({ draftId }));
    }

    this.draft$.subscribe((draft) => {
      if (draft) {
        this.form.setValue({
          cubeId: draft.cube?.id,
          phaseId: draft.phase?.id,
          numRounds: draft.phase?.roundAmount,
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
      // TODO: What's the default max table?
      const maxTable = tournament ? tournament.playerCapacity / 2 : 10;
      this.maxTable.set(maxTable);
    });
  }

  get f() {
    return this.form.controls;
  }

  get pf() {
    return this.playerForm.controls;
  }

  async createDraft() {
    this.submitted = true;
    console.log('Form submitted');

    if (this.form.invalid) {
      // FIXME: Handle error
      console.error('Invalid form!');
      return;
    }

    this.loading = true;

    const cubeId = this.f['cubeId'].value;
    const tableFirst = this.f['tableFirst'].value;
    const tableLast = this.f['tableLast'].value;

    if (!this.useExistingPhase) {
      const tournamentId = this.tournamentId();
      // FIXME: read out numRounds
      const roundAmount = 3;
      const phaseData: CreatePhaseDto = { tournamentId, roundAmount };

      this.phaseService
        .createPhase(phaseData)
        .pipe(
          switchMap((phase) => {
            const draftData: CreateDraftDto = {
              cubeId,
              phaseId: phase.id,
              tableFirst,
              tableLast,
            };
            if (!this.edit()) {
              return this.draftService.createDraft(draftData);
            } else {
              return this.draftService.editDraft(draftData);
            }
          }),
          catchError((error) => {
            console.error(error);
            return of(null);
          }),
        )
        .subscribe((draft) => {
          console.log('Got draft', JSON.stringify(draft));
          if (draft) {
            const enrollmentIds = this.pf['players'].value;
            if (enrollmentIds.length > 0) {
              this.enrollmentService
                .enrollMany(tournamentId, enrollmentIds)
                .pipe(
                  tap((enrollments) => {
                    console.log(
                      'Enrolled players',
                      JSON.stringify(enrollments),
                    );
                  }),
                  catchError((error) => {
                    return of(console.error(error));
                  }),
                );
            }
          }
        });
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

  changePhaseControl() {
    const phaseCtrl = this.form.get('phaseId')!;
    if (phaseCtrl.enabled) {
      this.useExistingPhase = false;
      phaseCtrl.disable();
    } else {
      this.useExistingPhase = true;
      phaseCtrl.enable();
    }
  }
}
