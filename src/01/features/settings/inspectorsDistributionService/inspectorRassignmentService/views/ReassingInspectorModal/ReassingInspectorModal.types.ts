import { InspectorResponse } from '../../../../../../../api/types';
import { InspectorsReassignmentForm } from '../../inspectorReassignmentService.types';

export type ReassingInspectorModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: () => void;
  form: InspectorsReassignmentForm;
  inspectorsList: InspectorResponse[] | null;
  isLoading: boolean;
};
