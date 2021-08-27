import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '01/components/Icon';
import { Button, Title } from '.';
import { ListItem, ListItemDescription, ListItemValue } from './ListItem';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.Component {
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
                    {x.resource}
                  </td>
                  <td
                    style={{
                      padding: '6px',
                      borderRight: '1px solid black',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {x.mountPlace}
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
                    {x.reading}
                  </td>
                  <td
                    style={{ padding: '6px', borderBottom: '1px solid black' }}
                  >
                    {x.readingDate}
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
            доверенности №6 от 5.05.2020г.
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

export const Certificate = ({ certificate }) => {
  const componentRef = useRef();

  return (
    <div>
      <ComponentToPrint ref={componentRef} certificate={certificate} />

      <ReactToPrint
        trigger={() => <a href="#">Print this out!</a>}
        content={() => componentRef.current}
      />
    </div>
  );
};

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
        {' '}
        <Icon icon="key" />
        <Title size="24" style={{ paddingLeft: '8px' }}>
          {firstName || 'Собственник: данные обновляются'}
        </Title>
        <div>
          <Certificate
            certificate={{
              fullName: firstName,
              address: {
                city: 'Нижнекамск',
                street: 'Тихая Аллея',
                housingStockNumber: '4А',
                apartmentNumber: '143',
              },
              device: [
                {
                  resource: 'ХВС',
                  mountPlace: 'ТУ',
                  model: 'СГВ',
                  serialNumber: '123456',
                  reading: '12.34',
                  readingDate: '01.08.2021',
                },
                {
                  resource: 'ГВС',
                  mountPlace: 'ТУ',
                  model: 'СГВ',
                  serialNumber: '456789',
                  reading: '87.69',
                  readingDate: '01.08.2021',
                },
                {
                  resource: 'Электроэнергия',
                  mountPlace: '--',
                  model: 'Меркурий',
                  serialNumber: '987321',
                  reading: 'День: 15444 Ночь: 5369',
                  readingDate: '01.08.2021',
                },
              ],
            }}
          />
        </div>
      </TitleWrap>
      <ListItem>
        <ListItemDescription>Номер лицевого счета</ListItemDescription>
        <ListItemValue>
          {personalAccountNumber || 'Данные обновляются'}
        </ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemDescription>Статус собственник</ListItemDescription>
        <ListItemValue>{test || 'Данные обновляются'}</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemDescription>Юридическое состояние</ListItemDescription>
        <ListItemValue>{test2 || 'Данные обновляются'}</ListItemValue>
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
