import React from 'react';
import styled, { css } from 'styled-components';
import { Modal } from 'antd';

export const StyledFooter = styled.div.attrs((props) => ({
  form: props.form,
  modal: props.modal,
}))`
  background: #F3F5F6;
  padding: 24px 32px;
  display: flex;
  justify-content:flex-end;
  ${(props) => props.form && css`
    background: none;
    padding: 24px 32px 24px 0;
    justify-content:flex-start;
  `}
  ${(props) => props.modal && css`
    background: #F3F5F6;
    padding: 24px 32px;
    justify-content:flex-end;
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

export default {
  StyledFooter, StyledModal, StyledModalBody,
};

// export const Modal = styled.div`
//   position: fixed;
//   overflow: auto;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: none;
//   z-index: 2;
// `;
//
// export const ModalWrap = styled.div`
//   margin: 100px auto;
//   background: #ffffff;
//   width: 800px;
//   min-height: 384px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;
// `;
//
// export const ModalTop = styled.div`
//   padding: 16px 32px;
// `;
//
// export const ModalBottom = styled.div`
//   padding: 16px 32px;
//   background: #f3f5f6;
//   display: flex;
//   justify-content: flex-end;
// `;
//
// export const ModalMain = styled.div`
//   padding: 24px;
// `;
//
// export const InputWrap = styled.div`
//   padding-top: 16px;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;
//
// export const ModalClose = (props) => {
//   const { getModal } = props;
//
//   const style = {
//     position: 'absolute',
//     cursor: 'pointer',
//     right: '18px',
//     top: '18px',
//   };
//   const ModalShowHide = () => {
//     // console.log(getModal.current);
//     $(getModal.current).css('display', 'none');
//   };
//   return (
//     <Icon style={style} icon="close" color="#272F5A" onClick={ModalShowHide} />
//   );
// };
//
// export default {
//   Modal,
//   ModalWrap,
//   ModalTop,
//   ModalMain,
//   ModalBottom,
//   ModalClose,
//   InputWrap,
// };
