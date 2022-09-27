import React, { useState, useEffect, useContext } from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { ObjectContext } from '../../../index';
import { getObjectCalculators } from './apiAddOdpu';

const ModalAddDevice = () => {
  const [calculators, setCalculators] = useState([]);
  const { setAddOdpu, addOdpu, objid } = useContext(ObjectContext);

  function handleCancel() {
    setAddOdpu(false);
  }

  useEffect(() => {
    async function setCalculatorsList() {
      try {
        if (!objid) return;
        const objCalculators = await getObjectCalculators(objid);
        const calcOnly = objCalculators.map((item) => ({
          ...item,
          value: item.id,
          label: `${item.model} (${item.serialNumber})`,
        }));
        setCalculators(calcOnly);
      } catch (error) {}
    }
    setCalculatorsList();
  }, []);

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
        handleCancel={handleCancel}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
