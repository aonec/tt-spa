import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { Header, ModalText, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT, DatePickerTT } from '01/tt-components';
import { Form } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import {
  $isCloseIndividualDeviceModalOpen,
  closeClosingIndividualDeviceModalButtonClicked,
} from './models';

export const CloseIndividualDeviceModal = () => {
  const visible = useStore($isCloseIndividualDeviceModalOpen);

  const onCancel = () => closeClosingIndividualDeviceModalButtonClicked();

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={800}
      title={
        <>
          <Header>Вы действительно хотите закрыть прибор?</Header>
          <UnderModalTitleText>
            Показания по прибору будут приниматься, но они не учитываются для
            расчёта оплаты за потребление
          </UnderModalTitleText>
        </>
      }
      footer={
        <Footer>
          <ButtonTT color="white">Отмена</ButtonTT>
          <ButtonTT color="red">Снять прибор с учета</ButtonTT>
        </Footer>
      }
    >
      <ModalText>
        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT style={{ borderRadius: '4px' }} />
        </Form.Item>
        <DragAndDrop
          uniqId="close-individual-device"
          fileHandler={() => {}}
          text="Добавьте акт снятия прибора с учета"
        />
      </ModalText>
    </StyledModal>
  );
};

const UnderModalTitleText = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`;
