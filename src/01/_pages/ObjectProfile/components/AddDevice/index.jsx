import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'antd';
import axios from '../../../../axios';
import { Title, ButtonTT } from '../../../../tt-components';
import TabsComponent from './components/Main';
import AddDeviceForm from './components/AddDeviceForm';
import { ObjectContext } from '../../index';

const ModalAddDevice = () => {
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();
  const [calculators, setCalculators] = useState([]);
  const { addOdpu, setAddOdpu, objid } = useContext(ObjectContext);
  const handleCancel = () => {
    setAddOdpu(false);
  };

  async function getObjectCalculators(id = '') {
    try {
      const res = await axios.get(`Calculators?Filter.HousingStockId=${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  useEffect(() => {
    async function someFunc() {
      try {
        const objCalculators = await getObjectCalculators(objid);
        const { items } = objCalculators;
        const calcOnly = items.map((item) => ({ ...item, value: item.id, label: `${item.model} (${item.serialNumber})` }));
        setCalculators(calcOnly);
      } catch (error) {
        console.log(error);
      }
    }
    someFunc();
  }, []);

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const buttonHandler = () => {
    console.log(calculators);
  };




  const Buttons = () => {
    const RenderNextButton = () => {
      if (currentTabKey === '3') {
        return null;
      }
      return (
        <ButtonTT
          color="blue"
          style={{ marginLeft: '16px' }}
          onClick={handleNext}
        >
          Далее
        </ButtonTT>
      );
    };

    const RenderSubmitButton = () => {
      if (currentTabKey !== '3') {
        return null;
      }
      return (
        <ButtonTT
          color="blue"
          style={{ marginLeft: '16px' }}
          type="submit"
          form="formikFormAddOdpu"
        >
          Выгрузить
        </ButtonTT>
      );
    };

    const CancelButton = () => (
      <ButtonTT color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
        Отмена
      </ButtonTT>
    );

    return (
      <div style={{margin:'32px 0'}}>
        <RenderNextButton />
        <RenderSubmitButton />
        <CancelButton />
      </div>
    );
  };


  return (
    <Modal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
    >
      <ButtonTT onClick={buttonHandler} hidden>ButtonTT</ButtonTT>
      <Title size="middle" color="black">
        Добавление нового ОДПУ
      </Title>
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
      <AddDeviceForm currentTabKey={currentTabKey} calculators={calculators} />

    <Buttons />
    </Modal>
  );
};

export default ModalAddDevice;
