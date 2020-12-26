import React, { useState, useEffect, useContext } from 'react';
import { StyledFooter, StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { ObjectContext } from '../../index';
import { getObjectCalculators } from './apiAddOdpu';
import { ButtonTT } from '../../../../tt-components/ButtonTT';

const ModalAddDevice = () => {
  const [calculators, setCalculators] = useState([]);
  const [currentTabKey, setTab] = useState('1');
  const [calculator, setCalculator] = useState();
  const [pipes, setPipes] = useState()
  const { addOdpu, setAddOdpu, objid } = useContext(ObjectContext);

  useEffect(() => {
    if (calculator) {
      const { hubs } = calculator;
      const res = [];
      hubs.map((item, index) => {
        // console.log(index);
        // console.log(item.hub.pipeNumber);
        res.push(item.hub.pipeNumber);
      });

      setPipes(res)
      console.log("res", res)

    }
  },[calculator])

  function handleCancel() {
    setAddOdpu(false);
  }

  function handleChangeTab(value) {
    setTab(value);
  }

  useEffect(() => {
    console.log('calculator', calculator);
  }, [calculator]);

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function handleCancel() {
    setAddOdpu(false);
  }


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

  const Buttons = () => {
    const OkButton = () => {
      if (currentTabKey !== '3') {
        return (
          <ButtonTT
            color="blue"
            onClick={handleNext}
            big
            // disabled={coldandthermo}
          >
            Далее
          </ButtonTT>
        );
      }
      return null;
    };
    const NextOkButton = () => {
      if (currentTabKey === '3') {
        return (
          <ButtonTT
            color="blue"
            type="submit"
            form="formikFormAddOdpu"
            big
            // disabled={coldandthermo}
          >
            Добавить
          </ButtonTT>
        );
      }
      return null;
    };

    const CancelButton = () => (
      <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
        Отмена
      </ButtonTT>
    );

    return (
      <StyledFooter>
        <NextOkButton style={{ marginLeft: '16px' }} />
        <OkButton style={{ marginLeft: '16px' }} />
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

      <AddDeviceForm
        calculators={calculators}
        setAddOdpu={setAddOdpu}
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
        calculator={calculator}
        setCalculator={setCalculator}
        pipes={pipes}
        setPipes={setPipes}
      />
      <Buttons />
    </StyledModal>
  );
};

export default ModalAddDevice;
