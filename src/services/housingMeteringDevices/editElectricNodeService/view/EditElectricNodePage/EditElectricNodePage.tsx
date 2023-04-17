import { PageHeader } from '01/shared/ui/PageHeader';
import { Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { EditElectricNodeForm } from './EditElectricNodeForm';
import {
  AddressWrapper,
  InfoWrapper,
  TabsSC,
  TitleWrapper,
  WarningWrapper,
} from './EditElectricNodePage.styled';
import {
  EditElectricNodeGrouptype,
  EditElectricNodePageProps,
} from './EditElectricNodePage.types';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
const { TabPane } = TabsSC;

export const EditElectricNodePage: FC<EditElectricNodePageProps> = ({
  device,
  handleUpdateDevice,
  isLoadingUpdate,
  isLoadingDevice,
}) => {
  const deviceTitle = device ? `${device.model} (${device.serialNumber}).` : '';
  const [grouptype, setGrouptype] = useState<EditElectricNodeGrouptype>(
    EditElectricNodeGrouptype.edit,
  );
  return (
    <div>
      <GoBack path="/meters/accountingNodes" />
      <TitleWrapper>
        <PageHeader title={`${deviceTitle} Редактирование`} />
      </TitleWrapper>

      {isLoadingDevice && <Skeleton active />}
      {!isLoadingDevice && device && (
        <>
          <InfoWrapper>
            <AddressWrapper>
              {getHousingStockAddress(device?.address, true)}
            </AddressWrapper>

            <DeviceStatus isActive={!device.closingDate} />
          </InfoWrapper>

          <TabsSC
            activeKey={grouptype}
            onChange={(grouptype) =>
              setGrouptype(grouptype as EditElectricNodeGrouptype)
            }
          >
            <TabPane tab={'Общие данные'} key={EditElectricNodeGrouptype.edit}>
              <EditElectricNodeForm
                device={device}
                handleUpdateElectricHousingMeteringDevice={handleUpdateDevice}
                isLoading={isLoadingUpdate}
              />
            </TabPane>
            <TabPane
              tab={'Документы'}
              key={EditElectricNodeGrouptype.documents}
            >
              <WarningWrapper>Компонент в разработке</WarningWrapper>
            </TabPane>
          </TabsSC>
        </>
      )}
    </div>
  );
};
