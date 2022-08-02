import React, { memo } from 'react';
import styled from 'styled-components';
import { CheckIcon, SwitchIcon } from '../../../../../../../ui-kit/icons';
import { Space } from '../../../../../../shared/ui/Layout/Space/Space';

type WrapperProps = {
  active?: boolean;
};

type ActionButtonProps = {
  active?: boolean;
  type: 'switch' | 'check';
  onClick: () => void;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  transition: 0.3s;
  padding: 16px 0;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 500;
  color: #272f5aee;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    border-color: #189ee9;
  }

  border: ${(props) => `1px solid ${props.active ? '#189ee9' : '#dcdee4'}`};
  box-shadow: ${(props) => (props.active ? '0 4px 8px 0 #189ee955' : 'none')};
`;

const IconLookup = {
  switch: <SwitchIcon />,
  check: <CheckIcon />,
};

const TextLookup = {
  switch: 'Замена прибора',
  check: 'Поверка прибора',
};

export const ActionButton = memo(
  ({ active = false, onClick, type }: ActionButtonProps) => {
    return (
      <Wrapper onClick={onClick} active={active}>
        {IconLookup[type]}
        <Space />
        {TextLookup[type]}
      </Wrapper>
    );
  }
);
