import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs = new BehaviorSubject<BreadcrumbItem[]>([]);

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs.next(this.createBreadcrumbs(this.activatedRoute.root));
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = [],
  ): BreadcrumbItem[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeLabel = child.snapshot.data['breadcrumb'];

      if (routeLabel) {
        const routeUrl = child.snapshot.url
          .map((segment) => segment.path)
          .join('/');
        if (routeUrl !== '') {
          url += `/${routeUrl}`;
        }

        breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url });
        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
