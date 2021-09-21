import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ModalTT } from '01/shared/ui/ModalTT';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $confirmModalTitle,
  $isConfirmReadingInputModalOpen,
  closeConfirmReadingCallbackModal,
  executeConfirmReadingCallback,
} from './models';

export const ConfirmReadingValueModal: React.FC = () => {
  const visible = useStore($isConfirmReadingInputModalOpen);
  const title = useStore($confirmModalTitle);

  const header = (
    <Flex>
      <InfoCircleOutlined color="#ffad29" size={20} />
      <Space w={8} />
      <div>Подтвердите действие</div>
    </Flex>
  );

  return (
    <ModalTT
      visible={visible}
      title={header}
      centered
      onCancel={closeConfirmReadingCallbackModal}
      onSubmit={executeConfirmReadingCallback}
    >
      {title}
    </ModalTT>
  );
};
