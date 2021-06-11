import {
  Footer,
  ModalText,
  StyledModal,
  Header,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { useStore } from 'effector-react';
import React from 'react';
import { $staffStatuses, StaffStatusesGate } from '../staffStatuses/models';
import {
  $isEditStaffStatusModalVisible,
  editStaffStatusCancelButtonClicked,
} from './models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Form, Select as AntdSelect, DatePicker as AntdDatePicker } from 'antd';
import { Option } from 'antd/lib/mentions';
import styled from 'styled-components';
import { StaffStatus } from '../../displayStaff/models/components/StaffStatus';

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
            <Select>
              {staffStatuses?.map((elem) => (
                <Option value={elem.key}>
                  {<StaffStatus status={elem.key as any} />}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Период" style={{ width: '100%' }}>
            <RangePicker />
          </Form.Item>
        </Flex>
      </ModalText>
    </StyledModal>
  );
};
