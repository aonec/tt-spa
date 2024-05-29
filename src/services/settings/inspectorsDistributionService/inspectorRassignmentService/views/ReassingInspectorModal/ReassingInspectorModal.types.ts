import { InspectorResponse } from 'api/types';

export type ReassingInspectorModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  inspectorsList: InspectorResponse[] | null;
  isLoading: boolean;
  handleSave: (payload: ReassingInspectorForm) => void;
};

export type ReassingInspectorForm = {
  currentInspector: number | null;
  newInspector: number | null;
};
