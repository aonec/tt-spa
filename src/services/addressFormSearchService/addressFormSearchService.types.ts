import {
    AddressSearchValues,
    CustomTemplateType,
    SearchFieldType,
  } from './view/AddressSearch/AddressSearch.types';
  
  export type AddressSearchContainerProps = {
    fields: SearchFieldType[];
    handleSubmit: (values: AddressSearchValues) => void;
    initialValues?: AddressSearchValues | null;
    customTemplate?: CustomTemplateType;
  };
  