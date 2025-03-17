import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { EnrollmentService, TournamentService } from '../_services';
import { selectAllUsers, State } from '../_store';
import { initializeEnrollmentsForTournament } from '../_store/actions/enrollment.actions';
import { initializeAvailableUsersForTournament } from '../_store/actions/user.actions';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
    NgClass,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss',
})
export class CreateTournamentComponent implements OnInit {
  @ViewChild('stepper', { static: true }) stepper!: MatStepper;

  private readonly formBuilder = inject(FormBuilder);
  private readonly store$ = inject(Store<State>);

  readonly availableUsers$ = this.store$.select(selectAllUsers);

  tournamentForm = this.formBuilder.group({
    name: ['', Validators.required],
    public: [false, Validators.required],
    league: [false, Validators.required],
    playerCapacity: [
      0,
      [Validators.required, Validators.pattern(/[0-9]{1,2}/)],
    ],
    description: ['', Validators.required],
  });

  enrollForm!: FormGroup;

  loading = false;
  submitted = false;

  tournamentId: number | null = null;
  skipInitial: Signal<boolean> = computed(() => {
    return this.tournamentId ? true : false;
  });
  selectedUsers: WritableSignal<number[]> = signal([]);

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly enrollmentService: EnrollmentService,
    private readonly route: ActivatedRoute,
  ) {
    this.enrollForm = this.formBuilder.group({
      users: [[]],
    });
  }

  ngOnInit() {
    // If the tournament ID gets passed as into the optional route parameter,
    // skip directly to step 3 (create draft) and initialize tournament data accordingly.
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const tournamentId = parseInt(id);
      this.tournamentId = tournamentId;
      this.store$.dispatch(
        initializeAvailableUsersForTournament({ tournamentId }),
      );
    }

    this.enrollForm.setValue({
      users: [],
    });
    setTimeout(() => {
      this.stepper.next();
    }, 1);
  }

  get f() {
    return this.tournamentForm.controls;
  }

  get ef() {
    return this.enrollForm.controls;
  }

  async createTournament() {
    this.submitted = true;

    if (this.tournamentForm.invalid) return;

    this.loading = true;

    try {
      // FIXME: give feedback on unsuccessful requests
      // (e.g. duplicate tournament name)
      const tournament = await firstValueFrom(
        this.tournamentService.createTournament(
          this.f['name'].value!,
          this.f['public'].value!,
          this.f['league'].value!,
          this.f['playerCapacity'].value!,
          this.f['description'].value,
        ),
      );

      // Reset form and state
      this.loading = false;
      this.submitted = false;
      this.tournamentForm.reset();
      this.store$.dispatch(
        initializeAvailableUsersForTournament({ tournamentId: tournament.id }),
      );
      this.store$.dispatch(
        initializeEnrollmentsForTournament({ tournamentId: tournament.id }),
      );
    } catch (error) {
      this.loading = false;
    }
  }

  async enrollUsers() {
    this.submitted = true;
    if (this.enrollForm.invalid) {
      return;
    }

    this.loading = true;

    const players = this.ef['users'].value;

    // FIXME: actually pull tournamentId
    const tournamentId = 226;

    this.enrollmentService.enrollMany(tournamentId, players).subscribe(() => {
      this.store$.dispatch(
        initializeAvailableUsersForTournament({ tournamentId }),
      );
      // FIXME: give feedback on successful and unsuccessful enrollments
    });
  }

  enrollmentsChanged(users: number[]) {
    this.selectedUsers.set(users);
  }
}
