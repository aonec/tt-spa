import React, { FC } from 'react';
import { Wrapper } from './ApplicationInfoBlock.styled';
import { ApplicationInfoBlockProps } from './ApplicationInfoBlock.types';
import { ApplicationBaseInfo } from './ApplicationBaseInfo';
import { BrigadeInfo } from './BrigadeInfo';

export const ApplicationInfoBlock: FC<ApplicationInfoBlockProps> = ({
  applicationInfo,
}) => {
  return (
    <Wrapper>
      <ApplicationBaseInfo applicationInfo={applicationInfo} />
      <BrigadeInfo />
    </Wrapper>
  );
};
