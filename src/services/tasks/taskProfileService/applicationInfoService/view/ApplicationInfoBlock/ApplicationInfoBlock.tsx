import React, { FC } from 'react';
import { TitleWrapper, Wrapper } from './ApplicationInfoBlock.styled';
import { ApplicationInfoBlockProps } from './ApplicationInfoBlock.types';
import { ApplicationBaseInfo } from './ApplicationBaseInfo';
import { BrigadeInfo } from './BrigadeInfo';

export const ApplicationInfoBlock: FC<ApplicationInfoBlockProps> = ({
  applicationInfo,
  address,
  addressLinkPath,
}) => {
  const brigadeInfo = applicationInfo?.brigade || [];

  return (
    <Wrapper>
      <TitleWrapper>Информация о задаче</TitleWrapper>
      <ApplicationBaseInfo
        applicationInfo={applicationInfo}
        address={address}
        addressLinkPath={addressLinkPath}
      />
      <BrigadeInfo brigadeInfo={brigadeInfo} />
    </Wrapper>
  );
};
