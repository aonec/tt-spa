import { Event } from 'effector';
import { HomeownerAccountResponse } from 'api/types';
import { UpdateHomeownerRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export type EditHomeownerFieldProps = {
  phoneNumber?: string | null;
  name?: string | null;
  homeownerId: string | undefined;
  handleUpdate?: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading?: boolean;
  handleHomeownerUpdated?: Event<HomeownerAccountResponse>;
  fieldType: FieldType;
};

export enum FieldType {
  Name = 'Name',
  PhoneNumber = 'PhoneNumber',
}
