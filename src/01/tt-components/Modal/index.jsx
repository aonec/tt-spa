import React from 'react';
import { Icon } from '01/tt-components';
import styled from 'styled-components';
import $ from 'jquery';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 2;
`;

export const ModalWrap = styled.div`
  margin: 100px auto;
  background: #ffffff;
  width: 800px;
  min-height: 384px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const ModalTop = styled.div`
  padding: 16px 32px;
`;

export const ModalBottom = styled.div`
  padding: 16px 32px;
  background: #f3f5f6;
  display: flex;
  justify-content: flex-end;
`;

export const ModalMain = styled.div`
  padding: 24px;
`;

export const ModalClose = () => {
  const style = {
    position: 'absolute',
    cursor: 'pointer',
    right: '18px',
    top: '18px',
  };
  const ModalShowHide = (event) => {
    console.log(event.target);

    // console.log($(this).attr('someprop'));
    // $(`#${props.id}`).css('display', 'none');
  };
  return (
    <Icon
      style={style}
      icon="close"
      color="#272F5A"
      onClick={(event) => {
        ModalShowHide(event);
      }}
    />
  );
};

export default {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
};
