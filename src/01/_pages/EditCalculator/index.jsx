import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import '../../tt-components/antd.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../../axios';
import { ButtonTT, Header } from '../../tt-components';
import { items } from './components/CalculatorJSON';
import TabsComponent from './components/Tabs/Main';
import { setAddCalculatorForm } from '../../Redux/actions/actions';

const EditCalculator = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const dispatch = useDispatch();
  const calculatorPage = useSelector((state) => state.calculatorPage);
  const [currentCalc, setCurrentCalc] = useState();
  const [model, setModel] = useState();

  function randomInteger(min, max){
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  async function getCalculator(url = ''){
    try {
      const res = await axios.get(`MeteringDevices/${url}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCalculator(deviceId).then((result) => setCurrentCalc(result));
  }, []);

  useEffect(() => {
    if (currentCalc) {
      const {
        calculator,
        canBeEdited,
        closingDate,
        deviceAddress,
        diameter,
        futureCheckingDate,
        futureCommercialAccountingDate,
        housingStockId,
        id,
        ipV4,
        lastCheckingDate,
        lastCommercialAccountingDate,
        model,
        port,
        resource,
        serialNumber,
        type,
        underTransaction,
      } = currentCalc;

      const currentInfoId = _.find(items, { label: model || 'ТЭМ-106' });
      const { value } = currentInfoId;

      const initialStateDefaultValues = {
        serialNumber,
        checkingDate: lastCommercialAccountingDate,
        futureCheckingDate,
        lastCommercialAccountingDate,
        connection: {
          ipV4,
          deviceAddress: deviceAddress || randomInteger(1, 255),
          port,
        },
        futureCommercialAccountingDate,
        housingStockId,
        infoId: Number(value),
      };

      const temp = _.find(items, { value });
      const { label } = temp
      console.log('label', label);
      setModel(label);
      dispatch(setAddCalculatorForm(calculatorPage, initialStateDefaultValues));
    }
  }, [currentCalc]);

  function handleChangeTab(value){
    setTab(value);
  }

  const hideMe = () => {
    // $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.put(`Calculators/${deviceId}`, calculatorPage);
      alert('Вычислитель успешно изменен!');
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert(
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

  return (
    <>
      <Header>{`${model} (${calculatorPage.serialNumber}). Редактирование`}</Header>
      {/* <button onClick={buttonHandler}>getKey</button> */}
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
      <div>
        <ButtonTT
          color="blue"
          style={{ marginRight: '16px' }}
          onClick={handleSubmit}
        >
          Сохранить
        </ButtonTT>

        <NavLink to={`/objects/${objid}/devices/${deviceId}`}>
        <ButtonTT color="white" onClick={hideMe}>
          Отмена
        </ButtonTT>
        </NavLink>
      </div>
    </>
  );
};

export default connect()(EditCalculator);
