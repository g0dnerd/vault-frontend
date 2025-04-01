import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client,
  },
  {
    path: 'account/login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'account/register',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cubes',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
