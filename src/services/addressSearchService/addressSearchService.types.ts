import {
  AddressSearchValues,
  CustomTemplateType,
  SearchFieldType,
} from './view/AddressSearch/AddressSearch.types';
import { EOrderByRule } from 'myApi';

export type AddressSearchContainerProps = {
  fields: SearchFieldType[];
  handleSubmit?: (values: AddressSearchValues) => void;
  initialValues?: AddressSearchValues | null;
  customTemplate?: CustomTemplateType;
  showLabels?: boolean;
  disabledFields?: SearchFieldType[];
  onChange?: (key: string, value: string) => void;
};

interface Params {
  Street?: string | null;
  City?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export type GetExistingSteetRequestParams = {
  Street?: string | null;
  City?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
