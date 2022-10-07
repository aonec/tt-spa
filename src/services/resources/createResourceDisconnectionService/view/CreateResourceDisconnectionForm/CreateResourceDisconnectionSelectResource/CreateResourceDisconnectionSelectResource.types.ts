import {
  EResourceType,
  EResourceTypeNullableStringDictionaryItem,
} from 'myApi';

export type CreateResourceDisconnectionSelectResourceProps = {
  disabled: boolean;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  currentValue?: EResourceType;
  errorText: string | null;
  setFieldValue: (value: EResourceType) => void;
};
