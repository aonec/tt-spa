import { PersonalNumberActions } from '../../selectPersonalNumberActionService.types';

export type SelectPersonalNumberActionModalProps = {
  isOpen: boolean;
  setAction: (payload: PersonalNumberActions) => PersonalNumberActions;
  apartmentId: number;
  setSelectActionModalOpen: (payload: boolean) => void;
};
