import React, { useMemo } from 'react';
import { workWithIndividualDeviceSubmitActionService } from './workWithIndividualDeviceSubmitActionService.model';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useUnit } from 'effector-react';
import { WorkWithIndividualDeviceType } from '../workWithIndividualDeviceService.types';
import { WorkWithIndividualDeviceSubmitActionForm } from './view/WorkWithIndividualDeviceSubmitActionForm';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';

const { inputs, outputs, forms } = workWithIndividualDeviceSubmitActionService;

export const WorkWithIndividualDeviceSubmitActionContainer = () => {
  const {
    isOpen,
    closeModal,
    handleSubmit,
    typeOfAction,
    contractors,
    mountPlaces,
    individualDevice,
  } = useUnit({
    isOpen: outputs.$isOpen,
    typeOfAction: outputs.$typeOfAction,
    individualDevice: outputs.$individualDevice,
    closeModal: inputs.closeModal,
    handleSubmit: inputs.submit,
    contractors: displayContractorsService.outputs.$contractors,
    mountPlaces:
      individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
  });

  const submitBtnText = useMemo(() => {
    if (typeOfAction === WorkWithIndividualDeviceType.check) {
      return 'Поверить прибор';
    } else if (typeOfAction === WorkWithIndividualDeviceType.reopen) {
      return 'Переоткрыть прибор';
    } else if (typeOfAction === WorkWithIndividualDeviceType.switch) {
      return 'Заменить прибор';
    }
    return 'Подвтердить';
  }, [typeOfAction]);

  const title = useMemo(() => {
    if (typeOfAction === WorkWithIndividualDeviceType.check) {
      return 'Поверка прибора';
    } else if (typeOfAction === WorkWithIndividualDeviceType.reopen) {
      return 'Переоткрытие прибора';
    } else if (typeOfAction === WorkWithIndividualDeviceType.switch) {
      return 'Замена прибора';
    }
    return 'Проверка введеных данных';
  }, [typeOfAction]);

  return (
    <FormModal
      form={
        <>
          {individualDevice && (
            <WorkWithIndividualDeviceSubmitActionForm
              form={forms.deviceInfoForm}
              contractors={contractors}
              mountPlaces={mountPlaces}
              typeOfAction={typeOfAction}
              individualDevice={individualDevice}
            />
          )}
        </>
      }
      formId="work-with-individual-device-submit-action"
      title={title}
      visible={isOpen}
      onCancel={closeModal}
      onSubmit={handleSubmit}
      submitBtnText={submitBtnText}
    />
  );
};
