import React, { useContext } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

const StyledEditButton = styled(Button).attrs((props) => ({
  form: props.form,
  modal: props.modal,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  ${(props) =>
    props.size == '48' &&
    css`
      width: 48px;
      height: 48px;
    `}

  ${(props) =>
    props.size == '24' &&
    css`
      width: 24px;
      height: 24px;
    `}
`;

export const EditButtonTT = (props) => {
  // console.log('props', props);
  const { menuButtonArr: arr, size } = props;
  function getCurrentColor(color) {
    switch (color) {
      case 'default':
        return 'rgba(39, 47, 90, 0.9)';
      case 'disabled':
        return 'rgba(39, 47, 90, 0.32)';
      case 'black':
        return 'rgba(39, 47, 90, 0.9)';
      case 'red':
        return '#FC525B';
      default:
        return 'rgba(39, 47, 90, 0.9)';
    }
  }

  return (
    <StyledEditButton>
      {/*<StyledMenuButton size={props.size}>*/}
      {/*    <MoreOutlined />*/}
      {/*</StyledMenuButton>*/}
    </StyledEditButton>
  );
};

export default EditButtonTT;
