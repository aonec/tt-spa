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

  .ant-select-clear {
    padding: 0px 28px !important;
    height: 30%;
    line-height: 10px !important;
    .anticon {
      line-height: 10px !important;
    }
  }
`;

const SmallSelectStyles = css`
  width: 100%;
`;

export const Select = styled(AntSelect)<{ small?: boolean }>`
  height: ${({ small }) => (small ? '32px' : '48px')};
  width: 100% !important;

  .ant-select-selector {
    height: 100% !important;
    padding: ${({ small }) => (small ? '1px' : '8px')} 16px !important;
    border-radius: 4px !important;
  }

  .ant-select-arrow {
    padding: ${({ small }) => (small ? '0px' : ' 0 8px')} !important;

    ${({ suffixIcon }: { suffixIcon?: React.ReactNode }) =>
      suffixIcon ? selectIconStyles : ''}
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
      padding: ${({ small }) => (small ? '4px' : '8px')} 24px !important;
      margin: 0 !important;

      &:hover {
        background: #189ee9 !important;
        color: white;
      }
    }
  }

  ${({ small }) => !small && FormSelectStyles}
  ${({ small }) => small && SmallSelectStyles};
`;
