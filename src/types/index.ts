export type addressType = {
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
};

export type StatusType = {
  id: number;
  name: string;
};

export type gooogleResponseAPIItemTypes = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  fileFormat: string;
  buffer?: Buffer | null;
  image: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
};

export type LoginPayload = {
  success: boolean;
};
export type googleResponseAPIType = {
  items: [gooogleResponseAPIItemTypes];
};

export type getBuiltAddressType = (address: addressType) => string;
