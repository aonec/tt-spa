import React, { FC } from 'react';
import {
  ContentWrapper,
  IconsWrapper,
  PencilIconSC,
  Wrapper,
  CloseIconSC,
} from './SelectedEntityPanel.styled';
import { SelectedEntityPanelProps } from './SelectedEntityPanel.types';

export const SelectedEntityPanel: FC<SelectedEntityPanelProps> = ({
  children,
  onRemove,
  onEdit,
}) => {
  return (
    <Wrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <IconsWrapper>
        {onEdit && <PencilIconSC onClick={onEdit} />}
        {onRemove && <CloseIconSC onClick={onRemove} />}
      </IconsWrapper>
    </Wrapper>
  );
};
