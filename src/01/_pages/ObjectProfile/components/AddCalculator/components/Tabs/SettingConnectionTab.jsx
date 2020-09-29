import React, { useContext } from 'react';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import { AddDeviceContext } from '../../index';

const SettingConnectionTab = () => {
  const {
    form,
    onInputChange,
    datetoISOString,
    addPeriod,
    onSelectChange,
  } = useContext(AddDeviceContext);

  const {
    serialNumberRandom,
    deviceAddressRandom,
    serialNumber,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    port,
    infoId,
    ipV4,
  } = form;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputWrap>
        <Label color="grey" htmlFor="#resource" className="tt-label">
          IP адрес вычислителя
        </Label>
        <InputTT
          id="ipV4"
          type="text"
          required
          placeholder="192.168.0.1"
          defaultValue="192.168.0.1"
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Порт
        </Label>
        <InputTT
          id="port"
          type="number"
          required
          placeholder="1234"
          defaultValue="1234"
          onChange={(event) => onInputChange(event)}
        />
      </InputWrap>

      <Wrap
        style={{
          background: ' rgba(255, 140, 104, 0.16)',
          marginTop: '24px',
          padding: '24px',
        }}
      >
        Подключение к новому прибору может занять до 30 минут.
      </Wrap>
    </div>
  );
};

export default SettingConnectionTab;
