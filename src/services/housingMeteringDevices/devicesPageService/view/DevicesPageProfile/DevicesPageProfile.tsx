import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import {
  ContentWrapper,
  FiltrationWrapper,
  Wrapper,
} from './DevicesPageProfile.styled';
import { DevicesPageProfileProps } from './DevicesPageProfile.types';
import { DevicesProfileContainer } from 'services/housingMeteringDevices/devicesProfileService';
import { IndividualDevicesProfileContainer } from '../../individualDevicesProfileService';
import { DevicesProfileTabsType } from '../../devicesPageService.types';
import { Tabs } from 'ui-kit/Tabs';

export const DevicesPageProfile: FC<DevicesPageProfileProps> = ({
  type,
  setDevicesType,
  handleAddNode,
  isPermitionToAddNode,
}) => {
  const menuButtonArr = useMemo(
    () => [
      {
        title: 'Выгрузить список ОДПУ',
        onClick: showDownloadDeviceReportButtonClicked,
        hidden: type !== DevicesProfileTabsType.ODPU,
      },
      {
        title: 'Добавить узел',
        onClick: handleAddNode,
        hidden: !isPermitionToAddNode,
      },
    ],
    [handleAddNode, isPermitionToAddNode, type],
  );

  const Header = useCallback(
    ({ children }: { children: ReactNode }) => {
      return (
        <FiltrationWrapper>
          <PageHeader
            title="Приборы"
            contextMenu={{ menuButtons: menuButtonArr }}
          />
          <Tabs
            activeKey={type}
            onChange={(activeKey) =>
              setDevicesType(activeKey as DevicesProfileTabsType)
            }
          >
            <Tabs.TabPane tab="ОДПУ" key={DevicesProfileTabsType.ODPU} />
            <Tabs.TabPane
              tab="ИПУ"
              key={DevicesProfileTabsType.IndividualDevices}
            />
          </Tabs>
          {children}
        </FiltrationWrapper>
      );
    },
    [menuButtonArr, setDevicesType, type],
  );

  return (
    <Wrapper>
      <ContentWrapper>
        {type === DevicesProfileTabsType.ODPU && (
          <DevicesProfileContainer Header={Header} />
        )}
        {type === DevicesProfileTabsType.IndividualDevices && (
          <IndividualDevicesProfileContainer Header={Header} />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};
