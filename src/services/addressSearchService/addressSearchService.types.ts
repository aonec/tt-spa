import { EOrderByRule } from 'api/types';
import {
  AddressSearchValues,
  CustomTemplateType,
  SearchFieldType,
} from './view/AddressSearch/AddressSearch.types';

export type AddressSearchContainerProps = {
  fields: SearchFieldType[];
  handleSubmit?: (values: AddressSearchValues) => void;
  initialValues?: AddressSearchValues | null;
  customTemplate?: CustomTemplateType;
  showLabels?: boolean;
  disabledFields?: SearchFieldType[];
  onChange?: (key: string, value: string) => void;
  className?: string;
  isError?: boolean;
};

export type GetExistingSteetRequestParams = {
  Street?: string | null;
  City?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
