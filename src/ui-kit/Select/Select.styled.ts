import { Select as AntSelect } from 'antd';
import styled, { css } from 'styled-components';

const selectIconStyles = css`
  svg {
    transform: translateY(-8px);
    height: 16px;
    width: 16px;
  }
`;

const FormSelectStyles = css`
  * {
    font-size: 16px !important;
    line-height: 32px;
  }

  .ant-select-selection-search-input {
    transform: translate(6px, 8px);
  }

  .ant-select-clear {
    padding: 0px 28px !important;
    height: 30%;
    line-height: 10px !important;
    .anticon {
      line-height: 10px !important;
    }
  }
`;

export const Select = styled(AntSelect)<{ search?: boolean }>`
  height: ${({ search }) => (search ? '32px' : '48px')};

  .ant-select-selector {
    height: 100% !important;
    padding: ${({ search }) => (search ? '0px' : '8px')} 16px !important;
    border-radius: 4px !important;
  }

  .ant-select-arrow {
    padding: ${({ search }) => (search ? '0px' : ' 0 28px')} !important;

    ${({ suffixIcon }) => suffixIcon && selectIconStyles}
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
      padding: ${({ search }) => (search ? '4px' : '8px')} 24px !important;
      margin: 0 !important;

      &:hover {
        background: #189ee9 !important;
        color: white;
      }
    }
  }

  ${({ search }) => !search && FormSelectStyles}
`;
