import React, { ReactNode } from 'react';
import { FC } from 'react';
import {
  ContextMenuButton,
  ContextMenuButtonProps,
} from '../ContextMenuButton';
import { PageTitle } from '../Title';
import { ContentWrapper, PageHeaderStyled } from './PageHeader.styled';

interface Props {
  title: ReactNode;
  contextMenu?: ContextMenuButtonProps;
  isGhost?: boolean;
  children?: ReactNode;
}

export const PageHeader: FC<Props> = ({
  title,
  contextMenu,
  isGhost,
  children,
}) => {
  return (
    <PageHeaderStyled>
      <PageTitle isGhost={isGhost}>{title}</PageTitle>
      <ContentWrapper>
        {children && <div>{children}</div>}
        {contextMenu && <ContextMenuButton {...contextMenu} />}
      </ContentWrapper>
    </PageHeaderStyled>
  );
};
