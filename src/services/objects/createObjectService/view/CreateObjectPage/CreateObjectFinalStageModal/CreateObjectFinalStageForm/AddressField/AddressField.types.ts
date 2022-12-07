import { AdditionalInfo } from '../../../CreateObjectAdditionalInfoStage/CreateObjectAdditionalInfoStage.types';
import { ObjectAddressValues } from '../../../CreateObjectAddressStage/CreateObjectAddressStage.types';
import { ObjectMainInfoValues } from '../../../CreateObjectMainInfoStage/CreateObjectMainInfoStage.types';

export type AddressFieldProps = {
  createObjectData: Partial<
    ObjectAddressValues & ObjectMainInfoValues & AdditionalInfo
  > | null;
};
