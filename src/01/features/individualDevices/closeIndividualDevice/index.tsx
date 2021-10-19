import { Loader } from '01/components';
import { ErrorMessage } from '01/features/contractors/addContractors';
import { useFilesUpload } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesList } from '01/shared/ui/FilesList';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Header, ModalText, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT, DatePickerTT } from '01/tt-components';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form, Select } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import confirm from 'antd/lib/modal/confirm';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { closingReasons } from '../switchIndividualDevice/components/stages/BaseInfoStage';
import {
  $closingIndividualDevice,
  $isCloseIndividualDeviceModalOpen,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceForm,
  closeIndividualDeviceFx,
} from './models';

export const CloseIndividualDeviceModal = () => {
  const visible = useStore($isCloseIndividualDeviceModalOpen);

  const onCancel = () => closeClosingIndividualDeviceModalButtonClicked();

  const { submit, fields } = useForm(closeIndividualDeviceForm);

  const { addFile, removeFile, pendingProcessing } = useFilesUpload(
    fields.documentIds.onChange,
    'DeviceClosingAct'
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
            {pendingSave ? <Loader show /> : 'Снять прибор с учета'}
          </ButtonTT>
        </Footer>
      }
    >
      <Grid style={{ width: '100%', marginBottom: -5 }}>
        <Form.Item
          label="Дата снятия прибора с учета"
          style={{ width: '100%' }}
        >
          <DatePickerTT
            style={{ borderRadius: '4px', width: '100%' }}
            value={
              fields.clousingDate.value
                ? moment(fields.clousingDate.value)
                : null
            }
            onChange={(value) =>
              value && fields.clousingDate.onChange(value?.toISOString(true))
            }
            format="DD.MM.YYYY"
          />
          <ErrorMessage>
            {fields.clousingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Причина замены" style={{ width: '100%' }}>
          <StyledSelect
            placeholder="Выберите причину замены"
            value={fields.closingReason.value || undefined}
            onChange={fields.closingReason.onChange as any}
          >
            {Object.entries(closingReasons).map(([key, elem]) => (
              <Select.Option value={key} key={key}>
                {elem}
              </Select.Option>
            ))}
          </StyledSelect>
          <ErrorMessage>
            {fields.closingReason.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
      </Grid>
      {!!fields.documentIds.value.length && (
        <FilesList files={fields.documentIds.value} removeFile={removeFile} />
      )}
      <DragAndDrop
        style={{ marginTop: !!fields.documentIds.value.length ? 15 : 0 }}
        uniqId="close-individual-device"
        fileHandler={(files) => addFile(files[0])}
        text="Добавьте акт снятия прибора с учета"
      />
    </StyledModal>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const UnderModalTitleText = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`;
