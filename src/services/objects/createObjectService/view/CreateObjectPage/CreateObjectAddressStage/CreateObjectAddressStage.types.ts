import { ObjectCreateSubmitData } from '../../../createObjectService.types';

export type CreateObjectAddressStageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
  onPageCancel: () => void;
  createObjectData: ObjectCreateSubmitData | null;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
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
