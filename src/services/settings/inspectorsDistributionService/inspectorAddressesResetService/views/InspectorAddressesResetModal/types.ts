import { InspectorResponse } from 'api/types';

export type InspectorAddressesResetModalProps = {
  handleClose: () => void;
  isOpen: boolean;
  handleResetAddress: () => void;
  loading: boolean;
  inspectorsList: InspectorResponse[] | null;
  handleSelectInspector: (payload: number) => void;
  inspectorId: number | null;
};
