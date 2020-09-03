import React, { useContext } from 'react';
import styled from 'styled-components';
import { convertDate } from '01/_api/utils/convertDate';
import { Loader } from '01/components';
import { DeviceContext } from '../DeviceProfile';

const InformationWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

const Title = styled.h2`
`;

const ListItem = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
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

export const Information = () => {
  // const DeviceProfileContext = useContext(DeviceContext);
  const { device, building } = useContext(DeviceContext);

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  if (device && building) {
    const { city, street, number } = building;
    const { commercialAccountingDate, futureCheckingDate, lastCheckingDate } = device;

    return (
      <InformationWrap>
        <Title>Информация</Title>
        <ListItem>
          <span>Адрес</span>
          <span style={{ fontWeight: '500' }}>
            {`${city},${street},${number}`}
          </span>
        </ListItem>
        <ListItem>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDate(commercialAccountingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата поверки прибора</span>
          <span>{convertDate(lastCheckingDate)}</span>
        </ListItem>
        <ListItem>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDate(futureCheckingDate)}</span>
        </ListItem>
        {/* </info_list> */}
      </InformationWrap>
    );
  }
  // пока не получили данные - показываем Loader
  return <Loader show size="32" />;
};

export default Information;
