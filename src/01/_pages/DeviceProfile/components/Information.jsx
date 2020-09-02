import React, { useContext } from 'react';
import styled from 'reshadow/macro';
import { information } from '01/r_comp';
import { convertDate } from '01/_api/utils/convertDate';
import { DeviceContext } from '../DeviceProfile';

export const Information = () => {
  const DeviceProfileContext = useContext(DeviceContext);

  const { city, street, number } = { ...DeviceProfileContext.building }
  const {
    model, serialNumber, type, commercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
  } = { ...DeviceProfileContext.device }

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  return styled(information)`
  `(
    <information>
      <h2>Информация</h2>
      <info_list>
        <info_item>
          <span>Адрес</span>
          <span style={{fontWeight:'500'}}>{city}, {street}, {number}</span>
        </info_item>
        <info_item>
          <span>Дата ввода в эксплуатацию</span>
          <span>{convertDate(commercialAccountingDate)}</span>
        </info_item>
        <info_item>
          <span>Дата поверки прибора</span>
          <span>{convertDate(lastCheckingDate)}</span>
        </info_item>
        <info_item>
          <span>Дата следующей поверки прибора</span>
          <span>{convertDate(futureCheckingDate)}</span>
        </info_item>
      </info_list>

    </information>,
  );
};

export default Information;
