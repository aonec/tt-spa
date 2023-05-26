import { Radio } from 'antd';
import React, { FC, ReactElement, ReactNode } from 'react';
import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';
import { IndividualDevicesViewComponents } from './IndividualDevicesProfile.constants';
import { Wrapper } from './IndividualDevicesProfile.styled';
import { IndividualDevicesProfileProps } from './IndividualDevicesProfile.types';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

export const IndividualDevicesProfile: FC<
  IndividualDevicesProfileProps & HeaderInject
> = ({ devicesSearchType, setDevicesSearchType, Header }) => {
  const Component = IndividualDevicesViewComponents[devicesSearchType];

  const CustomHeader: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <Header>
        <Radio.Group
          value={devicesSearchType}
          onChange={(value) =>
            setDevicesSearchType(value.target.value as DevicesSearchType)
          }
        >
          <Radio value={DevicesSearchType.SearialNumber}>
            Поиск по прибору
          </Radio>
          <Radio value={DevicesSearchType.Address}>Поиск по адресу</Radio>
        </Radio.Group>
        {children}
      </Header>
    );
  };

  return (
    <Wrapper>
      <Component
        Header={
          CustomHeader as unknown as (props: {
            children: ReactNode;
          }) => ReactElement
        }
      />
    </Wrapper>
  );
};
