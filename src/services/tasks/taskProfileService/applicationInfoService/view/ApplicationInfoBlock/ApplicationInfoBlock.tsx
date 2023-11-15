import React, { FC } from 'react';
import { ButtonSC, TitleWrapper } from './ApplicationInfoBlock.styled';
import { ApplicationInfoBlockProps } from './ApplicationInfoBlock.types';
import { ApplicationBaseInfo } from './ApplicationBaseInfo';
import { BrigadeInfo } from './BrigadeInfo';

export const ApplicationInfoBlock: FC<ApplicationInfoBlockProps> = ({
  applicationInfo,
  address,
  addressLinkPath,
  isLoading,
  isViewerExecutor,
  setModalOpen,
}) => {
  const brigadeInfo = applicationInfo?.brigade || [];

  return (
    <>
      <TitleWrapper>Информация о задаче</TitleWrapper>
      <ApplicationBaseInfo
        applicationInfo={applicationInfo}
        address={address}
        addressLinkPath={addressLinkPath}
        isLoading={isLoading}
      />
      <BrigadeInfo brigadeInfo={brigadeInfo} />
      {isViewerExecutor && (
        <ButtonSC
          type="ghostDanger"
          size="small"
          onClick={() => setModalOpen(true)}
        >
          Отложить задачу
        </ButtonSC>
      )}
    </>
  );
};
