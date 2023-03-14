import { Footer, StyledModal, Header } from '01/shared/ui/Modal/Modal';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $staffStatuses,
  StaffStatusesGate,
} from '../displayStaffStatuses/models';
import {
  $isEditStaffStatusModalVisible,
  $isEditStaffStatusRequestFailed,
  editStaffStatusCancelButtonClicked,
  editStaffStatusForm,
  editStaffStatusFx,
} from './models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Form, Select as AntdSelect, DatePicker as AntdDatePicker } from 'antd';
import styled from 'styled-components';
import { StaffStatus } from '../../displayStaff/models/components/StaffStatus';
import { useForm } from 'effector-forms';
import { EOrganizationUserWorkingStatusType } from 'myApi';
import moment from 'moment';
import { ErrorMessage } from '01/features/contractors/addContractors';
import { ErrorAlert } from '01/_components/Alert';
import { Button } from 'ui-kit/Button';

const Select = styled(AntdSelect)`
  .ant-select-selector {
    border-radius: 4px !important;
    height: 48px !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-placeholder {
    transform: translateY(6px);
  }
`;

const RangePicker = styled(AntdDatePicker.RangePicker)`
  width: 100%;
  height: 48px;
  border-radius: 4px;
`;

const getRangeValue = (
  start: string | null,
  end: string | null,
): [moment.Moment, moment.Moment] | undefined => {
  if (start && end) return [moment(start), moment(end)];
};

export const EditStaffStatusModal: React.FC = () => {
  const visible = useStore($isEditStaffStatusModalVisible);
  const staffStatuses = useStore($staffStatuses);
  const pending = useStore(editStaffStatusFx.pending);
  const isEditStatusFailed = useStore($isEditStaffStatusRequestFailed);

  const { fields, submit } = useForm(editStaffStatusForm);

  const onCancel = () => editStaffStatusCancelButtonClicked();
  const onSubmit = () => submit();

  return (
    <StyledModal
      width={800}
      visible={visible}
      onCancel={onCancel}
      title={<Header>Статус сотрудника</Header>}
      footer={
        <Footer>
          <Button type="ghost" onClick={onCancel}>
            Отмена
          </Button>
          <Button onClick={onSubmit} disabled={pending} isLoading={pending}>
            Изменить статус
          </Button>
        </Footer>
      }
    >
      <StaffStatusesGate />
      <Flex>
        <ErrorAlert
          show={isEditStatusFailed}
          message="Не удалось изменить статус"
        />
        <Form.Item
          label="Текущий статус"
          style={{ marginRight: '20px', width: '100%' }}
        >
          <Select
            value={fields.type.value || undefined}
            onChange={(value) =>
              fields.type.onChange(value as EOrganizationUserWorkingStatusType)
            }
            placeholder="Выберите статус"
          >
            {staffStatuses?.map((elem) => (
              <Select.Option value={elem.key!} key={elem.key}>
                {<StaffStatus status={elem.key as any} />}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>
            {fields.type.errorText({
              required: 'Это поле обязательно',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Период" style={{ width: '100%' }}>
          <RangePicker
            value={getRangeValue(fields.startDate.value, fields.endDate.value)}
            format="DD.MM.YYYY"
            onChange={(value) => {
              if (!value) {
                fields.startDate.onChange(null);
                fields.endDate.onChange(null);
                return;
              }

              const [startDate, endDate] = value as [
                moment.Moment,
                moment.Moment,
              ];

              fields.startDate.onChange(startDate.toISOString(true));
              fields.endDate.onChange(endDate.toISOString(true));
            }}
          />
          <ErrorMessage>
            {fields.startDate.errorText({
              required: 'Это поле обязательно',
            })}
          </ErrorMessage>
        </Form.Item>
      </Flex>
    </StyledModal>
  );
};
