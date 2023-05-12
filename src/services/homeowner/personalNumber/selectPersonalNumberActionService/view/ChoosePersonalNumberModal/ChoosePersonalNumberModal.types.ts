import { ApartmentResponse } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService.types';

export type ChoosePersonalNumberModalProps = {
  isOpen: boolean;
  apartment: ApartmentResponse;
  setIsOpen: (payload: boolean) => void;
  selectedAction: PersonalNumberActions | null;
  setSelectActionModalOpen: (payload: boolean) => void;
};
