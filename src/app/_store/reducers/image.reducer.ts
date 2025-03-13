import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Image } from '../../_types';
import * as ImageActions from '../actions/image.actions';

export interface ImageState extends EntityState<Image> {
  selectedImageId: number | null;
  playerImageIds: number[];
}

export function selectImageId(a: Image): number {
  return a.id;
}

export const imageAdapter: EntityAdapter<Image> = createEntityAdapter<Image>({
  selectId: selectImageId,
  sortComparer: false,
});

export const initialState: ImageState = imageAdapter.getInitialState({
  selectedImageId: null,
  playerImageIds: [],
});

export const imageReducer = createReducer(
  initialState,
  on(ImageActions.setPlayerImages, (state, { ids }) => ({
    ...state,
    playerImageIds: ids,
  })),
  on(ImageActions.addImage, (state, { image }) => {
    return imageAdapter.addOne(image, state);
  }),
  on(ImageActions.setImage, (state, { image }) => {
    return imageAdapter.setOne(image, state);
  }),
  on(ImageActions.upsertImage, (state, { image }) => {
    return imageAdapter.upsertOne(image, state);
  }),
  on(ImageActions.addImages, (state, { images }) => {
    return imageAdapter.addMany(images, state);
  }),
  on(ImageActions.upsertImages, (state, { images }) => {
    return imageAdapter.upsertMany(images, state);
  }),
  on(ImageActions.updateImage, (state, { update }) => {
    return imageAdapter.updateOne(update, state);
  }),
  on(ImageActions.updateImages, (state, { updates }) => {
    return imageAdapter.updateMany(updates, state);
  }),
  on(ImageActions.mapImage, (state, { entityMap }) => {
    return imageAdapter.mapOne(entityMap, state);
  }),
  on(ImageActions.mapImages, (state, { entityMap }) => {
    return imageAdapter.map(entityMap, state);
  }),
  on(ImageActions.deleteImage, (state, { id }) => {
    return imageAdapter.removeOne(id, state);
  }),
  on(ImageActions.deleteImages, (state, { ids }) => {
    return imageAdapter.removeMany(ids, state);
  }),
  on(ImageActions.deleteImagesByPredicate, (state, { predicate }) => {
    return imageAdapter.removeMany(predicate, state);
  }),
  on(ImageActions.loadImages, (state, { images }) => {
    return imageAdapter.setAll(images, state);
  }),
  on(ImageActions.setImages, (state, { images }) => {
    return imageAdapter.setMany(images, state);
  }),
  on(ImageActions.clearImages, (state) => {
    return imageAdapter.removeAll({
      ...state,
      selectedImageId: null,
      playerImageIds: [],
    });
  }),
);

export const getPlayerImageIds = (state: ImageState) => state.playerImageIds;

const { selectIds, selectEntities, selectAll, selectTotal } =
  imageAdapter.getSelectors();

export const selectImageIds = selectIds;
export const selectImageEntities = selectEntities;
export const selectAllImages = selectAll;
export const selectImageTotal = selectTotal;
