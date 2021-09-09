import React from 'react';
import styled from 'styled-components';
import Icon from '../../../tt-components/Icon';
import { Flex } from '../Layout/Flex';
import ApartmentReadingLine from '01/_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import {
  $individualDevices,
  $isShownClosedDevices,
  hideClosedDevices,
  showClosedDevices,
} from '01/features/individualDevices/displayIndividualDevices/models';
import { useStore } from 'effector-react';

const ClosedDevices = ({ sliderIndex = 0 }: { sliderIndex: number }) => {
  const showClosed = useStore($isShownClosedDevices);
  const devices = useStore($individualDevices);

  const closedDevices = devices
    .filter((device) => device.closingDate !== null)
    .map((device, index) => (
      <ApartmentReadingLine
        closed
        sliderIndex={sliderIndex!}
        key={device.id}
        device={device}
        numberOfPreviousReadingsInputs={devices
          .slice(0, index)
          .reduce(
            (acc, elem) =>
              acc + getIndividualDeviceRateNumByName(elem.rateType),
            0
          )}
      />
    ));
  return (
    <div style={{ marginBottom: 15 }}>
      <div>{showClosed ? closedDevices : null}</div>
      <ShowClosedBlock
        onClick={() => (showClosed ? hideClosedDevices : showClosedDevices)()}
      >
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
