import React, { useContext } from 'react';
import styled from 'styled-components';
import { Loader } from '01/components';
import { Icon } from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import { DeviceContext } from '../DeviceProfile';

export const Template = styled.div``;

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 2fr 9fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

export const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

export const Title = styled.h2``;

export const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr 2fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;

export const RelatedDevices = () => {
  const { related } = useContext(DeviceContext);
  const loading = !related;

  const buttonHandler = () => {
    console.log(related);
  };

  // Превратим в массив
  const relatedArr = Object.values(related || {});

  const result = relatedArr.map((value) => {
    const {
      model,
      serialNumber,
      closingdate,
      pipe,
      resource,
      id,
      housingStockId,
    } = value;

    // size: {width, height}

    const { number, entryNumber } = pipe === null ? { number: 'X', entryNumber: 'X' } : pipe;
    const { icon, color } = DeviceIcons[resource];

    // номер трубы - это pipe.number
    // номер ввода - это pipe.entryNumber

    return (
      <ListItem>
        <NameWrap href={`/objects/${housingStockId}/devices/${id}`}>
          <Icon icon={icon} color={color} />
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          <Icon icon="status" color="#17B45A" />
          {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
        </State>
        <Span>{`Ввод: ${entryNumber}`}</Span>
        <Span>{`Узел: ${'-'}`}</Span>
        <Span>{`Труба: ${number}`}</Span>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      {/* <button onClick={buttonHandler}>related</button> */}
      <Loader show={loading} size="32">
        <Title>Приборы</Title>
        {result}
      </Loader>
    </ListWrap>
  );
};

export default RelatedDevices;
