import {
  Footer,
  ModalText,
  StyledModal,
  Header,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $staffStatuses,
  StaffStatusesGate,
} from '../displayStaffStatuses/models';
import {
  $isEditStaffStatusModalVisible,
  editStaffStatusCancelButtonClicked,
  editStaffStatusForm,
} from './models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Form, Select as AntdSelect, DatePicker as AntdDatePicker } from 'antd';
import { Option } from 'antd/lib/mentions';
import styled from 'styled-components';
import { StaffStatus } from '../../displayStaff/models/components/StaffStatus';
import { useForm } from 'effector-forms';
import { EManagingFirmUserWorkingStatusType } from 'myApi';
import moment from 'moment';

const Select = styled(AntdSelect)`
  .ant-select-selector {
    border-radius: 4px !important;
    height: 48px !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;
const RangePicker = styled(AntdDatePicker.RangePicker)`
  width: 100%;
  height: 48px;
  border-radius: 4px;
`;

export const EditStaffStatusModal: React.FC = () => {
  const visible = useStore($isEditStaffStatusModalVisible);
  const staffStatuses = useStore($staffStatuses);

  const onCancel = () => editStaffStatusCancelButtonClicked();

  const form = useForm(editStaffStatusForm);

  return (
    <StyledModal
      width={800}
      visible={visible}
      onCancel={onCancel}
      title={<Header>Статус сотрудника</Header>}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color="blue" key="submit">
            Изменить статус
          </ButtonTT>
        </Footer>
      }
    >
      <StaffStatusesGate />
      <ModalText>
        <Flex>
          <Form.Item
            label="Текущий статус"
            style={{ marginRight: '20px', width: '100%' }}
          >
            <Select
              value={form.fields.type.value || undefined}
              onChange={(value) =>
                form.fields.type.onChange(
                  value as EManagingFirmUserWorkingStatusType
                )
              }
            >
              {staffStatuses?.map((elem) => (
                <Option value={elem.key} key={elem.key}>
                  {<StaffStatus status={elem.key as any} />}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Период" style={{ width: '100%' }}>
            <RangePicker
              value={
                form.fields.startDate.value && form.fields.endDate.value
                  ? [
                      moment(form.fields.startDate.value),
                      moment(form.fields.endDate.value),
                    ]
                  : undefined
              }
              format="DD.MM.YYYY"
              onChange={(value) => {
                const [startDate, endDate] = value as [
                  moment.Moment,
                  moment.Moment
                ];

                form.fields.startDate.onChange(startDate.toISOString());
                form.fields.endDate.onChange(endDate.toISOString());
              }}
            />
          </Form.Item>
        </Flex>
      </ModalText>
    </StyledModal>
  );
};
