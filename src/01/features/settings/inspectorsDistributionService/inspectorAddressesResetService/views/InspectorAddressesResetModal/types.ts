import { InspectorResponse } from '../../api/types';
import { ResetInspectorHousingStocksAddressesForm } from '../../types';

export type InspectorAddressesResetModalProps = {
  handleClose: () => void;
  isOpen: boolean;
  handleResetAddress: () => void;
  form: ResetInspectorHousingStocksAddressesForm;
  loading: boolean;
  inspectorsList: InspectorResponse[] | null;
};
