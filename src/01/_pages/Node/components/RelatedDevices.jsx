import React, { useContext } from 'react';
import { Loader } from '01/components';
import { Icon } from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import { NodeContext } from '../index';

import {ListItem, NameWrap, Name, Serial, State, Span, ListWrap, Title} from '../../../tt-components/RelatedDevices';

const RelatedDevices = () => {
  const { node } = useContext(NodeContext);

  const {hubs} = node;
  const result = hubs.map((value) => {
    const {
      model,
      serialNumber,
      closingdate,
      hub,
      resource,
      id,
      housingStockId,
    } = value;

    const { pipeNumber, entryNumber, hubNumber } = hub === null ? { number: 'X', entryNumber: 'X', hubNumber: 'X' } : hub;
    const { icon, color } = DeviceIcons[resource];

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <Icon icon={icon} color={color} />
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          <Icon icon="status" color="#17B45A" />
          {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
        </State>
        <Span>{`Ввод: ${entryNumber}`}</Span>
        <Span>{`Узел: ${hubNumber}`}</Span>
        <Span>{`Труба: ${pipeNumber}`}</Span>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      {/* <button onClick={buttonHandler}>related</button> */}
      <Loader show={false} size="32">
        <Title>Приборы</Title>
        {result}
      </Loader>
    </ListWrap>
  );
};

export default RelatedDevices;
