import { EOrderByRule } from 'api/types';
import {
  AddressSearchValues,
  CustomTemplateType,
  SearchFieldType,
} from './view/AddressSearch/AddressSearch.types';

export type AddressSearchContainerProps = {
  fields: SearchFieldType[];
  handleSubmit?: (values: Partial<AddressSearchValues>) => void;
  initialValues?: Partial<AddressSearchValues> | null;
  customTemplate?: CustomTemplateType;
  showLabels?: boolean;
  disabledFields?: SearchFieldType[];
  onChange?: (key: string, value: string) => void;
  className?: string;
  isError?: boolean;
  isFocus?: boolean;
  autoBurn?: boolean;
  isCityPreselected?: boolean;
};

export type GetExistingSteetRequestParams = {
  Street?: string | null;
  City?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type GetApartmentsRequest = {
  City: string;
  Street: string;
  HousingStockNumber: string;
  Corpus?: string;
};

export type ExistingApartmentNumberType = {
  value: string;
};
