import React, { FC } from 'react';
import {
  AddressWrapper,
  ModelWrapper,
  SerialNumberWrapper,
  TitleWrapper,
  Wrapper,
} from './ChangeODPUPage.styled';
import { ChangeODPUPageProps } from './ChangeODPUPage.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ElectricityPhases } from './Phases';

export const ChangeODPUPage: FC<ChangeODPUPageProps> = ({ oldDevice }) => {
  const { resource, address, serialNumber, model } = oldDevice || {};
  const hosuingstockAddress = address && getHousingStockAddress(address, true);
  let Phases = {
    first: true,
    second: false,
    third: true,
  };
  return (
    <Wrapper>
      <GoBack />
      <PageHeader title="Замена ОДПУ" />
      <TitleWrapper>
        <AddressWrapper>{hosuingstockAddress}</AddressWrapper>
        {resource && <ResourceIconLookup resource={resource} />}
        <SerialNumberWrapper>{serialNumber}</SerialNumberWrapper>
        <ModelWrapper>{model}</ModelWrapper>
      </TitleWrapper>
      <ElectricityPhases
        setFieldValue={(a, b) => console.log(b)}
        values={'a'}
        phasesStatus={Phases}
        amountOfPhases={'ThreePhases'}
      />
    </Wrapper>
  );
};
