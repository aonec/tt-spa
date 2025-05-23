import { AutoComplete as AutoCompleteAntD } from 'antd';
import styled, { css } from 'styled-components';

const FormAutoCompleteStyles = css`
  .ant-select-selection-placeholder {
    line-height: 28px !important;
  }
`;

export const AutoComplete = styled(AutoCompleteAntD)<{ small?: boolean }>`
  height: ${({ small }) => (small ? '32px' : '48px')} !important;

  .ant-select-selector {
    height: 100% !important;
    border-radius: 4px !important;
    padding: ${({ small }) => (small ? '1px' : '5px')} 16px !important;
    font-size: ${({ small }) => (small ? '14px' : '16px')};

    .ant-select-selection-search .ant-select-selection-search-input {
      padding: 0px;
    }

    ${({ small }) => !small && FormAutoCompleteStyles}
  }
`;
