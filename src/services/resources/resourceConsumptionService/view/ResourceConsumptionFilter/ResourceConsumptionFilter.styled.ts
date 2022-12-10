import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';
import { TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  width: 340px;
  height: fit-content;
  margin-left: 16px;

  box-shadow: 0 4px 4px rgba(0, 0, 20, 0.16);
`;

export const ContentWrapper = styled.div`
  padding: 16px;
`;

export const TitleText = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
`;

export const FormWrapper = styled.div`
  margin-top: 16px;
  .ant-select-selector {
    box-shadow: none;
  }
`;

export const DatePickerSC = styled(DatePicker)`
  height: 32px;
  * {
    font-size: 14px !important;
    line-height: 1;
  }
  input {
    text-transform: capitalize;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  background-color: #f3f5f6;
`;

export const AdditionalAddressWrapper = styled.div`
  color: #189ee9;
  font-size: 16px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
  margin-left: 8px;
`;
