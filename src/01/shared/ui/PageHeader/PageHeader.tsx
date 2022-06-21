import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import {
  ContextMenuButton,
  ContextMenuButtonProps,
} from '../ContextMenuButton';
import { PageTitle } from '../Title';

interface Props {
  title: string;
  contextMenu?: ContextMenuButtonProps;
}

export const PageHeader: FC<Props> = ({ title, contextMenu }) => {
  return (
    <PageHeaderStyled>
      <PageTitle>{title}</PageTitle>
      {contextMenu && <ContextMenuButton {...contextMenu} />}
    </PageHeaderStyled>
  );
};

const PageHeaderStyled = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;
