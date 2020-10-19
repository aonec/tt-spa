import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { ButtonTT, Header } from '../../tt-components';
import TabsComponent from './components/Tabs/Main';
import { getDevice, getObjectOfDevice, getRelatedDevices } from '../../_api/device_page';
import {
  setAddDeviceForm,
  onChangeDeviceFormValueByPath,
  setObjectForm,
  onChangeObjectFormValueByPath,
} from '../../Redux/actions/actions';
import './editodpu.scss';
import axios from '../../axios';
import FormEditODPU from './components/form'

const EditODPU = () => {
  const { 0: objid, 1: deviceId } = useParams();

  const [currentTabKey, setTab] = useState('1');
  const [calculatorId, setCalculatorId] = useState();
  const [device, setDevice] = useState();
  const [object, setObject] = useState({});
  const { model, serialNumber } = {...device};

  const dispatch = useDispatch();
  const deviceReducer = useSelector((state) => state.deviceReducer);
  const objectReducer = useSelector((state) => state.objectReducer);

  function randomInteger(min, max){
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function handleChangeTab(value){
    setTab(value);
  }

  useEffect(() => {
    getDevice(deviceId).then((res) => {
      setDevice(res);
    });
    getRelatedDevices(deviceId).then((res) => {
      const { id } = res[0];
      setCalculatorId(id);
    });
  }, []);

  useEffect(() => {
    dispatch(onChangeDeviceFormValueByPath(['calculatorId'], calculatorId));
  }, [calculatorId]);

  useEffect(() => {
    if (device) {
      const {
        closingDate,
        deviceAddress,
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
      } = device;
      const initialStateDefaultValues = {
        calculatorId,
        checkingDate: lastCheckingDate,
        connection: {
          ipV4: ipV4 || '10.90.128.1',
          deviceAddress: randomInteger(1, 255),
          port: port || 0,
        },
        futureCheckingDate,
        futureCommercialAccountingDate,
        housingMeteringDeviceType: type,
        housingStockId,
        lastCommercialAccountingDate,
        model,
        pipe: {
          entryNumber: 1,
          hubNumber: 1,
          pipeNumber: 1,
          magistral: 'FeedFlow',
        },
        resource,
        serialNumber,
      };

      dispatch(onChangeDeviceFormValueByPath(['calculatorId'], calculatorId));
      dispatch(
        setAddDeviceForm(deviceReducer, initialStateDefaultValues),
      );
    }

  }, [device]);

  useEffect(() => {
    getDevice(deviceId).then((res) => {
      setDevice(res);
    });
    getRelatedDevices(deviceId).then((res) => {
      const { id } = res[0];
      setCalculatorId(id);
    });
  }, []);

  if (device) {
    return (
      <>
        <Header>{`${model || 'Загрузка данных'} (${serialNumber || 'Загрузка данных'}). Редактирование`}</Header>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <FormEditODPU currentTabKey={currentTabKey} device={device}/>


      </>
    )
  }
  else return (<div>Загрузка данных</div>)

};
export default EditODPU;
