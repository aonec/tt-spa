import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonTT, Header } from '../../tt-components';
import TabsComponent from './components/Tabs/Main';
import { getDevice } from '../../_api/device_page';
import { setAddDeviceForm } from '../../Redux/actions/actions';

const EditODPU = () => {
  const [currentTabKey, setTab] = useState('1');
  const [device, setDevice] = useState({});
  const {
    model, serialNumber,
  } = device;

  const { 0: objid, 1: deviceId } = useParams();

  const dispatch = useDispatch();
  const deviceReducer = useSelector((state) => state.deviceReducer);


  function randomInteger(min, max){
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function handleChangeTab(value){
    setTab(value);
  }

  useEffect(() => {
    console.log('device');
    getDevice(deviceId).then((res) => {
      setDevice(res);
    });
  }, []);

  useEffect(() => {
    if (device) {
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
      } = device;

      const initialStateDefaultValues = {
        calculatorId: '',
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

      dispatch(
        setAddDeviceForm(deviceReducer, initialStateDefaultValues),
      );
    }
  }, [device]);
  const buttonHandler = () => {
    console.log('buttonHandler');
  };
  const saveButtonHandler = () => {
    console.log("saveButtonHandler")
  }
  return (
    <>
      <Header>{`${model || 'Загрузка данных'} (${serialNumber || 'Загрузка данных'}). Редактирование`}</Header>
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
      <div>
        <ButtonTT
          color="red"
          onClick={buttonHandler}
        >
          TEST
        </ButtonTT>
        <ButtonTT
          type="submit"
          color="blue"
          form="formikForm"
          onClick={saveButtonHandler}
        >
          Снять прибор с учета
        </ButtonTT>
        <ButtonTT
          style={{ marginLeft: '16px' }}
          type="submit"
          color="white"
        >
          Отмена
        </ButtonTT>
      </div>

    </>
  );
};
export default EditODPU;
