import styled from 'styled-components';
import {
  Form,
  Input as InputAntd,
  Select as SelectAntd,
  DatePicker as DatePickerAntd,
} from 'antd';

const Input = styled(InputAntd)`
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  padding: 0px 16px;
`;

const Select = styled(SelectAntd)`
  height: 48px;

  .ant-select-selector {
    height: 100% !important;
    padding: 8px 16px !important;
    border-radius: 4px !important;
  }

  .ant-picker-input {
    input {
      font-size: 16px;
      line-height: 32px;
    }
  }

  .ant-select-arrow {
    padding: 0 28px !important;
  }

  .ant-select-item {
    margin: 0 !important;
    padding: 0 !important;

    &:hover {
      background: #189ee9 !important;
      color: white;
    }

    .ant-select-item-option-content {
      background: white;
      padding: 8px 24px !important;
      margin: 0 !important;

      &:hover {
        background: #189ee9 !important;
        color: white;
      }
    }
  }
`;

export const Item = Form.Item;

export const DatePicker = styled(DatePickerAntd)`
  height: 48px;
  width: 100%;
  border-radius: 4px;

  .ant-picker-range {
    height: 100% !important;
    padding: 8px 24px !important;

    span {
      font-size: 16px;
      line-height: 32px;
    }
  }
`;

export const FormFields = {
  Item,
  Input,
  Select,
  DatePicker,
};
