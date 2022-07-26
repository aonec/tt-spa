import { useEvent, useStore } from 'effector-react';
import { ENodeCommercialAccountStatus, EResourceType } from '../../api/types';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { nodeCommercialRegistrationService } from './nodeCommercialRegistrationService.models';
import { RegisterNodeOnCommercialAccountingForm } from './view/RegisterNodeOnCommercialAccountingForm';

export const RegisterNodeOnCommercialAccountingModalContainer: React.FC<{
  nodeStatus: ENodeCommercialAccountStatus | undefined;
  resource: EResourceType;
}> = ({ nodeStatus, resource }) => {
  const isRegistered = nodeStatus === 'Registered';
  const { inputs, outputs } = nodeCommercialRegistrationService;
  const isOpen = useStore(outputs.$isModalOpen);

  const loading = useStore(outputs.$isLoading);

  const handleClose = useEvent(inputs.closeModal);

  const handleSubmitUnset = useEvent(inputs.unsetNodeOnCommercialAccounting);
  const handleSubmit = useEvent(inputs.registerNodeOnCommercialAccounting);

  const formId = 'register-node-on-commertion-accounting-form';

  return (
    <FormModal
      title={
        isRegistered
          ? 'Снятие узла с коммерческого учёта'
          : 'Постановка узла на коммерческий учёт'
      }
      visible={isOpen}
      onCancel={() => handleClose()}
      loading={loading}
      submitBtnText={isRegistered ? 'Снять с учета' : 'Поставить на учета'}
      form={
        <RegisterNodeOnCommercialAccountingForm
          handleSubmit={handleSubmit}
          handleSubmitUnset={handleSubmitUnset}
          isRegistered={isRegistered}
          resource={resource}
          formId={formId}
        />
      }
      formId={formId}
      description="После этого данные узла будут использоваться для мониторинга работы
        инженерной системы и расчета платы за потребленный объем ресурса"
    ></FormModal>
  );
};
