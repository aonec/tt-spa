import moment from 'moment';
import { DocumentResponse } from 'myApi';
import React, { FC } from 'react';
import {
  ActWrapper,
  BottomInfoWrapper,
  LinkWrapper,
  NumberWrapper,
  Wrapper,
} from './ActCardItem.styled';
import { ActCardItemProps } from './ActCardItem.types';

export const ActCardItem: FC<ActCardItemProps> = ({
  act,
  actTypes,
  handleSaveFile,
}) => {
  const document = act.document;
  const actNumber = act.registryNumber;
  const actType = actTypes.find((filter) => act.actType === filter.key)?.value;

  const jobDate = moment(act.actJobDate).format('DD.MM.YYYY');

  return (
    <Wrapper>
      <NumberWrapper>№{actNumber}</NumberWrapper>
      <ActWrapper>{actType}</ActWrapper>
      <BottomInfoWrapper>
        <NumberWrapper>{jobDate}</NumberWrapper>
        {document && (
          <LinkWrapper
            onClick={() => handleSaveFile(document as DocumentResponse)}
          >
            {'Перейти >'}{' '}
          </LinkWrapper>
        )}
      </BottomInfoWrapper>
    </Wrapper>
  );
};
