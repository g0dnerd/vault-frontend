export enum ImageType {
  CheckIn = 'CHECKIN',
  CheckOut = 'CHECKOUT',
}

export interface Image {
  id: number;
  url: string;
  draftPlayerId: number;
  imageType: ImageType;
}

export enum ImageStatus {
  INITIAL = 'initial',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  FAIL = 'fail',
}
