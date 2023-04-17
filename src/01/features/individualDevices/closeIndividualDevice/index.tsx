import { Flex } from '01/shared/ui/Layout/Flex';
import { Header, StyledModal } from '01/shared/ui/Modal/Modal';
import { Form } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { closingReasons } from '../switchIndividualDevice/components/stages/BaseInfoStage';
import {
  $closingIndividualDevice,
  $isCloseIndividualDeviceModalOpen,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceForm,
  closeIndividualDeviceFx,
} from './models';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';
import { Select } from 'ui-kit/Select';
import { DatePicker } from 'ui-kit/DatePicker';

export const CloseIndividualDeviceModal = () => {
  const visible = useStore($isCloseIndividualDeviceModalOpen);

  const onCancel = () => closeClosingIndividualDeviceModalButtonClicked();

  const { submit: onSubmit, fields } = useForm(closeIndividualDeviceForm);

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
          <Flex style={{ justifyContent: 'flex-end' }}>
            <Button type="ghost" onClick={onCancel}>
              Отмена
            </Button>
            <Button
              type="danger"
              onClick={() => onSubmit()}
              disabled={pendingSave}
              isLoading={pendingSave}
            >
              Снять прибор с учета
            </Button>
          </Flex>
        </Footer>
      }
    >
      <Grid style={{ width: '100%', marginBottom: -5 }}>
        <Form.Item
          label="Дата снятия прибора с учета"
          style={{ width: '100%' }}
        >
          <DatePicker
            style={{ borderRadius: '4px', width: '100%' }}
            value={
              fields.closingDate.value ? moment(fields.closingDate.value) : null
            }
            onChange={(value) =>
              value && fields.closingDate.onChange(value?.toISOString(true))
            }
            format="DD.MM.YYYY"
            disabledDate={(current) => {
              return current && current > moment().endOf('day');
            }}
          />
          <ErrorMessage>
            {fields.closingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Причина зыкрытия" style={{ width: '100%' }}>
          <Select
            placeholder="Выберите причину закрытия"
            value={fields.closingReason.value || undefined}
            onChange={fields.closingReason.onChange as any}
          >
            {Object.entries(closingReasons).map(([key, elem]) => (
              <Select.Option value={key} key={key}>
                {elem}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>
            {fields.closingReason.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
      </Grid>

      <DocumentsUploadContainer
        uniqId="close-individual-device"
        label="Добавьте акт снятия прибора с учета"
        type={EDocumentType.DeviceClosingAct}
        onChange={fields.documentIds.onChange}
        documents={fields.documentIds.value}
        max={6}
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
