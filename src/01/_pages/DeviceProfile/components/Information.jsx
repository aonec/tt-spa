import React, { useContext } from 'react';
import { convertDate } from '01/_api/utils/convertDate';
import { Loader } from '01/components';
import { ListWrap, ListItem, Title } from '01/_components/List';
import { DeviceContext } from '../DeviceProfile';

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
      <ListWrap>
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
      </ListWrap>
    );
  }
  // пока не получили данные - показываем Loader
  return <Loader show size="32" />;
};

export default Information;
