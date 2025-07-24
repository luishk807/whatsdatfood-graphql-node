export type Address = {
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
};

export type Status = {
  id: number;
  name: string;
};

export type ID = number | bigint;

export type GooogleResponseAPIItem = {
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
export type GoogleResponseAPI = {
  items: [GooogleResponseAPIItem];
};

export type GetBuiltAddress = (address: Address) => string;
