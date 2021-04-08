import React, { useContext } from 'react';
import { Subtitle } from '../../../_components/Headers';
import { ListItem, Title } from '../../../tt-components/List';
import moment from 'moment';
import { SettingsContext } from '../index';
import styled from 'styled-components';

const CompanyInfo = () => {
  const { firm } = useContext(SettingsContext);
  const { id, name, phoneNumber, timeZoneOffset } = firm || {};

  const timeOffset = Number(timeZoneOffset.split(':')[0]);
  debugger;
  return (
    <div style={{ width: '66%' }}>
      <Title>Информация о компании</Title>
      <CompanyItem>
        <span>Название</span>
        <div style={{ fontWeight: 500 }}>{name}</div>
      </CompanyItem>
      <CompanyItem>
        <span>Адрес</span>
        <div style={{ color: 'var(--main-80)' }}>Адрес компании</div>
      </CompanyItem>
      <CompanyItem>
        <span>Электронная почта</span>
        <div>qwerty@yandex.ru</div>
      </CompanyItem>
      <CompanyItem>
        <span>Контактный телефон</span>
        <div>{phoneNumber ? phoneNumber : '+7 888 888-88-88'}</div>
      </CompanyItem>
      <CompanyItem>
        <span>Часовой пояс</span>
        <div>UTC+{timeOffset}</div>
      </CompanyItem>
    </div>
  );
};

const CompanyItem = styled(ListItem)`
  span {
    color: var(--main-60);
  }
`;

export default CompanyInfo;
