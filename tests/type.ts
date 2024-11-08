export type UserLocation = {
  lat: number;
  lon: number;
  height: number;
};

export type Rotation = {
  roll: number;
  pitch: number;
  yaw: number;
};

export type Size = {
  width: string;
  height: string;
};

export type PublicSpace = {
  layerId: string;
};

export type Content = {
  contentId: string;
  contentType: string;
  content: Html2d;
};

export type RequestGetContents = {
  contentIds: string[];
};

export type RequestCreateContent = {
  layerId: string;
  contentType: string;
  content: Html2d;
};

export type ResponseCreateContent = {
  contentId: string;
  contentType: string;
  content: Html2d;
};

export type RequestUpdateContent = {
  contentId: string;
  contentType: string;
  content: Html2d;
};

export type RequestCreateLayer = {
  layerId: string;
};

export type ResponseCreateLayer = {
  layerId: string;
};

export type ResponseGetLayerContentIds = {
  contentIds: string[];
};

export type Html2d = {
  location: UserLocation;
  rotation: Rotation;
  size: Size;
  textType: string;
  textUrl: string;
};
