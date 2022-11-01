import { Radio } from 'antd';
import React, { FC } from 'react';
import { DevicesSearchType } from '../../individualDevicesProfileService.types';
import { IndividualDevicesViewComponents } from './IndividualDevicesProfile.constants';
import { Wrapper } from './IndividualDevicesProfile.styled';
import { IndividualDevicesProfileProps } from './IndividualDevicesProfile.types';

export const IndividualDevicesProfile: FC<IndividualDevicesProfileProps> = ({
  devicesSearchType,
  setDevicesSearchType,
}) => {
  const Component = IndividualDevicesViewComponents[devicesSearchType];

  return (
    <Wrapper>
      <Radio.Group
        value={devicesSearchType}
        onChange={(value) =>
          setDevicesSearchType(value.target.value as DevicesSearchType)
        }
      >
        <Radio value={DevicesSearchType.SearialNumber}>Поиск по прибору</Radio>
        <Radio value={DevicesSearchType.Address}>Поиск по адресу</Radio>
      </Radio.Group>
      <div>
        <Component />
      </div>
    </Wrapper>
  );
};
