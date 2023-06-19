import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { apartmentSealService } from './apartmentSealService.model';
import { useUnit } from 'effector-react';
import { ApartmentSealProfile } from './view/ApartmentSealProfile';
import { CreateSealContainer, createSealService } from '../createSealService';

const { inputs, outputs, gates } = apartmentSealService;
const { ApartmentGate } = gates;

export const ApartmentSealContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const isApartmentLoading = useUnit(outputs.$isApartmentLoading);
  const apartment = useUnit(outputs.$apartment);
  const selectedHomeownerName = useUnit(outputs.$selectedHomeownerName);
  const individualDevices = useUnit(outputs.$individualDevices);
  const nearestAppointment = useUnit(outputs.$apartmentAppointment);

  const searchApartment = useUnit(inputs.handleSearchApartment);
  const setSelectedHomeownerName = useUnit(inputs.setSelectedHomeownerName);
  const updateApartment = useUnit(inputs.handleUpdateApartment);
  const openCreateSealAppointmentModal = useUnit(
    createSealService.inputs.openModal,
  );

  useEffect(() => {
    return inputs.handleApartmentLoaded.watch((apartment) => {
      if (!apartment || apartment.id === Number(id)) return;

      history.push(`/services/seal/apartment/${apartment.id}`);
    }).unsubscribe;
  }, [history, id]);

  return (
    <>
      <ApartmentGate id={Number(id)} />
      <CreateSealContainer />
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
      />
    </>
  );
};
