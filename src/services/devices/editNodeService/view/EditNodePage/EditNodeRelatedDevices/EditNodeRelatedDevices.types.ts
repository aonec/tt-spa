import { EMagistralTypeStringDictionaryItem, PipeNodeResponse } from 'myApi';

export type EditNodeRelatedDevicesProps = {
  node: PipeNodeResponse;
  magistrals: EMagistralTypeStringDictionaryItem[];
  refetchNode: () => void;
};
