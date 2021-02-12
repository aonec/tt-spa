import React, { useContext } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EditNodeContext } from '../index';
import { IconTT } from '../../../tt-components/IconTT';
import { ButtonTT } from '../../../tt-components';

export const RelatedDevices = () => {
  const { node } = useContext(EditNodeContext);
  const { communicationPipes } = node;

  const related = _.flatten(communicationPipes.map((item, index) => {
    const res = item.devices.map((resItem) => resItem);
    return res;
  }));

  const result = related.map((value) => {
    const {
      model,
      serialNumber,
      closingdate,
      hub,
      resource,
      id,
    } = value;

    const { pipeNumber, entryNumber, hubNumber } = hub === null ? {
      number: 'X',
      hubNumber: 'X',
    } : hub;

    const icon = closingdate !== null ? 'green' : 'red';
    const status = closingdate !== null ? 'Активен' : 'Не активен';

    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`} title="Перейти на страницу устройства">
          <IconTT icon={resource.toLowerCase()} />
          <Name>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          <IconTT icon={icon} />
          {status}
        </State>

        <Hub>
          <Span>{`Ввод: ${entryNumber ?? 'Х'}`}</Span>
          <Span>{`Труба: ${pipeNumber ?? 'Х'}`}</Span>
        </Hub>

        <Link
          to={`/housingMeteringDevices/${id}/edit_odpu`}
          title="Редактирование ОДПУ"
          style={{ display: 'inline-flex', width: 'min-content' }}
        >
          <IconTT icon="edit" />
        </Link>
      </ListItem>
    );
  });
  const handleAddOdpu = () => {
   alert("Подключение ОДПУ в узле в разработке")
  };

  return (
    <ListWrap>
      {result}
      <ButtonTT color="white" small onClick={handleAddOdpu} style={{ marginTop: '24px' }} type="button">
        Подключить
        прибор
        <IconTT icon="plus" />
      </ButtonTT>
    </ListWrap>
  );
};

export default RelatedDevices;

export const Template = styled.div``;

const NameWrap = styled.a`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 8px;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

const Hub = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 16px;
  align-items: center;
}
`;
const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 6fr 2fr 3fr 1fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
