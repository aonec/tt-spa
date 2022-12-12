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
  isTopMargin?: boolean;
  isGhost?: boolean;
}

export const PageHeader: FC<Props> = ({ title, contextMenu, isTopMargin, isGhost }) => {
  return (
    <PageHeaderStyled isTopMargin={isTopMargin}>
      <PageTitle isGhost={isGhost}>{title}</PageTitle>
      {contextMenu && <ContextMenuButton {...contextMenu} />}
    </PageHeaderStyled>
  );
};

const PageHeaderStyled = styled.div<{ isTopMargin?: boolean }>`
  display: flex;
  align-items: center;
  margin: ${({ isTopMargin }) => (isTopMargin ? '25px 0' : '5px 0')};
  justify-content: space-between;
`;
