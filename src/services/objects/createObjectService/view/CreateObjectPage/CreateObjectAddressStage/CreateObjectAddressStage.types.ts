export type CreateObjectAddressStageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
};

export type Address = {
  street: string;
  house: string;
  corpus: string;
  index: string;
};

export type ObjectAddressValues = {
  city: string;
  street: string;
  house: string;
  corpus: string;
  index: string;
  additionalAddresses: Address[];
};
