import React from 'react';
import styled, { css } from 'styled-components';
import { Modal } from 'antd';

export const StyledFooter = styled.div.attrs((props) => ({
  form: props.form,
  modal: props.modal,
  left: props.left,
  right: props.right,
}))`
  position: relative;
  background: #f3f5f6;
  padding: 24px 32px;
  display: flex;
  justify-content: flex-end;
  ${(props) =>
    props.form &&
    css`
      background: none;
      padding: 24px 32px 24px 0;
      justify-content: flex-start;
    `}
  ${(props) =>
    props.modal &&
    css`
      background: #f3f5f6;
      padding: 24px 32px;
      justify-content: flex-end;
    `}
  ${(props) =>
    props.left &&
    css`
      background: none;
      padding: 24px 0;
      justify-content: flex-start;
    `}
  ${(props) =>
    props.right &&
    css`
      background: none;
      padding: 24px 0;
      justify-content: flex-end;
    `}
`;

export const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

export const StyledModalHeader = styled.h2`
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const StyledModalBody = styled.div`
  padding: 12px 32px;
`;

export const StyledFormPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const styles = {
  w49: {
    width: '49%',
  },
  w100: {
    width: '100%',
  },
};

export default {
  StyledFooter,
  StyledModal,
  StyledModalBody,
  StyledFormPage,
  styles,
};
