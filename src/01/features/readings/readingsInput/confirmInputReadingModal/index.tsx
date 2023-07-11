import { Flex } from '01/shared/ui/Layout/Flex';
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
import { FormModal } from 'ui-kit/Modals/FormModal';

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
    <FormModal
      formId="confirm-reading-value-modal"
      visible={visible}
      title={header}
      centered
      onCancel={executeCancelReadingCallback}
      onSubmit={executeConfirmReadingCallback}
      form={<TextWrap>{title}</TextWrap>}
    />
  );
};

const HeaderTitle = styled.div`
  color: gray;
`;

const TextWrap = styled.div`
  font-size: 18px;
`;
