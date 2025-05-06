import React, { FC, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';
import { GoBack } from 'ui-kit/shared/GoBack';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { ApartmentsListContainer } from '../../apartmentsListService';
import { HousingStockProfileGrouptype } from '../../housingStockProfileService.constants';
import { HousingStockInfo } from '../HousingStockInfo';
import {
  CityWrappper,
  ContentWrapper,
  PageHeaderSC,
  TabsSC,
  Wrapper,
} from './HousingStockProfile.styled';
import { HousingStockProfileProps } from './HousingStockProfile.types';
import { LinkCard } from 'ui-kit/shared/LinkCard';
import queryString from 'query-string';

export const HousingStockProfile: FC<HousingStockProfileProps> = ({
  housingStock,
  currentGrouptype = HousingStockProfileGrouptype.Common,
  setCurrentGrouptype,
  openCommonReport,
  isPermitionToAddNode,
  isPermitionToDownloadConsolidatedReport,
  isPermissionToEditHousingStock,
  resourceDisconnections,
}) => {
  const navigate = useNavigate();

  const { address } = housingStock;
  const addressString = getBuildingAddress(housingStock);
  const city = address?.mainAddress?.city || '';
  const tasksCount = housingStock.numberOfTasks;

  const content: { [key in HousingStockProfileGrouptype]: ReactNode } = useMemo(
    () => ({
      [HousingStockProfileGrouptype.Apartments]: <ApartmentsListContainer />,
      [HousingStockProfileGrouptype.Common]: (
        <HousingStockInfo
          housingStock={housingStock}
          resourceDisconnections={resourceDisconnections}
        />
      ),
      [HousingStockProfileGrouptype.Devices]: (
        <ResourceAccountingSystemsContainer />
      ),
    }),
    [housingStock, resourceDisconnections],
  );

  const tabItems = useMemo(
    () => [
      { label: 'Общая информация', key: HousingStockProfileGrouptype.Common },
      { label: 'Квартиры', key: HousingStockProfileGrouptype.Apartments },
      {
        label: 'Системы учета ресурсов',
        key: HousingStockProfileGrouptype.Devices,
      },
    ],
    [],
  );

  return (
    <div>
      <GoBack />
      <PageHeaderSC
        title={`${addressString}`}
        contextMenu={{
          menuButtons: [
            {
              title: 'Добавить узел',
              onClick: () =>
                navigate(`/buildings/livingProfile/${housingStock.id}/addNode`),
              hidden: !isPermitionToAddNode,
            },
            {
              title: 'Выгрузка сводного отчёта',
              onClick: () => openCommonReport(),
              hidden: !isPermitionToDownloadConsolidatedReport,
            },
            {
              title: 'Редактировать',
              onClick: () =>
                navigate(`/buildings/livingProfile/${housingStock.id}/edit`),
              hidden: !isPermissionToEditHousingStock,
            },
          ],
        }}
      />
      <CityWrappper>{city}</CityWrappper>

      <TabsSC
        onChange={(grouptype) =>
          setCurrentGrouptype(grouptype as HousingStockProfileGrouptype)
        }
        activeKey={currentGrouptype}
        items={tabItems}
      />

      <Wrapper>
        <ContentWrapper>{content[currentGrouptype]}</ContentWrapper>
        <div>
          <LinkCard
            text={`Задачи: ${tasksCount}`}
            link={queryString.stringifyUrl({
              url: '/tasks/list/Executing',
              query: { housingStockId: housingStock?.id },
            })}
            showLink={Boolean(tasksCount)}
          />
        </div>
      </Wrapper>
    </div>
  );
};
