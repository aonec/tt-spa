/* eslint-disable react/jsx-filename-extension */
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { Props } from './Certificate.types';

export const Certificate: FC<Props> = ({ certificate }) => {
  const { fullName: name, address, individualDevices: devices } = certificate;
  const { city, street, housingStockNumber, apartmentNumber } = address || {};

  const [fullName, setFullName] = useState(name);

  useEffect(() => setFullName(name), [name]);

  const strDate = moment().format('DD MMMM YYYY');

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
          ООО "Инженерный центр - НК"
        </div>
        <div style={{ paddingTop: '24px', float: 'left' }}>дана: </div>
        <div
          style={{
            paddingTop: '24px',
            borderBottom: '1px solid black',
            marginLeft: '80px',
          }}
        >
          <input
            type={'text'}
            value={fullName || ''}
            onChange={(e) => setFullName(e.target.value)}
          />
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
                <td style={{ padding: '6px', borderBottom: '1px solid black' }}>
                  {x.lastReadingsDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ paddingTop: '36px', float: 'left', fontWeight: 'bold' }}>
          Заместитель генерального директора
          <br />
          по работе с населением
        </div>
        <div style={{ paddingTop: '36px', float: 'right', fontWeight: 'bold' }}>
          <br />
          _______________ О.В. Филиппова
        </div>
      </div>
    </div>
  );
};
