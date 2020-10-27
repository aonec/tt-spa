import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios';
import { Title, ButtonTT } from '../../../../tt-components';
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from '../../../../tt-components/Modal';
import TabsComponent from './components/Main';
import AddDeviceForm from './components/AddDeviceForm';

const ModalAddDevice = () => {
  const { 0: objid } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();
  const [calculators, setCalculators] = useState([]);

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
    getObjectCalculators(objid).then((res) => {
      // console.log(res)
      const calcOnly = [];
      const { items } = res;
      items.map((item) => {
        const deviceForSelect = { ...item, value: item.id, label: `${item.model } (${item.serialNumber })`};
        calcOnly.push(deviceForSelect);
      });
      setCalculators(calcOnly);
    });
  }, []);

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const buttonHandler = () => {
        console.log(calculators)
  };

  const renderNextButton = () => {
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

  const renderSubmitButton = () => {
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

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  return (
    <Modal id="add-device" ref={modalRef}>
      <ModalWrap>
        <ModalClose getModal={modalRef} />
        <ModalTop>
          {/*<ButtonTT onClick={buttonHandler}>ButtonTT</ButtonTT>*/}
          <Title size="middle" color="black">
            Добавление нового ОДПУ
          </Title>
        </ModalTop>
        <ModalMain>
          <TabsComponent
            currentTabKey={currentTabKey}
            handleChangeTab={handleChangeTab}
          />
          <AddDeviceForm currentTabKey={currentTabKey} calculators={calculators} />
        </ModalMain>
        <ModalBottom>
          <ButtonTT color="white" onClick={hideMe}>
            Отмена
          </ButtonTT>
          {renderNextButton()}
          {renderSubmitButton()}
        </ModalBottom>
      </ModalWrap>
    </Modal>
  );
};

export default ModalAddDevice;
