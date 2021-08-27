import React, { useState } from 'react';
import styled from 'styled-components';
import DeviceInfo from '../../../_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import Icon from '../../../tt-components/Icon';
import { IndividualDeviceListItemResponse } from '../../../../myApi';
import { useHistory, useParams } from 'react-router-dom';
import { Flex } from '../Layout/Flex';
import { MenuButtonTT } from '01/tt-components';

const ClosedDevices = ({
  devices,
}: {
  devices: IndividualDeviceListItemResponse[];
}) => {
  const [showClosed, setShowClosed] = useState(false);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const closedDevices = devices.map((device) => (
    <ClosedDevice>
      <DeviceInfo device={device} />
      <MenuButtonTT
        menuButtonArr={[
          {
            title: 'Открыть историю показаний',
            show: true,
            cb: () =>
              history.push(
                `/apartment/${id}/individualDevice/${device.id}/readingHistory`
              ),
          },
        ]}
      />
    </ClosedDevice>
  ));
  return (
    <div style={{ marginBottom: 15 }}>
      <div>{showClosed ? closedDevices : null}</div>
      <ShowClosedBlock onClick={() => setShowClosed((x) => !x)}>
        <ShowToggle>
          {showClosed ? (
            <>
              <Icon
                icon="off"
                color="var(--main-100)"
                style={{ marginRight: 8, position: 'relative', top: 1 }}
              />
              <span>Скрыть закрытые приборы</span>
            </>
          ) : (
            <>
              <Icon
                icon="on"
                color="var(--main-100)"
                style={{ marginRight: 8, position: 'relative', top: 1 }}
              />
              <span>Показать закрытые приборы</span>
            </>
          )}
          <span style={{ marginLeft: 4 }}>({closedDevices?.length})</span>
        </ShowToggle>
      </ShowClosedBlock>
    </div>
  );
};

const ShowClosedBlock = styled.div`
  color: var(--main-100);
  font-size: 14px;
  font-weight: 500;
`;

const ShowToggle = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ClosedDevice = styled(Flex)`
  justify-content: space-between;
  padding: 8px 0 8px 8px;
  opacity: 0.6;
`;

export default ClosedDevices;
