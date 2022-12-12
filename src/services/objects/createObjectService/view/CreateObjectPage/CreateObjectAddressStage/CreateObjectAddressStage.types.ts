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
};

export type ObjectAddressValues = {
  city: string | null;
  street: string;
  house: string | null;
  corpus: string | null;
  index: string | null;
  additionalAddresses: Address[];
};
