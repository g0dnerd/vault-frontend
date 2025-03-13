import { NgIf } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AlertService } from '../../_services';

@Component({
  selector: 'app-enroll-panel',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './enroll-panel.component.html',
  styleUrl: './enroll-panel.component.scss',
})
export class EnrollPanelComponent implements OnInit {
  readonly tournamentId = input.required<number>();
  readonly tournamentName = input.required<string>();
  readonly tournamentCapacity = input.required<number>();

  @Output() enrollInTournament = new EventEmitter();

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      tournamentId: [this.tournamentId(), Validators.required],
    });
    this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid || !this.tournamentId()) {
      // TODO: Give this a proper feedback message
      this.alertService.error(`Invalid enrollment form.`);
      return;
    }

    this.loading = true;
    this.enrollInTournament.emit({
      tournamentId: this.tournamentId(),
    });
    this.loading = false;
  }
}
