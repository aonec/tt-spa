import React, { FC, ReactNode, useMemo } from 'react';
import {
  CityWrappper,
  ContentWrapper,
  PageHeaderSC,
  TabsSC,
  Wrapper,
} from './NonResidentialBuildingProfile.styled';
import { NonResidentialBuildingProfileProps } from './NonResidentialBuildingProfile.types';
import { Empty } from 'antd';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { GoBack } from 'ui-kit/shared/GoBack';
import { NonResidentialBuildingProfileGrouptype } from '../../nonResidentialBuildingProfileService.constants';
import { NonResidentialBuildingInfo } from '../NonResidentialBuildingInfo';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';
import {  useNavigate } from 'react-router-dom';
import { LinkCard } from 'ui-kit/shared/LinkCard';

export const NonResidentialBuildingProfile: FC<
  NonResidentialBuildingProfileProps
> = ({
  currentGrouptype = NonResidentialBuildingProfileGrouptype.Common,
  setGrouptype,
  nonResidentialBuilding,
  isPermissionToEditHousingStock,
  isPermitionToAddNode,
  isPermitionToDownloadConsolidatedReport,
  openConsolidatedReportModal,
  resourceDisconnections,
}) => {
  const navigate =  useNavigate();

  const content: {
    [key in NonResidentialBuildingProfileGrouptype]: ReactNode;
  } = useMemo(
    () => ({
      [NonResidentialBuildingProfileGrouptype.Common]: (
        <NonResidentialBuildingInfo
          nonResidentialBuilding={nonResidentialBuilding}
          resourceDisconnections={resourceDisconnections}
        />
      ),
      [NonResidentialBuildingProfileGrouptype.Devices]: (
        <ResourceAccountingSystemsContainer />
      ),
    }),
    [nonResidentialBuilding, resourceDisconnections],
  );

  const tabItems = useMemo(
    () => [
      {
        label: 'Общая информация',
        key: NonResidentialBuildingProfileGrouptype.Common,
      },
      {
        label: 'Системы учета ресурсов',
        key: NonResidentialBuildingProfileGrouptype.Devices,
      },
    ],
    [],
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

  const { address, numberOfTasks } = nonResidentialBuilding;
  const addressString = getBuildingAddress(nonResidentialBuilding);
  const city = address?.mainAddress?.city || '';
  const params = new URLSearchParams([
    ['housingStockId', nonResidentialBuilding.id.toString()],
  ]);

  return (
    <>
      <GoBack />
      <PageHeaderSC
        title={`${addressString}`}
        contextMenu={{
          menuButtons: [
            {
              title: 'Добавить узел',
              onClick: () =>
                 navigate(
                  `/buildings/nonResidentialProfile/${nonResidentialBuilding.id}/addNode`,
                ),
              hidden: !isPermitionToAddNode,
            },
            {
              title: 'Выгрузка сводного отчёта',
              onClick: () => openConsolidatedReportModal(),
              hidden: !isPermitionToDownloadConsolidatedReport,
            },
            {
              title: 'Редактировать',
              onClick: () =>
                 navigate(
                  `/buildings/nonResidentialProfile/${nonResidentialBuilding.id}/edit`,
                ),
              hidden: !isPermissionToEditHousingStock,
            },
          ],
        }}
      />
      <CityWrappper>{city}</CityWrappper>
      <TabsSC
        onChange={(grouptype) =>
          setGrouptype(grouptype as NonResidentialBuildingProfileGrouptype)
        }
        activeKey={currentGrouptype}
        items={tabItems}
      />
      <Wrapper>
        <ContentWrapper>{content[currentGrouptype]}</ContentWrapper>
        <div>
          <LinkCard
            text={`Задачи: ${numberOfTasks}`}
            link={`/tasks/list/Executing?${params}`}
            showLink={Boolean(numberOfTasks)}
          />
        </div>
      </Wrapper>
    </>
  );
};
