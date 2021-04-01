import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import {
  CalculatorListResponse,
  CalculatorListResponsePagedList,
  CalculatorResponse,
  NodeResponse,
} from '../../../../../myApi';
import { getObjectCalculators } from './apiAddOdpu';

interface ModalAddDeviceInterface {
  node: NodeResponse;
  calculator: CalculatorResponse | null;
  nodeId?: number;
  setAddDevice: Dispatch<SetStateAction<boolean>>;
  addDevice: boolean;
  handleCancel?: any;
}

const ModalAddDevice = ({
  setAddDevice,
  addDevice,
  calculator,
  node,
}: ModalAddDeviceInterface) => {
  const handleCancel = () => {
    setAddDevice(false);
  };
  const [calculators, setCalculators] = useState<
    CalculatorListResponse[] | null
  >([]);

  useEffect(() => {
    if (calculator) {
      getObjectCalculators(calculator.address.id).then((res) => {
        setCalculators(res);
      });
    }
  }, [calculator]);
  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addDevice}
    >
      <AddDeviceForm
        handleCancel={handleCancel}
        calculator={calculator}
        node={node}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
