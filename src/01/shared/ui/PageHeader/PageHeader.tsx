import React from 'react';
import { FC } from 'react';
import { ContextMenuButton } from '../ContextMenuButton';
import { PageTitle } from '../Title';
import { ContentWrapper, PageHeaderStyled } from './PageHeader.styled';
import { PageHeaderProps } from './PageHeader.types';

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  contextMenu,
  isGhost,
  children,
  className,
}) => {
  return (
    <PageHeaderStyled className={className}>
      <PageTitle isGhost={isGhost}>{title}</PageTitle>
      <ContentWrapper>
        {children && <div>{children}</div>}
        {contextMenu && <ContextMenuButton {...contextMenu} size="small" />}
      </ContentWrapper>
    </PageHeaderStyled>
  );
};
