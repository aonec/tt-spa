import React, { FC, ReactNode, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ApartmentsListContainer } from '../../apartmentsListService';
import { ObjectProfileGrouptype } from '../../objectProfileService.constants';
import { ObjectInfo } from '../ObjectInfo';
import {
  CityWrappper,
  ContentWrapper,
  PageHeaderSC,
  TabsSC,
  Wrapper,
} from './ObjectProfile.styled';
import { ObjectProfileProps } from './ObjectProfile.types';
import { LinkCard } from 'ui-kit/shared_components/LinkCard';
import { stringifyUrl } from 'query-string';
const { TabPane } = TabsSC;

export const ObjectProfile: FC<ObjectProfileProps> = ({
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
  const addressString = getHousingStockAddress(housingStock);
  const city = address?.mainAddress?.city || '';
  const tasksCount = housingStock.numberOfTasks;

  const content: { [key in ObjectProfileGrouptype]: ReactNode } = useMemo(
    () => ({
      [ObjectProfileGrouptype.Apartments]: <ApartmentsListContainer />,
      [ObjectProfileGrouptype.Common]: (
        <ObjectInfo housingStock={housingStock} />
      ),
      [ObjectProfileGrouptype.Devices]: <ResourceAccountingSystemsContainer />,
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
                history.push(`/buildings/${housingStock.id}/addNode`),
              hidden: !isPermitionToAddNode,
            },
            {
              title: 'Выгрузка сводного отчёта',
              onClick: () => openCommonReport(),
              hidden: !isPermitionToDownloadConsolidatedReport,
            },
            {
              title: 'Редактировать',
              onClick: () => history.push(`/buildings/${housingStock.id}/edit`),
              hidden: !isPermissionToEditHousingStock,
            },
          ],
        }}
      />
      <CityWrappper>{city}</CityWrappper>

      <TabsSC
        onChange={(grouptype) =>
          setCurrentGrouptype(grouptype as ObjectProfileGrouptype)
        }
        activeKey={currentGrouptype}
      >
        <TabPane tab="Общая информация" key={ObjectProfileGrouptype.Common} />
        <TabPane tab="Квартиры" key={ObjectProfileGrouptype.Apartments} />
        <TabPane
          tab="Системы учета ресурсов"
          key={ObjectProfileGrouptype.Devices}
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
