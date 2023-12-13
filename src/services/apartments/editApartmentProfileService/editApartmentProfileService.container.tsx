import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editApartmentProfileService } from './editApartmentProfileService.model';
import { EditApartmentPage } from './view/EditApartmentPage';

const { inputs, outputs, gates, forms } = editApartmentProfileService;
const { ApartmentGate } = gates;

export const EditApartmentProfileContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const updateApartmentSuccess = inputs.updateApartmentSuccess;

  const {
    apartment,
    isLoading,
    isUpdatingApartmentLoading,
    setTabSection,
    tabSection,
  } = useUnit({
    setTabSection: inputs.setTabSection,
    apartment: outputs.$apartment,
    isLoading: outputs.$isLoading,
    tabSection: outputs.$tabSection,
    isUpdatingApartmentLoading: outputs.$isUpdatingApartmentLoading,
  });
  const history = useHistory();

  useEffect(() => {
    return updateApartmentSuccess.watch(() => {
      history.goBack();
    }).unsubscribe;
  }, [updateApartmentSuccess, history]);

  return (
    <>
      {apartmentId && <ApartmentGate apartmentId={Number(apartmentId)} />}
      <EditApartmentPage
        tabSection={tabSection}
        setTabSection={setTabSection}
        apartment={apartment}
        isLoading={isLoading}
        isUpdatingApartmentLoading={isUpdatingApartmentLoading}
        commonDataForm={forms.editApartmentCommonInfoForm}
      />
    </>
  );
};
