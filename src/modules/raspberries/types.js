export type RaspberryConfigType = {
  time?: number,
  display?: string,
  url?: string,
};

export type RaspberryDataType = {
  id: string,
  name: string,
  macAddresses: Array<string>,
  config: RaspberryConfigType,
  owner: string,
  organisation: ?string,
};

export type RaspberryType = {
  id: string,
  data?: RaspberryDataType,
  registered?: boolean,
  online: boolean | string,
  externalIp: string | null,
  ip: string | null,
  screenState: string | null,
};
