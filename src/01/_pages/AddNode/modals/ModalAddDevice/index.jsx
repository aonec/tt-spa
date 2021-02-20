import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { AddNodeContext } from '../../index';

const ModalAddDevice = (props) => {
  const { setAddOdpu, addOdpu} = useContext(AddNodeContext);
  function handleCancel() {
    setAddOdpu(false);
  }
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

// import {getObjectCalculators} from './apiAddOdpu';

// const [calculators, setCalculators] = useState([]);

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
