import React, { FC } from 'react';
import { AddressWrapper, InforWrapper, Wrapper } from './ChangeODPUPage.styled';
import { ChangeODPUPageProps } from './ChangeODPUPage.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
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
  const hosuingstockAddress = address && getHousingStockAddress(address, true);

  return (
    <Wrapper>
      <GoBack />
      <PageHeader title="Замена ОДПУ" />
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
