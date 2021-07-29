import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Header, ModalText, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT, DatePickerTT } from '01/tt-components';
import { Form } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import {
  $isCloseIndividualDeviceModalOpen,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceForm,
} from './models';

export const CloseIndividualDeviceModal = () => {
  const visible = useStore($isCloseIndividualDeviceModalOpen);

  const onCancel = () => closeClosingIndividualDeviceModalButtonClicked();

  const { submit, fields } = useForm(closeIndividualDeviceForm);

  console.log(fields.documentIds.value);

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
          <ButtonTT color="white" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color="red" onClick={submit}>
            Снять прибор с учета
          </ButtonTT>
        </Footer>
      }
    >
      <ModalText>
        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT style={{ borderRadius: '4px' }} format="DD.MM.YYYY" />
        </Form.Item>
        <FilesUpload
          uniqId="close-individual-device"
          onChange={(files) =>
            fields.documentIds.onChange(
              files.map((file) => file.fileResponse?.id!)
            )
          }
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
