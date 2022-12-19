import React, { ReactNode } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import {
  ContextMenuButton,
  ContextMenuButtonProps,
} from '../ContextMenuButton';
import { PageTitle } from '../Title';

interface Props {
  title: ReactNode;
  contextMenu?: ContextMenuButtonProps;
  isGhost?: boolean;
}

export const PageHeader: FC<Props> = ({ title, contextMenu, isGhost }) => {
  return (
    <PageHeaderStyled>
      <PageTitle isGhost={isGhost}>{title}</PageTitle>
      {contextMenu && <ContextMenuButton {...contextMenu} />}
    </PageHeaderStyled>
  );
};

const PageHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;
