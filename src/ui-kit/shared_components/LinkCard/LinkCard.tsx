import React, { FC } from 'react';
import { LinkSC, Text, Wrapper } from './LinkCard.styled';
import { LinkCardProps } from './LinkCard.types';

export const LinkCard: FC<LinkCardProps> = ({
  text,
  link,
  showLink = true,
}) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
      {showLink && link && <LinkSC to={link}>Перейти {'>'}</LinkSC>}
    </Wrapper>
  );
};
