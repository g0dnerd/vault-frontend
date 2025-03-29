import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Image } from '../../_types';
import * as ImagesActions from '../actions/images.actions';

export interface ImagesState extends EntityState<Image> {
  selectedImageId: number | null;
  playerImageIds: number[];
}

export function selectImageId(a: Image): number {
  return a.id;
}

export const imagesAdapter: EntityAdapter<Image> = createEntityAdapter<Image>({
  selectId: selectImageId,
  sortComparer: false,
});

export const initialState: ImagesState = imagesAdapter.getInitialState({
  selectedImageId: null,
  playerImageIds: [],
});

export const imagesReducer = createReducer(
  initialState,
  on(ImagesActions.setPlayerImages, (state, { ids }) => ({
    ...state,
    playerImageIds: ids,
  })),
  on(ImagesActions.addImage, (state, { image }) => {
    return imagesAdapter.addOne(image, state);
  }),
  on(ImagesActions.setImage, (state, { image }) => {
    return imagesAdapter.setOne(image, state);
  }),
  on(ImagesActions.upsertImage, (state, { image }) => {
    return imagesAdapter.upsertOne(image, state);
  }),
  on(ImagesActions.addImages, (state, { images }) => {
    return imagesAdapter.addMany(images, state);
  }),
  on(ImagesActions.upsertImages, (state, { images }) => {
    return imagesAdapter.upsertMany(images, state);
  }),
  on(ImagesActions.updateImage, (state, { update }) => {
    return imagesAdapter.updateOne(update, state);
  }),
  on(ImagesActions.updateImages, (state, { updates }) => {
    return imagesAdapter.updateMany(updates, state);
  }),
  on(ImagesActions.mapImage, (state, { entityMap }) => {
    return imagesAdapter.mapOne(entityMap, state);
  }),
  on(ImagesActions.mapImages, (state, { entityMap }) => {
    return imagesAdapter.map(entityMap, state);
  }),
  on(ImagesActions.deleteImage, (state, { id }) => {
    return imagesAdapter.removeOne(id, state);
  }),
  on(ImagesActions.deleteImages, (state, { ids }) => {
    return imagesAdapter.removeMany(ids, state);
  }),
  on(ImagesActions.deleteImagesByPredicate, (state, { predicate }) => {
    return imagesAdapter.removeMany(predicate, state);
  }),
  on(ImagesActions.loadImages, (state, { images }) => {
    return imagesAdapter.setAll(images, state);
  }),
  on(ImagesActions.setImages, (state, { images }) => {
    return imagesAdapter.setMany(images, state);
  }),
  on(ImagesActions.clearImages, (state) => {
    return imagesAdapter.removeAll({
      ...state,
      selectedImageId: null,
      playerImageIds: [],
    });
  }),
);

export const getPlayerImageIds = (state: ImagesState) => state.playerImageIds;

const { selectIds, selectEntities, selectAll, selectTotal } =
  imagesAdapter.getSelectors();

export const selectImageIds = selectIds;
export const selectImageEntities = selectEntities;
export const selectAllImages = selectAll;
export const selectImageTotal = selectTotal;
