import styled from 'styled-components';

export const GraphFilter = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  max-width: 600px;

  form {
    .ant-picker-input {
      width: 100%;
      input {
        font-size: 14px;
        line-height: 16px;
      }
    }
    .ant-picker {
      padding: 8px 8px 8px 16px;
      border-radius: 4px;
      width: 100%;
    }
  }
`;

export const OpenedFilter = styled.div`
  background: #fff;
  position: absolute;
  z-index: 1000;
  width: 100%;
  box-shadow: var(--shadow);
`;

export const FormBody = styled.div`
  padding: 16px 8px;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 8px;
  background-color: var(--bg);
`;

export const RangeWrapper = styled.div`
  .ant-picker-ranges .ant-picker-preset > .ant-tag-blue {
    color: #1890ff;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
  }

  .ant-picker-ranges .ant-picker-preset > .ant-tag-blue {
    &:hover {
      background: rgba(24, 158, 233, 0.1);
      border-color: #189ee9;
    }

    cursor: pointer;
  }

  div:nth-child(2) {
    position: static !important;
  }

  .ant-picker-dropdown {
    position: static !important;
  }
`;
