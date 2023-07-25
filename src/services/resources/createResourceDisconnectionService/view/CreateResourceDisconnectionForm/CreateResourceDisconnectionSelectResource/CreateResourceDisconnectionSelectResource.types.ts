import {
  EResourceType,
  EResourceTypeNullableStringDictionaryItem,
} from 'api/types';

export type CreateResourceDisconnectionSelectResourceProps = {
  disabled: boolean;
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  currentValue?: EResourceType;
  errorText: string | null;
  setFieldValue: (value: EResourceType) => void;
};
