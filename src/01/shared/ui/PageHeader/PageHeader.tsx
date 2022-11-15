import React from 'react';
import { FC } from 'react';
import {
  ContextMenuButton,
  ContextMenuButtonProps,
} from '../ContextMenuButton';
import { PageTitle } from '../Title';
import { PageHeaderStyled } from './PageHeader.styled';

interface Props {
  title: string;
  contextMenu?: ContextMenuButtonProps;
}

export const PageHeader: FC<Props> = ({ title, contextMenu, children }) => {
  return (
    <PageHeaderStyled>
      <PageTitle>{title}</PageTitle>
      {contextMenu && <ContextMenuButton {...contextMenu} />}
    </PageHeaderStyled>
  );
};
