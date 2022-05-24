import { ModalTT } from '01/shared/ui/ModalTT';
import { useEvent, useStore } from 'effector-react';
import { ENodeCommercialAccountStatus, EResourceType } from 'myApi';
import React from 'react';
import { nodeCommercialRegistrationService } from './nodeCommercialRegistrationService.models';
import { RegisterNodeOnCommercialAccountingForm } from './view/RegisterNodeOnCommercialAccountingForm';

export const RegisterNodeOnCommercialAccountingModalContainer: React.FC<{
  nodeStatus: ENodeCommercialAccountStatus | undefined;
  resource: EResourceType;
}> = ({ nodeStatus, resource}) => {
  const status = nodeStatus === 'Registered';
  const isOpen = useStore(
    nodeCommercialRegistrationService.outputs.$isModalOpen
  );

  const loading = useStore(nodeCommercialRegistrationService.outputs.$loading);

  const handleClose = useEvent(
    nodeCommercialRegistrationService.inputs.closeModal
  );

  const handleSumbitUnset = useEvent(
    nodeCommercialRegistrationService.inputs.unsetNodeOnCommercialAccounting
  );
  const handleSumbit = useEvent(
    nodeCommercialRegistrationService.inputs.registerNodeOnCommercialAccounting
  );

  return (
    <ModalTT
      title={
        status
          ? 'Снятие узла с коммерческого учёта'
          : 'Постановка узла на коммерческий учёт'
      }
      visible={isOpen}
      onCancel={() => handleClose()}
      loading={loading}
      saveBtnText={status ? 'Снять с учета' : 'Поставить на учета'}
      formId="register-node-on-commertion-accounting-form"
    >
      <div>
        После этого данные узла будут использоваться для мониторинга работы
        инженерной системы и расчета платы за потребленный объем ресурса
      </div>
      <RegisterNodeOnCommercialAccountingForm
        handleSubmit={handleSumbit}
        handleSubmitUnset={handleSumbitUnset}
        status={status}
        resource={resource}
      />
    </ModalTT>
  );
};
