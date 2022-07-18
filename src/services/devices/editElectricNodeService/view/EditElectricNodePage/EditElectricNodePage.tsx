import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
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
  handleUpdateDevice
}) => {
  const address = device.address;
  const hosuingstockAddress = address && getHousingStockAddress(address, true);

  return (
    <div>
      <GoBack />
      <PageHeader
        title={`${device.model} (${device.serialNumber}). Редактирование`}
      />
      <InfoWrapper>
        <AddressWrapper>{hosuingstockAddress}</AddressWrapper>
      </InfoWrapper>
      {/* <TabsSC activeKey={} onChange={}>
        <TabPane tab={'Общие данные'} key="EditForm"></TabPane>
        <TabPane tab={'Документы'} key="Documents"></TabPane>
      </TabsSC> */}
      <EditElectricNodeForm device={device} handleUpdateElectricHousingMeteringDevice={handleUpdateDevice}/>
    </div>
  );
};
