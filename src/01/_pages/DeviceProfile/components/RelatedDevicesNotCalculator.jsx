import React, { useState, useEffect } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import styled from 'styled-components';
import { Loader } from '01/components';
import { Icon } from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import { getInfo } from '../../../_api/device_page';

export const Template = styled.div``;

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 5fr 6fr;
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
  grid-template-columns: 4fr 2fr 3fr 3fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;

export const RelatedDevicesNotCalculator = ({ calcId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [related, setRelated] = useState();

  useEffect(() => {
    setIsLoading(true);
    getInfo('Calculator', calcId).then((calc) => {
      setRelated(calc);
      setIsLoading(false);
    });
  }, []);

  const { model, serialNumber, futureCheckingDate, closingdate, id } =
    related || {};
  if (isLoading) return <Loader show={isLoading} />;

  const { icon, color } = DeviceIcons.null || {};

  const CalcItem = () => (
    <ListItem key={id}>
      <NameWrap href={`/calculators/${id}`}>
        <Icon icon={icon} color={color} />
        <Name>{model || 'Вычислитель'}</Name>
        <Serial>{` (${serialNumber})`}</Serial>
      </NameWrap>

      <State>
        <Icon icon="status" color="#17B45A" />
        {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
      </State>
      <Span>{convertDate(futureCheckingDate)}</Span>
    </ListItem>
  );

  return (
    <ListWrap>
      <Loader show={isLoading} size="32">
        <Title>Соединение с вычислителем</Title>
        <CalcItem />
      </Loader>
    </ListWrap>
  );
};

export default RelatedDevicesNotCalculator;
