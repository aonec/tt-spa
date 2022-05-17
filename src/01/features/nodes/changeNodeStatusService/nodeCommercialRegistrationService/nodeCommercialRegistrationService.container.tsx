import { ModalTT } from '01/shared/ui/ModalTT';
import { useEvent, useStore } from 'effector-react';
import { ENodeCommercialAccountStatus } from 'myApi';
import React from 'react';
import { nodeCommercialRegistrationService } from '.';
import { RegisterNodeOnCommercialAccountingForm } from './view/RegisterNodeOnCommercialAccountingForm';

export const RegisterNodeOnCommercialAccountingModalContainer: React.FC<{
  nodeStatus: ENodeCommercialAccountStatus,
  lastCommercialAccountingDate: string
}> = ({ nodeStatus, lastCommercialAccountingDate }) => {
  const isOpen = useStore(
    nodeCommercialRegistrationService.outputs.$isModalOpen
  );

  const loading = useStore(nodeCommercialRegistrationService.outputs.$loading);

  const handleClose = useEvent(
    nodeCommercialRegistrationService.inputs.closeModal
  );

  const handleSumbit = useEvent(
    nodeCommercialRegistrationService.inputs.registerNodeOnCommercialAccounting
  );

  return (
    <ModalTT
      title={
        nodeStatus === 'Registered'
          ? 'Снятие узла с коммерческого учёта'
          : 'Постановка узла на коммерческий учёт'
      }
      visible={isOpen}
      onCancel={() => handleClose()}
      loading={loading}
      saveBtnText={
        nodeStatus === 'Registered' ? 'Снять с учета' : 'Поставить на учета'
      }
      formId="register-node-on-commertion-accounting-form"
    >
      <div>
        После этого данные узла будут использоваться для мониторинга работы
        инженерной системы и расчета платы за потребленный объем ресурса
      </div>
      <RegisterNodeOnCommercialAccountingForm
        handleSubmit={handleSumbit}
        nodeStatus={nodeStatus}
        lastCommercialAccountingDate={lastCommercialAccountingDate}
      />
    </ModalTT>
  );
};
