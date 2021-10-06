import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '01/components/Icon';
import { Button, Title } from '.';
import { ListItem, ListItemDescription, ListItemValue } from './ListItem';
import moment from 'moment';

export class Certificate extends React.Component {
  render() {
    const { certificate } = this.props;
    const { fullName, address, individualDevices: devices } = certificate;
    const { city, street, housingStockNumber, apartmentNumber } = address;

    const nowDate = new Date();
    const months = [
      ' января ',
      ' февраля ',
      ' марта ',
      ' апреля ',
      ' июня ',
      ' июля ',
      ' августа ',
      ' сентября ',
      ' октября ',
      ' ноября ',
      ' декабря ',
    ];
    const strDate =
      nowDate.getDate() +
      months[nowDate.getMonth() - 1] +
      nowDate.getFullYear();
    return (
      <div
        className="messageBox"
        style={{ left: '454px', top: '66px', padding: '12px 24px' }}
      >
        <div style={{ textAlign: 'center', paddingBottom: '12px' }}>
          Справка о лицевом счете
        </div>
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgb(204, 204, 204)',
            marginBottom: '12px',
          }}
        />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 'bold', paddingBottom: '9px' }}>
            СПРАВКА №______________
          </div>
          <div>
            от <span style={{ textDecoration: 'underline' }}>{strDate}</span>
          </div>
          <div
            style={{
              paddingTop: '12px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            от абонентского отдела
            <br />
            АО "НК-Инжиниринг"
          </div>
          <div style={{ paddingTop: '24px', float: 'left' }}>дана: </div>
          <div
            style={{
              paddingTop: '24px',
              borderBottom: '1px solid black',
              marginLeft: '80px',
            }}
          >
            <input type={'text'} defaultValue={fullName} />
          </div>
          <div
            style={{
              clear: 'both',
              float: 'none',
              width: '0px',
              padding: '0px',
              margin: '0px',
            }}
          />
          <div style={{ paddingTop: '12px' }}>
            проживающей(ему) по адресу:{' '}
            <span style={{ textDecoration: 'underline' }}> {city} </span>, ул.
            <span style={{ textDecoration: 'underline' }}> {street} </span>, д.
            <span style={{ textDecoration: 'underline' }}>
              {' '}
              {housingStockNumber}{' '}
            </span>
            , кв.
            <span style={{ textDecoration: 'underline' }}>
              {' '}
              {apartmentNumber}{' '}
            </span>
          </div>
          <div style={{ paddingTop: '12px' }}>
            о том, что показания квартирных приборов учета на{' '}
            <span style={{ textDecoration: 'underline' }}>{strDate}</span>{' '}
            составляют:
          </div>
          <table
            cellSpacing="0px"
            style={{
              marginTop: '12px',
              borderTop: '1px solid black',
              borderRight: '1px solid black',
              borderBottom: 'none',
              borderLeft: '1px solid black',
              borderImage: 'initial',
              width: '100%',
            }}
          >
            <tbody>
              <tr style={{ fontWeight: 'bold' }}>
                <td
                  style={{
                    padding: '6px',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  Услуга
                </td>
                <td
                  style={{
                    padding: '6px',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  Место
                </td>
                <td
                  style={{
                    padding: '6px',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  Тип прибора
                </td>
                <td
                  style={{
                    padding: '6px',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  Номер прибора
                </td>
                <td
                  style={{
                    padding: '6px',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  Показания
                </td>
                <td
                  style={{
                    padding: '6px',
                    borderBottom: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  На дату
                </td>
              </tr>
              {devices?.map((x) => (
                <tr>
                  <td
                    style={{
                      padding: '6px',
                      borderRight: '1px solid black',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {x.resourceDescription}
                  </td>
                  <td
                    style={{
                      padding: '6px',
                      borderRight: '1px solid black',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {x.mountPlaceDescription}
                  </td>
                  <td
                    style={{
                      padding: '6px',
                      borderRight: '1px solid black',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {x.model}
                  </td>
                  <td
                    style={{
                      padding: '6px',
                      borderRight: '1px solid black',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {x.serialNumber}
                  </td>
                  <td
                    style={{
                      padding: '6px',
                      borderRight: '1px solid black',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {x.lastReadings}
                  </td>
                  <td
                    style={{ padding: '6px', borderBottom: '1px solid black' }}
                  >
                    {x.lastReadingsDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{ paddingTop: '36px', float: 'left', fontWeight: 'bold' }}
          >
            Представитель на основании
            <br />
            доверенности №6 от 11.01.2021г.
          </div>
          <div
            style={{ paddingTop: '36px', float: 'right', fontWeight: 'bold' }}
          >
            <br />
            _______________ О.В. Филиппова
          </div>
        </div>
      </div>
    );
  }
}

const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;
const Owner = (props) => {
  const descriptions = [
    'Номер лицевого счета',
    'Статус собственник',
    'Юридическое состояние',
    'Контактный номер телефона',
  ];

  const { firstName, personalAccountNumber, phoneNumber, test, test2 } = props;
  return (
    <>
      <TitleWrap style={{ paddingTop: '32px' }}>
        <Icon icon="key" />
        <Title size="24" style={{ paddingLeft: '8px' }}>
          {firstName?.replaceAll(' unknown', '') ||
            'Собственник: данные обновляются'}
        </Title>
      </TitleWrap>
      <ListItem>
        <ListItemDescription>Номер лицевого счета</ListItemDescription>
        <ListItemValue>
          {personalAccountNumber || 'Данные обновляются'}
        </ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemDescription>Контактный номер телефона</ListItemDescription>
        <ListItemValue>{phoneNumber || 'Данные обновляются'}</ListItemValue>
      </ListItem>

      <Button style={{ marginTop: '16px' }}>
        Перейти в профиль собственника
      </Button>
    </>
  );
};

export default Owner;
