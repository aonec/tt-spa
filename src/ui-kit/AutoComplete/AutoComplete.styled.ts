import { AutoComplete as AutoCompleteAntD } from 'antd';
import styled from 'styled-components';

export const AutoComplete = styled(AutoCompleteAntD)<{ small?: boolean }>`
  height: ${({ small }) => (small ? '32px' : '48px')} !important;

  .ant-select-selector {
    height: 100% !important;
    border-radius: 4px !important;
    padding: ${({ small }) => (small ? '2px' : '8px')} 16px !important;

    .ant-select-selection-search .ant-select-selection-search-input {
      padding: 0px;
      margin: ${({ small }) => (small ? '0px' : '8px')} 4px !important;
    }
  }
`;
