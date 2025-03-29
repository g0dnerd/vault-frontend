import { createAction, props } from '@ngrx/store';

import { CreateDraftDto, Draft, UpdateDraftDto } from '../../_types';

const TYPE = '[Drafts]';

export enum DraftActionTypes {
  DRAFT_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_ONGOING_DRAFTS = `${TYPE} Initialize all drafts`,
  INITIALIZE_ONGOING_DRAFTS_SUCCESS = `${TYPE} Initialize all drafts success`,
  INITIALIZE_CURRENT_DRAFT = `${TYPE} Initialize current draft`,
  INITIALIZE_CURRENT_DRAFT_SUCCESS = `${TYPE} Initialize current draft success`,
  INITIALIZE_SINGLE_DRAFT = `${TYPE} Initialize single draft`,
  INITIALIZE_SINGLE_DRAFT_SUCCESS = `${TYPE} Initialize single draft success`,
  SEAT_DRAFT = `${TYPE} Seat draft`,
  CREATE_DRAFT = `${TYPE} Create draft`,
  UPDATE_DRAFT = `${TYPE} Update draft`,
}

export const draftStoreFailure = createAction(
  DraftActionTypes.DRAFT_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);

export const initializeOngoingDrafts = createAction(
  DraftActionTypes.INITIALIZE_ONGOING_DRAFTS,
  props<{ tournamentId: number }>(),
);

export const initializeOngoingDraftsSuccess = createAction(
  DraftActionTypes.INITIALIZE_ONGOING_DRAFTS_SUCCESS,
  props<{ ongoing: Draft[] }>(),
);

export const initializeCurrentDraft = createAction(
  DraftActionTypes.INITIALIZE_CURRENT_DRAFT,
  props<{ tournamentId: number }>(),
);

export const initializeCurrentDraftSuccess = createAction(
  DraftActionTypes.INITIALIZE_CURRENT_DRAFT_SUCCESS,
  props<{ current: Draft }>(),
);

export const initializeSingleDraft = createAction(
  DraftActionTypes.INITIALIZE_SINGLE_DRAFT,
  props<{ draftId: number }>(),
);

export const seatDraft = createAction(
  DraftActionTypes.SEAT_DRAFT,
  props<{ draftId: number }>(),
);

export const createDraft = createAction(
  DraftActionTypes.CREATE_DRAFT,
  props<{ data: CreateDraftDto }>(),
);

export const updateDraft = createAction(
  DraftActionTypes.UPDATE_DRAFT,
  props<{ changes: UpdateDraftDto }>(),
);
