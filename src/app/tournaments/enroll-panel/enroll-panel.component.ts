import { NgIf } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-enroll-panel',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './enroll-panel.component.html',
  styleUrl: './enroll-panel.component.scss',
})
// FIXME: this should just be inlined into the parent
// component instead of taking all these inputs
export class EnrollPanelComponent implements OnInit {
  readonly tournamentId = input.required<number>();
  readonly tournamentName = input.required<string>();
  readonly tournamentCapacity = input.required<number>();

  @Output() enrollInTournament = new EventEmitter();

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

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

    if (this.form.invalid || !this.tournamentId()) {
      // TODO: Give this a proper feedback message
      return;
    }

    this.loading = true;
    this.enrollInTournament.emit({
      tournamentId: this.tournamentId(),
    });
    this.loading = false;
  }
}
