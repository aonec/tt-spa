import { useEvent, useStore } from 'effector-react';
import { EMagistralType } from 'api/myApi';
import React from 'react';
import { AddCommonDeviceForm } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EXTREAM_STEP_NUMBER } from './addHosuingMeteringDeviceService.constants';
import { addHosuingMeteringDeviceService } from './addHosuingMeteringDeviceService.model';

const { inputs, outputs } = addHosuingMeteringDeviceService;
const formId = 'add-housing-metering-device-in-edit-node-page';

export const AddHosuingMeteringDeviceContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const pipeNode = useStore(outputs.$pipeNode);
  const currentFormStep = useStore(outputs.$currentFormStep);
  const requestPayload = useStore(outputs.$requestPayload);

  const handleClose = useEvent(inputs.closeModal);
  const goPrevStep = useEvent(inputs.goPrevStep);
  const handleFormComplete = useEvent(inputs.handleFormComplete);
  const updateCommonDeviceRequestPayload = useEvent(
    inputs.updateCommonDeviceRequestPayload,
  );

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
