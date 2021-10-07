import {
  openEditPersonalNumberTypeModal,
  closeEditPersonalNumberTypeModal,
} from './index';
import { $isSelectEditPersonalNumberTypeModalOpen } from '.';

$isSelectEditPersonalNumberTypeModalOpen
  .on(openEditPersonalNumberTypeModal, () => true)
  .reset(closeEditPersonalNumberTypeModal);
