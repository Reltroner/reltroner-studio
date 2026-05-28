export interface PageMetadataInput {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: string;
  keywords?: string | string[];
}

export interface OpenGraphInput {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: string;
}