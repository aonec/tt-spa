import { FC } from 'react';
import { Content, Title, Wrapper } from './OptionPanelButton.styled';
import { Props } from './OptionPanelButton.types';

export const OptionPanelButton: FC<Props> = ({
  isActive = false,
  title,
  children,
  onClick,
}) => {
  return (
    <Wrapper isActive={isActive} onClick={onClick}>
      <Content>{children}</Content>
      <Title>{title}</Title>
    </Wrapper>
  );
};
