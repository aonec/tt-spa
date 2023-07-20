import { PageHeader } from 'ui-kit/sharedComponents/PageHeader';
import { Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { getBuildingAddress } from 'utils/getBuildingAddress';
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
import { DeviceStatus } from 'ui-kit/sharedComponents/IndividualDeviceInfo/DeviceStatus';
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
              {getBuildingAddress(device?.address, true)}
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
