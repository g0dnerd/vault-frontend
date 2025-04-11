import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  BreadcrumbItem,
  BreadcrumbService,
} from '../_services/breadcrumb.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [AsyncPipe, MatToolbarModule, NgFor, NgIf, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  breadcrumbs$: BehaviorSubject<BreadcrumbItem[]> =
    this.breadcrumbService.breadcrumbs;

  ngOnInit() {
    // this.breadcrumbs = this.breadcrumbService.breadcrumbs;
    this.breadcrumbs$
      .pipe(
        map((breadcrumbs) =>
          console.log(
            'Component has breadcrumbs:',
            JSON.stringify(breadcrumbs),
          ),
        ),
      )
      .subscribe();
  }
}
