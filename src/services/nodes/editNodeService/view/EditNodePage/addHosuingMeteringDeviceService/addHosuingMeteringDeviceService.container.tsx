import { useUnit } from 'effector-react';
import { EMagistralType } from 'api/types';
import React from 'react';
import { AddCommonDeviceForm } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EXTREAM_STEP_NUMBER } from './addHosuingMeteringDeviceService.constants';
import { addHosuingMeteringDeviceService } from './addHosuingMeteringDeviceService.model';

const { inputs, outputs } = addHosuingMeteringDeviceService;
const formId = 'add-housing-metering-device-in-edit-node-page';

export const AddHosuingMeteringDeviceContainer = () => {
  const {
    currentFormStep,
    goPrevStep,
    handleClose,
    handleFormComplete,
    isOpen,
    pipeNode,
    requestPayload,
    updateCommonDeviceRequestPayload,
  } = useUnit({
    isOpen: outputs.$isOpen,
    pipeNode: outputs.$pipeNode,
    currentFormStep: outputs.$currentFormStep,
    requestPayload: outputs.$requestPayload,
    handleClose: inputs.closeModal,
    goPrevStep: inputs.goPrevStep,
    handleFormComplete: inputs.handleFormComplete,
    updateCommonDeviceRequestPayload: inputs.updateCommonDeviceRequestPayload,
  });

  const submitBtnText =
    currentFormStep === EXTREAM_STEP_NUMBER ? 'Добавить' : 'Далее';
  const cancelBtnText = currentFormStep === 0 ? 'Отмена' : 'Назад';
  const onCancel = currentFormStep === 0 ? handleClose : goPrevStep;

  return (
    <FormModal
      title={<>Добавление нового прибора</>}
      form={
        pipeNode && (
          <AddCommonDeviceForm
            requestPayload={requestPayload || {}}
            currentFormStep={currentFormStep}
            formId={formId}
            configuration={pipeNode.configuration}
            handleFormComplete={handleFormComplete}
            updateRequestPayload={updateCommonDeviceRequestPayload}
            communicationPipes={(pipeNode.communicationPipes || []).map(
              (pipe) => ({
                magistral: pipe.magistral as EMagistralType,
                diameter: pipe.diameter || undefined,
                entryNumber: pipe.entryNumber,
                id: String(pipe.id),
                number: pipe.number,
              }),
            )}
          />
        )
      }
      visible={isOpen}
      submitBtnText={submitBtnText}
      cancelBtnText={cancelBtnText}
      onCancel={onCancel}
      formId={formId}
    />
  );
};
