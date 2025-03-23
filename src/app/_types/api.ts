export const API_ROUTES = {
  MATCHES: '/matches',
  RESULTS: '/results',
  TOURNAMENTS: '/tournaments',
  ENROLLMENTS: '/enrollments',
  LOGIN: '/auth/login',
  SOCIAL_LOGIN: '/auth/login/google',
  REGISTER: '/auth/register',
  STATUS: '/auth/status',
  REFRESH_AUTH: '/auth/refresh',
  USER: '/users',
  PLAYERS: '/draft-players',
  DRAFTS: '/drafts',
  IMAGES: '/images',
  CUBES: '/cubes',
  PHASES: '/phases',
};

export enum Statuses {
  UNITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
}
