import { InspectorResponse } from 'myApi';
import { InspectorsReassignmentForm } from '../../types';

export type ReassingInspectorModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: () => void;
  form: InspectorsReassignmentForm;
  inspectorsList: InspectorResponse[] | null;
  loading: boolean;
};
