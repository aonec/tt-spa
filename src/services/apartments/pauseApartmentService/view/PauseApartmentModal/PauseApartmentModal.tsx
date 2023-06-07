import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Props } from './PauseApartmentModal.types';
import { PauseApartmentForm } from './PauseApartmentForm';

export const PauseApartmentModal: FC<Props> = ({
  problemDevices,
  isLoading,
  isOpen,
  apartmentId,
  pauseApartmentModalCancelButtonClicked,
  pauseApartment,
}) => {
  return (
    <>
      <FormModal
        formId="pause-apartment-form"
        submitBtnText="Поставить на паузу"
        visible={isOpen}
        title="Постановка квартиры на паузу"
        onCancel={pauseApartmentModalCancelButtonClicked}
        loading={isLoading}
        form={
          <PauseApartmentForm
            problemDevices={problemDevices}
            apartmentId={apartmentId}
            pauseApartment={pauseApartment}
          />
        }
      />
    </>
  );
};
