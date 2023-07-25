import React, { FC, ReactNode, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
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
import { stringifyUrl } from 'query-string';
const { TabPane } = TabsSC;

export const HousingStockProfile: FC<HousingStockProfileProps> = ({
  housingStock,
  currentGrouptype,
  setCurrentGrouptype,
  openCommonReport,
  isPermitionToAddNode,
  isPermitionToDownloadConsolidatedReport,
  isPermissionToEditHousingStock,
}) => {
  const history = useHistory();

  const { address } = housingStock;
  const addressString = getBuildingAddress(housingStock);
  const city = address?.mainAddress?.city || '';
  const tasksCount = housingStock.numberOfTasks;

  const content: { [key in HousingStockProfileGrouptype]: ReactNode } = useMemo(
    () => ({
      [HousingStockProfileGrouptype.Apartments]: <ApartmentsListContainer />,
      [HousingStockProfileGrouptype.Common]: (
        <HousingStockInfo housingStock={housingStock} />
      ),
      [HousingStockProfileGrouptype.Devices]: (
        <ResourceAccountingSystemsContainer />
      ),
    }),
    [housingStock],
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
                history.push(
                  `/buildings/livingProfile/${housingStock.id}/addNode`,
                ),
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
                history.push(
                  `/buildings/livingProfile/${housingStock.id}/edit`,
                ),
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
      >
        <TabPane
          tab="Общая информация"
          key={HousingStockProfileGrouptype.Common}
        />
        <TabPane tab="Квартиры" key={HousingStockProfileGrouptype.Apartments} />
        <TabPane
          tab="Системы учета ресурсов"
          key={HousingStockProfileGrouptype.Devices}
        />
      </TabsSC>
      <Wrapper>
        <ContentWrapper>{content[currentGrouptype]}</ContentWrapper>
        <div>
          <LinkCard
            text={`Задачи: ${tasksCount}`}
            link={stringifyUrl({
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
