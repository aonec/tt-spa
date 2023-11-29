import React, { useEffect, useMemo } from 'react';
import {  useNavigate, useParams } from 'react-router';
import { apartmentSealService } from './apartmentSealService.model';
import { useUnit } from 'effector-react';
import { ApartmentSealProfile } from './view/ApartmentSealProfile';
import { CreateSealContainer, createSealService } from '../createSealService';
import './apartmentSealService.relations';
import {
  DeleteAppointmentContainer,
  deleteAppointmentService,
} from '../deleteAppointmentService';
import {
  existingDistrictsQuery,
  getApartmentQuery,
} from './apartmentSealService.api';

const { inputs, outputs, gates } = apartmentSealService;
const { ApartmentGate } = gates;

export const ApartmentSealContainer = () => {
  const history =  useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: existingDistricts } = useUnit(existingDistrictsQuery);

  const housesWithDistricts = useMemo(() => {
    return (
      existingDistricts?.reduce((acc, { houses }) => {
        if (!houses) return acc;

        const housesIds = houses.map(({ id }) => id!);

        return [...acc, ...housesIds];
      }, [] as number[]) || []
    );
  }, [existingDistricts]);

  const {
    apartment,
    individualDevices,
    isApartmentLoading,
    isAppointmentLoading,
    nearestAppointment,
    searchApartment,
    selectedHomeownerName,
    setSelectedHomeownerName,
    updateApartment,
    openCreateSealAppointmentModal,
    isApartmentFetched,
    openRemoveAppointmentModal,
  } = useUnit({
    isApartmentLoading: outputs.$isApartmentLoading,
    isAppointmentLoading: outputs.$isSealAppointmentLoading,
    apartment: outputs.$apartment,
    selectedHomeownerName: outputs.$selectedHomeownerName,
    individualDevices: outputs.$individualDevices,
    nearestAppointment: outputs.$apartmentAppointment,
    searchApartment: inputs.handleSearchApartment,
    setSelectedHomeownerName: inputs.setSelectedHomeownerName,
    updateApartment: inputs.handleUpdateApartment,
    openRemoveAppointmentModal: deleteAppointmentService.inputs.openModal,
    openCreateSealAppointmentModal: createSealService.inputs.openModal,
    isApartmentFetched: getApartmentQuery.$succeeded,
  });

  useEffect(() => {
    return inputs.handleApartmentLoaded.watch(({ result: apartment }) => {
      if (!apartment || apartment.id === Number(id)) return;

       history(`/services/seal/apartment/${apartment.id}`);
    }).unsubscribe;
  }, [history, id]);

  return (
    <>
      <ApartmentGate id={id ? Number(id) : undefined} />
      <CreateSealContainer />
      <DeleteAppointmentContainer />
      <ApartmentSealProfile
        apartment={apartment}
        isLoadingApartment={isApartmentLoading}
        searchApartment={searchApartment}
        setSelectedHomeownerName={setSelectedHomeownerName}
        selectedHomeownerName={selectedHomeownerName}
        updateApartment={updateApartment}
        individualDevices={individualDevices}
        openCreateSealAppointmentModal={openCreateSealAppointmentModal}
        nearestAppointment={nearestAppointment}
        isAppointmentLoading={isAppointmentLoading}
        isApartmentFetched={isApartmentFetched}
        openRemoveAppointmentModal={() =>
          nearestAppointment &&
          openRemoveAppointmentModal(nearestAppointment.id)
        }
        housesWithDistricts={housesWithDistricts}
      />
    </>
  );
};
