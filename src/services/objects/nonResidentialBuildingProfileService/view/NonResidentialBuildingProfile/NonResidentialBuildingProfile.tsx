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
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { NonResidentialBuildingProfileGrouptype } from '../../nonResidentialBuildingProfileService.constants';
import { NonResidentialBuildingInfo } from '../NonResidentialBuildingInfo';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';
import { LinkCard } from 'ui-kit/sharedComponents/LinkCard';
import { stringifyUrl } from 'query-string';
import { useHistory } from 'react-router-dom';

const { TabPane } = TabsSC;

export const NonResidentialBuildingProfile: FC<
  NonResidentialBuildingProfileProps
> = ({
  currentGrouptype,
  setGrouptype,
  nonResidentialBuilding,
  isPermissionToEditHousingStock,
  isPermitionToAddNode,
  isPermitionToDownloadConsolidatedReport,
  openConsolidatedReportModal,
}) => {
  const history = useHistory();

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

  const { address, numberOfTasks } = nonResidentialBuilding;
  const addressString = getBuildingAddress(nonResidentialBuilding);
  const city = address?.mainAddress?.city || '';

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
                history.push(`/buildings/${nonResidentialBuilding.id}/addNode`),
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
                history.push(`/buildings/${nonResidentialBuilding.id}/edit`),
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
      <Wrapper>
        <ContentWrapper>{content[currentGrouptype]}</ContentWrapper>
        <div>
          <LinkCard
            text={`Задачи: ${numberOfTasks}`}
            link={stringifyUrl({
              url: '/tasks/list/Executing',
              query: { housingStockId: nonResidentialBuilding.id },
            })}
            showLink={Boolean(numberOfTasks)}
          />
        </div>
      </Wrapper>
    </>
  );
};
