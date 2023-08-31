import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Props } from './PauseApartmentModal.types';
import { PauseApartmentForm } from './PauseApartmentForm';

const formId = 'pause-apartment-form';

export const PauseApartmentModal: FC<Props> = ({
  problemDevices,
  isLoading,
  isOpen,
  pauseApartmentModalCancelButtonClicked,
  form,
  apartmentId,
}) => {
  return (
    <>
      <FormModal
        formId={formId}
        submitBtnText="Поставить на паузу"
        visible={isOpen}
        title="Постановка квартиры на паузу"
        onCancel={pauseApartmentModalCancelButtonClicked}
        loading={isLoading}
        form={
          <PauseApartmentForm
            problemDevices={problemDevices}
            form={form}
            formId={formId}
            apartmentId={apartmentId}
          />
        }
      />
    </>
  );
};
