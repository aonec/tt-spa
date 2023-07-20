import React, { FC } from 'react';
import {
  AddressWrapper,
  InforWrapper,
  TitleWrapper,
  Wrapper,
} from './ChangeODPUPage.styled';
import { ChangeODPUPageProps } from './ChangeODPUPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { GoBack } from 'ui-kit/shared/GoBack';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { ODPUInfoString } from './ODPUInfoString';
import { ChangeODPUForm } from './ChangeODPUForm';
import { Skeleton } from 'antd';

export const ChangeODPUPage: FC<ChangeODPUPageProps> = ({
  oldDevice,
  isLoadingDevice,
  isLoadingSwitch,
  handleSwitchDevice,
}) => {
  const address = oldDevice?.address;
  const hosuingstockAddress = address && getBuildingAddress(address, true);

  return (
    <Wrapper>
      <GoBack />
      <TitleWrapper>
        <PageHeader title="Замена ОДПУ" />
      </TitleWrapper>
      {isLoadingDevice && <Skeleton active />}
      {!isLoadingDevice && (
        <>
          <InforWrapper>
            <AddressWrapper>{hosuingstockAddress}</AddressWrapper>
            {oldDevice && <ODPUInfoString device={oldDevice} />}
          </InforWrapper>
          {oldDevice && (
            <ChangeODPUForm
              oldDevice={oldDevice}
              isLoading={isLoadingSwitch}
              handleSwitchDevice={handleSwitchDevice}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};
