import { PageHeader } from 'ui-kit/shared/PageHeader';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
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
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { WithLoader } from 'ui-kit/shared/WithLoader';

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

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: EditElectricNodeGrouptype.edit },
      { label: 'Документы', key: EditElectricNodeGrouptype.documents },
    ],
    [],
  );

  const components: { [key in EditElectricNodeGrouptype]: ReactNode } = {
    [EditElectricNodeGrouptype.edit]: device && (
      <EditElectricNodeForm
        device={device}
        handleUpdateElectricHousingMeteringDevice={handleUpdateDevice}
        isLoading={isLoadingUpdate}
      />
    ),
    [EditElectricNodeGrouptype.documents]: (
      <WarningWrapper>Компонент в разработке</WarningWrapper>
    ),
  };

  return (
    <div>
      <GoBack path="/meters/accountingNodes" />
      <TitleWrapper>
        <PageHeader title={`${deviceTitle} Редактирование`} />
      </TitleWrapper>

      <WithLoader isLoading={isLoadingDevice}>
        {device && (
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
              items={tabItems}
            />
            {components[grouptype]}
          </>
        )}
      </WithLoader>
    </div>
  );
};
