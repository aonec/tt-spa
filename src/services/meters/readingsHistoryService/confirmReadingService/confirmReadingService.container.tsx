import { Flex } from '01/shared/ui/Layout/Flex';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $confirmModalTitle,
  $isConfirmReadingInputModalOpen,
  executeCancelReadingCallback,
  executeConfirmReadingCallback,
} from './models';
import { ExclamationCircle } from 'react-bootstrap-icons';
import { Space } from '01/shared/ui/Layout/Space/Space';
import styled from 'styled-components';

export const ConfirmReadingValueModal: React.FC = () => {
  const visible = useStore($isConfirmReadingInputModalOpen);
  const title = useStore($confirmModalTitle);

  const header = (
    <Flex>
      <ExclamationCircle color="#ffac27" />
      <Space />
      <HeaderTitle>Подтвердите действие</HeaderTitle>
    </Flex>
  );

  return (
    <ModalTT
      visible={visible}
      title={header}
      centered
      onCancel={executeCancelReadingCallback}
      onSubmit={executeConfirmReadingCallback}
    >
      <TextWrap>{title}</TextWrap>
    </ModalTT>
  );
};

const HeaderTitle = styled.div`
  color: gray;
`;

const TextWrap = styled.div`
  font-size: 18px;
`;
