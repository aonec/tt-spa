import { Loader } from '01/components';
import { ErrorMessage } from '01/features/contractors/addContractors';
import { useFilesUpload } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesList } from '01/shared/ui/FilesList';
import { Header, ModalText, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT, DatePickerTT } from '01/tt-components';
import { Form } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import confirm from 'antd/lib/modal/confirm';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import {
  $closingIndividualDevice,
  $isCloseIndividualDeviceModalOpen,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceForm,
  closeIndividualDeviceFx,
} from './models';

export const CloseIndividualDeviceModal = () => {
  const visible = useStore($isCloseIndividualDeviceModalOpen);

  const onCancel = () =>
    confirm({
      title: 'Вы действительно хотите закрыть окно?',
      content: <>данные при этом не сохранятся</>,
      cancelText: 'Отмена',
      okText: 'Да',
      onOk: () =>
        void setTimeout(closeClosingIndividualDeviceModalButtonClicked, 200),
      centered: true,
      closable: true,
    });

  const { submit, fields } = useForm(closeIndividualDeviceForm);

  const { addFile, removeFile, pendingProcessing } = useFilesUpload(
    fields.documentIds.onChange
  );

  const pendingSave = useStore(closeIndividualDeviceFx.pending);

  const device = useStore($closingIndividualDevice);

  return (
    <StyledModal
      centered
      visible={visible}
      onCancel={onCancel}
      width={800}
      title={
        <>
          <Header>
            Вы действительно хотите закрыть прибор {device?.model} (
            {device?.serialNumber})?
          </Header>
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
          <ButtonTT
            color="red"
            onClick={submit}
            disabled={pendingProcessing || pendingSave}
          >
            {pendingSave ? <Loader show={true} /> : 'Снять прибор с учета'}
          </ButtonTT>
        </Footer>
      }
    >
      <ModalText>
        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT
            style={{ borderRadius: '4px' }}
            value={
              fields.clousingDate.value
                ? moment(fields.clousingDate.value)
                : null
            }
            onChange={(value) =>
              value && fields.clousingDate.onChange(value?.toISOString())
            }
            format="DD.MM.YYYY"
          />
          <ErrorMessage>
            {fields.clousingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <FilesList files={fields.documentIds.value} removeFile={removeFile} />
        <DragAndDrop
          style={{ marginTop: 15 }}
          uniqId="close-individual-device"
          fileHandler={(files) => addFile(files[0])}
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
