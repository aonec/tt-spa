import { Event } from 'effector';
import { HomeownerAccountResponse } from 'myApi';
import { UpdateHomeownerRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export type EditHomeownerFieldProps = {
  value: string | null;
  title: string;
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
