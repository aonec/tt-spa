import React, { FC } from 'react';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import {
  FiltrationWrapper,
  TabsSC,
  Wrapper,
} from './DevicesPageProfile.styled';
import { DevicesPageProfileProps } from './DevicesPageProfile.types';
import { DevicesProfileContainer } from 'services/housingMeteringDevices/devicesProfileService';
import { IndividualDevicesProfileContainer } from '../../individualDevicesProfileService';
import { DevicesProfileTabsType } from '../../devicesPageService.types';

export const DevicesPageProfile: FC<DevicesPageProfileProps> = ({
  type,
  setDevicesType,
  handleAddNode,
  isPermitionToAddNode,
}) => {
  const menuButtonArr = [
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
  ];

  return (
    <Wrapper>
      <FiltrationWrapper>
        <PageHeader
          title="Приборы"
          contextMenu={{ menuButtons: menuButtonArr }}
        />
        <TabsSC
          activeKey={type}
          onChange={(activeKey) =>
            setDevicesType(activeKey as DevicesProfileTabsType)
          }
        >
          <TabsSC.TabPane tab="ОДПУ" key={DevicesProfileTabsType.ODPU} />
          <TabsSC.TabPane
            tab="ИПУ"
            key={DevicesProfileTabsType.IndividualDevices}
          />
        </TabsSC>
      </FiltrationWrapper>
      {type === DevicesProfileTabsType.ODPU && <DevicesProfileContainer />}
      {type === DevicesProfileTabsType.IndividualDevices && (
        <IndividualDevicesProfileContainer />
      )}
    </Wrapper>
  );
};
