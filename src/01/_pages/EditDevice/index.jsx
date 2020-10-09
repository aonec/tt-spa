import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import axios from '01/axios';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header, Button } from '01/tt-components';
import { TabsComponent } from './components/Tabs/Main';

const EditDevice = (props) => {
  const { onChangeFormValueByPath3 } = props;
  const { 0: objid, 1: deviceId } = useParams();

  const [calculator, setCalculator] = useState({});
  const buttonHandler = () => {
    console.log('buttonHandler');
    getCalculator();
  };
  const buttonHandler2 = () => {
    console.log('props', props);
  };

  const TEMPLATE = {
    address: {
      city: 'Нижнекамск',
      street: '50 лет Октября',
      housingStockNumber: '19',
      corpus: null,
    },
    closingDate: null,
    deviceAddress: 190,
    futureCheckingDate: '2020-09-29T17:07:14.469',
    futureCommercialAccountingDate: '2020-09-29T17:07:14.469',
    hubs: null,
    id: 1554454,
    ipV4: '192.168.0.1',
    isConnected: true,
    lastCheckingDate: '2020-09-29T17:07:14.469',
    lastCommercialAccountingDate: '2020-09-29T17:07:14.469',
    model: 'ТЭМ-106',
    port: 1234,
    serialNumber: '12345678qwerty7',
    underTransaction: false,
  };

  useEffect(() => {
    const name = 'housingStockId';
    const value = Number(objid);
    onChangeFormValueByPath3(name, value);
  }, []);

  async function getCalculator(id = '') {
    try {
      const res = await axios.get(`Calculators/${deviceId}`);
      setCalculator(res);
      // onChangeFormValueByPath3(path, value);

      return res;
    } catch (error) {
      console.log(error);
      throw {
        typeODPU: 'getCalculatorResources',
        message: 'Произошла ошибка при загрузке вычислителя',
      };
    }
  }

  useEffect(() => {
    _.forEach(calculator, (value, key) => {
      const path = key;
      console.log(key);
      console.log(value);
      onChangeFormValueByPath3(path, value);
    });
  }, [calculator]);

  return (
    <>
      <Header>ВКТ-7 (123456789). Редактирование</Header>
      <Button onClick={buttonHandler}>Button</Button>
      <Button onClick={buttonHandler2}>Button</Button>
      <TabsComponent calculator={calculator} />
    </>
  );
};

function mapStateToProps(state) {
  return {
    reducerEditDevice: state.reducerEditDevice,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onChangeFormValueByPath3: (path, value) => {
    dispatch({
      type: 'CALC_UPDATE_FORM_VALUE_BY_PATH3',
      payload: { path, value },
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDevice);
