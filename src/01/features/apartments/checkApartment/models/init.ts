import {
  openCheckApartmentModal,
  closeCheckApartmentModal,
  checkApartmentFx,
} from './index';
import { $isCheckApartmentModalOpen } from '.';

$isCheckApartmentModalOpen
  .on(openCheckApartmentModal, () => true)
  .reset(closeCheckApartmentModal, checkApartmentFx.done);
