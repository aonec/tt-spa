import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ModalTT } from '01/shared/ui/ModalTT';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isConfirmReadingInputModalOpen,
  $onConfirmReadingInputCallback,
} from './models';

export const ConfirmReadingValueModal: React.FC = () => {
  const visible = useStore($isConfirmReadingInputModalOpen);
  const payload = useStore($onConfirmReadingInputCallback);

  if (!payload) return null;

  const header = (
    <Flex>
      <InfoCircleOutlined twoToneColor="#ffad29" />
      <Space />
      <div>Подтвердите действие</div>
    </Flex>
  );

  return <ModalTT visible={visible} title={header}></ModalTT>;
};
