import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ResourceAccountingSystemsContainer } from 'services/housingMeteringDevices/resourceAccountingSystemsService';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ApartmentsListContainer } from '../../apartmentsListService';
import { ObjectProfileGrouptype } from '../../objectProfileService.constants';
import { ObjectInfo } from '../ObjectInfo';
import { CityWrappper, PageHeaderSC, TabsSC } from './ObjectProfile.styled';
import { ObjectProfileProps } from './ObjectProfile.types';
import { RedirectToTasksContainer } from './redirectToTasks';
import { featureToggles } from 'featureToggles';
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
                history.push(`/objects/${housingStock.id}/addNode`),
              hidden: !isPermitionToAddNode,
            },
            {
              title: 'Выгрузка сводного отчёта',
              onClick: () => openCommonReport(),
              hidden: !isPermitionToDownloadConsolidatedReport,
            },
            {
              title: 'Редактировать',
              onClick: () => history.push(`/objects/${housingStock.id}/edit`),
              hidden:
                !isPermissionToEditHousingStock &&
                !featureToggles.editHousingStock,
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
        <TabPane tab="Общая информация" key={ObjectProfileGrouptype.Common}>
          <ObjectInfo housingStock={housingStock} />
          <RedirectToTasksContainer />
        </TabPane>
        <TabPane tab="Квартиры" key={ObjectProfileGrouptype.Apartments}>
          <ApartmentsListContainer />
          <RedirectToTasksContainer />
        </TabPane>
        <TabPane
          tab="Системы учета ресурсов"
          key={ObjectProfileGrouptype.Devices}
        >
          <ResourceAccountingSystemsContainer />
          <RedirectToTasksContainer />
        </TabPane>
      </TabsSC>
    </div>
  );
};
