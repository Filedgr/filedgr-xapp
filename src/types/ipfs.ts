export interface IpfsGateway {
  name: string;
  domain: string;
  obfuscateTime: number | null;
}

export interface IpfsState {
  selectedGateway: IpfsGateway;
  gateways: IpfsGateway[];
}
