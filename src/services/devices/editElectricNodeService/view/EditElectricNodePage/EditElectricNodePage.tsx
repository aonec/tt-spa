import { PageHeader } from '01/shared/ui/PageHeader';
import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { EditElectricNodeForm } from './EditElectricNodeForm';
import {
  AddressWrapper,
  InfoWrapper,
  TabsSC,
} from './EditElectricNodePage.styled';
import { EditElectricNodePageProps } from './EditElectricNodePage.types';
const { TabPane } = TabsSC;

export const EditElectricNodePage: FC<EditElectricNodePageProps> = ({
  device,
  handleUpdateDevice,
  isLoadingUpdate,
  isLoadingDevice,
  grouptype,
}) => {
  const deviceTitle = device ? `${device.model} (${device.serialNumber}).` : '';
  const history = useHistory();

  return (
    <div>
      <GoBack path="/meters/accountingNodes" />
      <PageHeader title={`${deviceTitle} Редактирование`} />

      {isLoadingDevice && <Skeleton active />}
      {!isLoadingDevice && (
        <>
          <InfoWrapper>
            {device && (
              <AddressWrapper>
                {getHousingStockAddress(device?.address, true)}
              </AddressWrapper>
            )}
          </InfoWrapper>
          {device && (
            <>
              <TabsSC activeKey={grouptype} onChange={history.push}>
                <TabPane tab={'Общие данные'} key="edit"></TabPane>
                <TabPane tab={'Документы'} key="documents"></TabPane>
              </TabsSC>
              <Route path="/electricNode/:deviceId/edit" exact>
                <EditElectricNodeForm
                  device={device}
                  handleUpdateElectricHousingMeteringDevice={handleUpdateDevice}
                  isLoading={isLoadingUpdate}
                />
              </Route>
            </>
          )}
        </>
      )}
    </div>
  );
};
