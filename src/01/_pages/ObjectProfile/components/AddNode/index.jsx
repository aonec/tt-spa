import React, { useState, useEffect, useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddNodeForm from './components/AddNodeForm';
import { ObjectContext } from '../../index';
import { getObjectCalculators } from './apiAddNode';

const ModalAddNode = () => {
  const [calculators, setCalculators] = useState([]);
  const { setAddOdpu, addOdpu,objid } = useContext(ObjectContext);

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



  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={false}
      // visible
    >

      <AddNodeForm
        calculators={calculators}
        setAddOdpu={setAddOdpu}
        handleCancel={handleCancel}
      />
    </StyledModal>
  );
};

export default ModalAddNode;
