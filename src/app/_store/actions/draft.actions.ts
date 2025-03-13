import { createAction, props } from '@ngrx/store';

import { Draft } from '../../_types';

const TYPE = '[Drafts]';

export enum DraftActionTypes {
  DRAFT_STORE_FAILURE = `${TYPE} Error`,
  INIT_ONGOING_DRAFTS = `${TYPE} Initialize all drafts`,
  INIT_ONGOING_DRAFTS_SUCCESS = `${TYPE} Initialize all drafts success`,
  INIT_CURRENT_DRAFT = `${TYPE} Initialize current draft`,
  INIT_CURRENT_DRAFT_SUCCESS = `${TYPE} Initialize current draft success`,
  INIT_SINGLE_DRAFT = `${TYPE} Initialize single draft`,
  INIT_SINGLE_DRAFT_SUCCESS = `${TYPE} Initialize single draft success`,
  SEAT_DRAFT = `${TYPE} Seat draft`,
}

export const draftStoreFailure = createAction(
  DraftActionTypes.DRAFT_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);

export const initOngoingDrafts = createAction(
  DraftActionTypes.INIT_ONGOING_DRAFTS,
  props<{ tournamentId: number }>(),
);

export const initOngoingDraftsSuccess = createAction(
  DraftActionTypes.INIT_ONGOING_DRAFTS_SUCCESS,
  props<{ ongoing: Draft[] }>(),
);

export const initCurrentDraft = createAction(
  DraftActionTypes.INIT_CURRENT_DRAFT,
  props<{ tournamentId: number }>(),
);

export const initCurrentDraftSuccess = createAction(
  DraftActionTypes.INIT_CURRENT_DRAFT_SUCCESS,
  props<{ current: Draft }>(),
);

export const initSingleDraft = createAction(
  DraftActionTypes.INIT_SINGLE_DRAFT,
  props<{ draftId: number }>(),
);

export const seatDraft = createAction(
  DraftActionTypes.SEAT_DRAFT,
  props<{ draftId: number }>(),
);
