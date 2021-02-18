import React, { useState, useEffect, useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { getObjectCalculators } from './apiAddOdpu';
import {AddNodeContext} from "../../index";

const ModalAddDevice = (props) => {
  // const [calculators, setCalculators] = useState([]);
  const { setAddOdpu, addOdpu, housingStockId } = useContext(AddNodeContext);
  console.log('props', props);

  function handleCancel(){
    setAddOdpu(false);
  }

  // useEffect(() => {
  //   async function setCalculatorsList(){
  //     try {
  //       const objCalculators = await getObjectCalculators(housingStockId);
  //       const { items } = objCalculators;
  //       const calcOnly = items.map((item) => ({
  //         ...item,
  //         value: item.id,
  //         label: `${item.model} (${item.serialNumber})`
  //       }));
  //       setCalculators(calcOnly);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //
  //   setCalculatorsList();
  // }, []);


  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
    >

      <AddDeviceForm
        handleCancel={handleCancel}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
