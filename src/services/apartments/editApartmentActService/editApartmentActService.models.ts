import { $actTypes } from '01/features/actsJournal/displayActTypes/models';
import { createDomain, forward, sample } from 'effector';
import { UpdateApartmentActRequest, ApartmentActResponse } from '../../api/types';
import { actionChannel } from 'redux-saga/effects';
import { apartmentActsListService } from '../apartmentActsListService';
import { updateApartmentAct } from './editApartmentActService.api';
import {
  EditActFormPayload,
  EditActRequestPayload,
} from './editApartmentActService.types';

const domain = createDomain('editApartmentActService');

const openModal = domain.createEvent<ApartmentActResponse>();
const closeModal = domain.createEvent();

const $act = domain.createStore<ApartmentActResponse | null>(null);
$act.on(openModal, (_, act) => act).reset(closeModal);
const $isModalOpen = $act.map(Boolean);

$isModalOpen.on(openModal, () => true).reset(closeModal);

const editAct = domain.createEvent<EditActFormPayload>();
const editActFx = domain.createEffect<EditActRequestPayload, void>(updateApartmentAct);
const $editActIsLoading = editActFx.pending;

forward({
  from: editActFx.doneData,
  to: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

sample({
  source: $act.map((data) => data?.id),
  clock: editAct,
  fn: (actId, clockPayload) => ({ actId: actId!, act: clockPayload }),
  target: editActFx,
});

export const editApartmentActService = {
  inputs: {
    closeModal,
    openModal,
    editAct,
  },
  outputs: {
    $isModalOpen,
    $actTypes,
    $editActIsLoading,
    $act,
  },
};
