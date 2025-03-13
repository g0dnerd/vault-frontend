import { Predicate } from '@angular/core';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Image } from '../../_types';

const TYPE = '[Images/API]';

export enum ImageActionTypes {
  IMAGE_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_PLAYER_IMAGES = `${TYPE} Initialize player images`,
  SET_PLAYER_IMAGES = `${TYPE} Set player images`,
  SELECT_IMAGE = `${TYPE} Select image`,
  LOAD_IMAGES = `${TYPE} Load images`,
  SET_IMAGES = `${TYPE} Set images`,
  ADD_IMAGE = `${TYPE} Add image`,
  SET_IMAGE = `${TYPE} Set image`,
  UPSERT_IMAGE = `${TYPE} Upsert image`,
  ADD_IMAGES = `${TYPE} Add images`,
  UPSERT_IMAGES = `${TYPE} Upsert images`,
  UPDATE_IMAGE = `${TYPE} Update image`,
  UPDATE_IMAGES = `${TYPE} Update images`,
  MAP_IMAGE = `${TYPE} Map image`,
  MAP_IMAGES = `${TYPE} Map images`,
  DELETE_IMAGE = `${TYPE} Delete image`,
  DELETE_IMAGES = `${TYPE} Delete images`,
  DELETE_IMAGES_BY_PREDICATE = `${TYPE} Delete images by predicate`,
  CLEAR_IMAGES = `${TYPE} Clear images`,
}

export const imageStoreFailure = createAction(
  ImageActionTypes.IMAGE_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializePlayerImages = createAction(
  ImageActionTypes.INITIALIZE_PLAYER_IMAGES,
);
export const setPlayerImages = createAction(
  ImageActionTypes.SET_PLAYER_IMAGES,
  props<{ ids: number[] }>(),
);
export const selectImage = createAction(
  ImageActionTypes.SELECT_IMAGE,
  props<{ imageId: number }>(),
);
export const loadImages = createAction(
  ImageActionTypes.LOAD_IMAGES,
  props<{ images: Image[] }>(),
);
export const setImages = createAction(
  ImageActionTypes.SET_IMAGES,
  props<{ images: Image[] }>(),
);
export const addImage = createAction(
  ImageActionTypes.ADD_IMAGE,
  props<{ image: Image }>(),
);
export const setImage = createAction(
  ImageActionTypes.SET_IMAGE,
  props<{ image: Image }>(),
);
export const upsertImage = createAction(
  ImageActionTypes.UPSERT_IMAGE,
  props<{ image: Image }>(),
);
export const addImages = createAction(
  ImageActionTypes.ADD_IMAGES,
  props<{ images: Image[] }>(),
);
export const upsertImages = createAction(
  ImageActionTypes.UPSERT_IMAGES,
  props<{ images: Image[] }>(),
);
export const updateImage = createAction(
  ImageActionTypes.UPDATE_IMAGE,
  props<{ update: Update<Image> }>(),
);
export const updateImages = createAction(
  ImageActionTypes.UPDATE_IMAGES,
  props<{ updates: Update<Image>[] }>(),
);
export const mapImage = createAction(
  ImageActionTypes.MAP_IMAGE,
  props<{ entityMap: EntityMapOne<Image> }>(),
);
export const mapImages = createAction(
  ImageActionTypes.MAP_IMAGES,
  props<{ entityMap: EntityMap<Image> }>(),
);
export const deleteImage = createAction(
  ImageActionTypes.DELETE_IMAGE,
  props<{ id: number }>(),
);
export const deleteImages = createAction(
  ImageActionTypes.DELETE_IMAGES,
  props<{ ids: number[] }>(),
);
export const deleteImagesByPredicate = createAction(
  ImageActionTypes.DELETE_IMAGES_BY_PREDICATE,
  props<{ predicate: Predicate<Image> }>(),
);
export const clearImages = createAction(ImageActionTypes.CLEAR_IMAGES);
