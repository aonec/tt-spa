import React, { FC, ReactNode, useMemo } from 'react';
import {
  CityWrappper,
  ContentWrapper,
  PageHeaderSC,
  TabsSC,
} from './NonResidentialBuildingProfile.styled';
import { NonResidentialBuildingProfileProps } from './NonResidentialBuildingProfile.types';
import { Empty } from 'antd';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { NonResidentialBuildingProfileGrouptype } from '../../nonResidentialBuildingProfileService.constants';
import { NonResidentialBuildingInfo } from '../NonResidentialBuildingInfo';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';

const { TabPane } = TabsSC;

export const NonResidentialBuildingProfile: FC<
  NonResidentialBuildingProfileProps
> = ({ currentGrouptype, setGrouptype, nonResidentialBuilding }) => {
  const content: {
    [key in NonResidentialBuildingProfileGrouptype]: ReactNode;
  } = useMemo(
    () => ({
      [NonResidentialBuildingProfileGrouptype.Common]: (
        <NonResidentialBuildingInfo
          nonResidentialBuilding={nonResidentialBuilding}
        />
      ),
      [NonResidentialBuildingProfileGrouptype.Devices]: (
        <ResourceAccountingSystemsContainer />
      ),
    }),
    [nonResidentialBuilding],
  );

  if (!nonResidentialBuilding) {
    return (
      <>
        <GoBack />
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Возникла ошибка при загрузки здания"
        />
      </>
    );
  }

  const { address } = nonResidentialBuilding;
  const addressString = getBuildingAddress(nonResidentialBuilding);
  const city = address?.mainAddress?.city || '';

  return (
    <>
      <GoBack />
      <PageHeaderSC title={`${addressString}`} />
      <CityWrappper>{city}</CityWrappper>
      <TabsSC
        onChange={(grouptype) =>
          setGrouptype(grouptype as NonResidentialBuildingProfileGrouptype)
        }
        activeKey={currentGrouptype}
      >
        <TabPane
          tab="Общая информация"
          key={NonResidentialBuildingProfileGrouptype.Common}
        />
        <TabPane
          tab="Системы учета ресурсов"
          key={NonResidentialBuildingProfileGrouptype.Devices}
        />
      </TabsSC>
      <>
        <ContentWrapper>{content[currentGrouptype]}</ContentWrapper>
      </>
    </>
  );
};
