import { Input as AntInput } from 'antd';
import styled from 'styled-components';

export const Input = styled(AntInput)<{ small?: boolean }>`
  border-radius: 4px;
  height: ${({ small }) => (small ? '32px' : '48px')};
  font-size: ${({ small }) => (small ? '14px' : '16px')};
  padding: 0px 16px;
`;

export const InputWithAddon = styled(AntInput)`
  height: 48px;

  .ant-input-group {
    .ant-input {
      border-radius: 4px 0 0 4px;
      height: 48px;
      font-size: 16px;
      padding: 0px 16px;
    }

    .ant-input-group-addon:last-child {
      padding: 0 15px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #f3f5f6;
    }
  }
`;
