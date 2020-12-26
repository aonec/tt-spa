import React, { useState, useEffect, useContext } from 'react';
import { Title, ButtonTT } from '../../../../tt-components';
import { StyledFooter, StyledModal, StyledModalBody } from '../../../../tt-components/Modal';
import TabsComponent from './components/Main';
import AddDeviceForm from './components/AddDeviceForm';
import { ObjectContext } from '../../index';
import { getObjectCalculators } from './apiAddOdpu';

const ModalAddDevice = () => {
  const [currentTabKey, setTab] = useState('1');
  const [calculators, setCalculators] = useState([]);
  const { addOdpu, setAddOdpu, objid } = useContext(ObjectContext);

  useEffect(() => {
    async function setCalculatorsList() {
      try {
        const objCalculators = await getObjectCalculators(objid);
        const { items } = objCalculators;
        const calcOnly = items.map((item) => ({ ...item, value: item.id, label: `${item.model} (${item.serialNumber})` }));
        setCalculators(calcOnly);
      } catch (error) {
        console.log(error);
      }
    }
    setCalculatorsList();
  }, []);

  function handleCancel() {
    setAddOdpu(false);
  }

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const Buttons = () => {
    const NextOkButton = () => {
      if (currentTabKey === '3') {
        return (
          <ButtonTT
            color="blue"
            type="submit"
            form="formikFormAddOdpu"
            big
          >
            Добавить
          </ButtonTT>
        );
      }
      else {
        return (
          <ButtonTT
            color="blue"
            onClick={handleNext}
            big
          >
            Далее
          </ButtonTT>
        );
      }
    };

    const CancelButton = () => (
      <ButtonTT color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
        Отмена
      </ButtonTT>
    );

    return (
      <StyledFooter>
        <NextOkButton style={{ marginLeft: '16px' }} />
        <CancelButton />
      </StyledFooter>
    );
  };

  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
      // visible
    >
      <StyledModalBody>
        <AddDeviceForm currentTabKey={currentTabKey} handleChangeTab={handleChangeTab} calculators={calculators} handelCancel={handleCancel} setAddOdpu={setAddOdpu} />
      </StyledModalBody>
      <Buttons />

    </StyledModal>
  );
};

export default ModalAddDevice;
