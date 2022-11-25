export type CreateObjectAddressStageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
  handleAddressData: (payload: ObjectAddressValues) => void;
  onPageCancel: () => void;
  createObjectData: ObjectAddressValues | null;
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
