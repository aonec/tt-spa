import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { Flex } from '../Layout/Flex';
import { Space } from '../Layout/Space/Space';
import { ReactComponent as FilerIcon } from './assets/filter.svg';

type Props = {
  handleClose?: () => void;
  handleOpen?: () => void;
  extendedSearchContent: ReactElement;
};

export const ExtendedSearch: FC<Props> = ({ children }) => {
  return (
    <Flex style={{ padding: '0 0 15px' }}>
      <ExtendedSearchButton>
        <FilerIcon />
      </ExtendedSearchButton>
      <Space />
      {children}
    </Flex>
  );
};

const ExtendedSearchButton = styled(Flex)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border: 1px solid #dcdee4;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #189ee9;
    background-color: #189ce91e;
  }
`;
