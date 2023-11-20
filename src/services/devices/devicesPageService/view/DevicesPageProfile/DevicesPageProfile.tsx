import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import {
  ContentWrapper,
  FiltrationWrapper,
  Wrapper,
} from './DevicesPageProfile.styled';
import { DevicesPageProfileProps } from './DevicesPageProfile.types';
import { DevicesProfileContainer } from 'services/devices/devicesProfileService';
import { IndividualDevicesProfileContainer } from '../../individualDevicesProfileService';
import { DevicesProfileTabsType } from '../../devicesPageService.types';
import { Tabs } from 'ui-kit/Tabs';

export const DevicesPageProfile: FC<DevicesPageProfileProps> = ({
  type,
  setDevicesType,
  handleAddNode,
  isPermitionToAddNode,
  openDownloadDevicesReportModal,
}) => {
  const menuButtonArr = useMemo(
    () => [
      {
        title: 'Выгрузить список ОДПУ',
        onClick: openDownloadDevicesReportModal,
        hidden: type !== DevicesProfileTabsType.ODPU,
      },
      {
        title: 'Добавить узел',
        onClick: handleAddNode,
        hidden: !isPermitionToAddNode,
      },
    ],
    [handleAddNode, isPermitionToAddNode, type, openDownloadDevicesReportModal],
  );

  const tabItems = useMemo(
    () => [
      { label: 'ОДПУ', key: DevicesProfileTabsType.ODPU },
      { label: 'ИПУ', key: DevicesProfileTabsType.IndividualDevices },
    ],
    [],
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
            items={tabItems}
          />
          {children}
        </FiltrationWrapper>
      );
    },
    [menuButtonArr, setDevicesType, type, tabItems],
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
