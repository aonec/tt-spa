import React, { useContext } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import styled from 'styled-components';
import { Loader } from '01/components';
// import { ListWrap, ListItem, Title } from '01/_components/List';
import { DeviceContext } from '../DeviceProfile';

export const Template = styled.div``;

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
&[|url] {
  cursor: pointer;
  font-weight: 500;
  opacity: 1;
  &:hover {
    color: var(--primary-100);
  }
}
& span {
  padding: 8px;
  &:first-of-type {
    opacity: 0.6;
    font-weight: normal;
  }
}
}
`;

export const RelatedDevices = () => {
  const { related } = useContext(DeviceContext);
  const loading = !related;

  const buttonHandler = () => {
    console.log(related);
  };

  // Превратим в массив
  const relatedArr = Object.values(related || []);

  const result = relatedArr.map((value, index) => {
    const {
      model, serialNumber, closingdate, pipe,
    } = value;
    const { number, entryNumber } = pipe;
    // номер трубы - это pipe.number
    // номер ввода - это pipe.entryNumber
    console.log(index);
    return (
      <ListItem>
        <span>{`${model} (${serialNumber})`}</span>
        <span>{`${closingdate || 'Активен'}`}</span>
        <span>{`Ввод: ${entryNumber}`}</span>
        <span>{`Узел: ${'-'}`}</span>
        <span>
          {`Труба: ${number}`}
        </span>
      </ListItem>
    );
  });

  return (
    <ListWrap>
      <button onClick={buttonHandler}>related</button>
      <Loader show={loading} size="32">
        <Title>Приборы</Title>
        {result}
      </Loader>
    </ListWrap>
  );
};

export default RelatedDevices;
