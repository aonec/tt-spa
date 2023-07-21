import {
  ApartmentActResponse,
  DocumentResponse,
  EActResourceType,
  EActType,
} from 'api/types';
import { ActsFilter } from '../apartmentActsListService.types';

export type ApartmentActsListProps = {
  acts: ApartmentActResponse[];
  isLoading: boolean;
  handleOpeningCreateActModal: () => void;
  handleOpeningDeleteActModal: (actId: number) => void;
  handleOpeningEditActModal: (act: ApartmentActResponse) => void;
  handleSaveFile: (document: DocumentResponse) => void;
  handleUpdateTypes: (types: EActType[]) => void;
  handleUpdateResources: (resources: EActResourceType[]) => void;
  selectedFilters: ActsFilter;
  isPermitionToChangeApartmentAct: boolean;
};
