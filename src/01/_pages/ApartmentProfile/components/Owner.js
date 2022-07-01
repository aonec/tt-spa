/* eslint-disable */

/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '01/components/Icon';
import { Button, Title } from '.';
import { ListItem, ListItemDescription, ListItemValue } from './ListItem';
import { Flex } from '01/shared/ui/Layout/Flex';
import { CheckLg, Pen, XLg } from 'react-bootstrap-icons';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { InputSC } from '01/shared/ui/Fields';
import axios from '01/axios';
import { message } from 'antd';
import { useEffect } from 'react';
import moment from 'moment';

export const Certificate = (props) => {
  const { certificate } = props;
  const { fullName: name, address, individualDevices: devices } = certificate;
  const { city, street, housingStockNumber, apartmentNumber } = address;

  const [fullName, setFullName] = useState(name);

  useEffect(() => setFullName(name), [name]);

  const strDate = moment().format('DD MMMM YYYY');

  return (
    <div
      ref={props.ref}
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
            value={fullName}
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
  const { name, personalAccountNumber, phoneNumber, id } = props;

  const {
    cellphone,
    setCellphone,
    cancel,
    isEditMode,
    setIsEditMode,
    loading,
    saveCellPhone,
  } = useEditOwnerCellphone(phoneNumber, id);

  const edtCellphone = (
    <Flex>
      <InputSC
        disabled={loading}
        onChange={(e) => setCellphone(e.target.value)}
        value={cellphone}
      />
      <Space />
      <IconWrap>
        <CheckLg onClick={saveCellPhone} />
      </IconWrap>
      <Space />
      <IconWrap>
        <XLg onClick={cancel} />
      </IconWrap>
    </Flex>
  );

  return (
    <>
      <TitleWrap style={{ paddingTop: '32px' }}>
        <Icon icon="key" />
        <Title size="24" style={{ paddingLeft: '8px' }}>
          {name?.replaceAll(' unknown', '') ||
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
        <ListItemValue>
          {isEditMode ? (
            edtCellphone
          ) : (
            <Flex>
              <div>{cellphone || 'Данные обновляются'}</div>
              <Space />
              <Pen
                onClick={() => setIsEditMode(true)}
                style={{ cursor: 'pointer' }}
              />
            </Flex>
          )}
        </ListItemValue>
      </ListItem>

      <Button style={{ marginTop: '16px' }}>
        Перейти в профиль собственника
      </Button>
    </>
  );
};

const IconWrap = styled.div`
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

function useEditOwnerCellphone(initialCellphone, id) {
  const [cellphone, setCellphone] = useState(initialCellphone);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevCellphone, setPrevCellphone] = useState(initialCellphone);

  async function saveCellPhone() {
    setLoading(true);

    try {
      await axios.put(`Homeowners/${id}`, { cellphone });

      setIsEditMode(false);
      setPrevCellphone(cellphone);

      message.success('Новый номер успешно сохранен');
    } catch (error) {
      message.error('Не удалось сохранить номер телефона');
    }

    setLoading(false);
  }

  const cancel = () => {
    setIsEditMode(false);
    setCellphone(prevCellphone);
  };

  return {
    cellphone,
    setCellphone,
    isEditMode,
    setIsEditMode,
    cancel,
    loading,
    saveCellPhone,
  };
}

export default Owner;
