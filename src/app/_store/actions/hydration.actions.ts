import { createAction, props } from '@ngrx/store';
import { State } from '..';

const TYPE = '[Hydration]';

export enum HydrateActionTypes {
  HYDRATE = `${TYPE} Hydrate`,
  HYDRATE_SUCCESS = `${TYPE} Hydration success`,
  HYDRATE_FAILURE = `${TYPE} Hydration failure`,
}

export const hydrate = createAction(HydrateActionTypes.HYDRATE);
export const hydrateSuccess = createAction(
  HydrateActionTypes.HYDRATE_SUCCESS,
  props<{ state: State }>(),
);
export const hydrateFailure = createAction(HydrateActionTypes.HYDRATE_FAILURE);
