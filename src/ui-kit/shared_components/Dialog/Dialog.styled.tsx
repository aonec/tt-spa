import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledDialog = styled(Modal)`
  .ant-modal-header {
    padding: 16px 32px 32px 32px;
  }

  .ant-modal-body {
    display: none;
  }

  .ant-modal-footer {
    background-color: #f3f5f6;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 24px 32px;
    font-weight: 700;
  }

  .ant-modal-close-x {
    color: #272f5a;
  }
`;

export const TitleText = styled.div`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
`;
