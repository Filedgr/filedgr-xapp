export interface NFTMetadata {
  my_schema: string;
  nftType: string;
  name: string;
  description: string;
  image: string;
  file: string;
  collection: {
    name: string;
    family: string;
  };
  attributes: {
    trait_type: string;
    description: string;
    value: string;
  }[];
}

export interface NFT {
  Flags: number;
  Issuer: string;
  NFTokenID: string;
  NFTokenTaxon: number;
  TransferFee: number;
  URI: string;
  nft_serial: number;
  ipfsUri: string;
  metadata: NFTMetadata;
}
