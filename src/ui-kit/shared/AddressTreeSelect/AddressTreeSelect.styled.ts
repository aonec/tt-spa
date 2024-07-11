import { TreeSelect } from 'ui-kit/TreeSelect';
import styled, { css } from 'styled-components';

const TreeSelectSmallStyles = css`
  height: 32px;

  * {
    font-size: 14px !important;
    line-height: 22px;
  }
  .ant-select-selection-placeholder {
    line-height: 22px;
    padding-left: 0px;
  }
  .ant-select-selection-item {
    padding: 0px;
  }

  .ant-select-selection-search {
    transform: translateY(-6px);
  }

  .ant-select-arrow {
    margin-right: 0px;
  }

  .ant-select-selector {
    padding: 0px 4px !important;
  }

  .ant-select-selection-item-content {
    line-height: 28px;
  }
`;

export const TreeSelectSC = styled(TreeSelect)<{ small: boolean }>`
  ${({ small }) => small && TreeSelectSmallStyles}
`;
