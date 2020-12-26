import React, { useState, useEffect, useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { ObjectContext } from '../../index';
import { getObjectCalculators } from './apiAddOdpu';

const ModalAddDevice = () => {
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

  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
      // visible
    >

      <AddDeviceForm calculators={calculators} setAddOdpu={setAddOdpu} />

    </StyledModal>
  );
};

export default ModalAddDevice;
