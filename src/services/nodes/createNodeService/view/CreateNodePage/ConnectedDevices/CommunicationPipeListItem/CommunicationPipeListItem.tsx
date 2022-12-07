import React, { FC } from 'react';
import { MagistralsDisctionary } from 'dictionaries';
import {
  InfoWrapper,
  MagistralLabel,
  PipeNumber,
  Wrapper,
} from './CommunicationPipeListItem.styled';
import { CommunicationPipeListItemProps } from './CommunicationPipeListItem.types';

export const CommunicationPipeListItem: FC<CommunicationPipeListItemProps> = ({
  pipe,
}) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <div>
          <PipeNumber>№{pipe.number}</PipeNumber> ({pipe.diameter}мм){' '}
        </div>
        <div>
          <MagistralLabel>магистраль:</MagistralLabel>{' '}
          {pipe.magistral && MagistralsDisctionary[pipe.magistral]}
        </div>
      </InfoWrapper>
    </Wrapper>
  );
};
