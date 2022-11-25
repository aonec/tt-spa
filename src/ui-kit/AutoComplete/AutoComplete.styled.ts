import { AutoComplete as AutoCompleteAntD } from 'antd';
import styled from 'styled-components';

export const AutoComplete = styled(AutoCompleteAntD)`
  .ant-select-selector {
    border-radius: 4px !important;
    height: 48px !important;
    padding: 4px 24px !important;

    .ant-select-selection-search .ant-select-selection-search-input {
      height: 42px;
      padding: 6px 12px 0 12px !important;
    }

    .ant-select-selection-placeholder {
      margin-top: 5px;
    }
  }
`;
