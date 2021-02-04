import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHousingStock, getCalculators } from './apiAddNode';
import Header from './components/Header';
import { Loader } from '../../../components';
import AddNodeForm from './components/AddNodeForm';
import ModalAddCalculator from './modals/ModalAddCalculator';
import ModalAddDevice from './modals/ModalAddDevice';
import { resources } from '../../tt-components/localBases';

export const AddNode = () => {
  const { housingStockId } = useParams();
  const [housingStock, setHousingStock] = useState();
  const [calculators, setCalculators] = useState();
  const [calculatorsExtended, setCalculatorsExtended] = useState();
  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);
  const [currentCalculatorId, setCurrentCalculatorId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [communicationPipes, setCommunicationPipes] = useState([]);
  const [entryNumber, setEntryNumber] = useState(null);
  const [resource, setResource] = useState(resources[0].value);
  // const devicesArr = [
  //   {
  //     serialNumber: '1234567890',
  //     lastCheckingDate: '2021-02-04T12:28:10.477Z',
  //     futureCheckingDate: '2021-02-04T12:28:10.477Z',
  //     lastCommercialAccountingDate: '2021-02-04T12:28:10.477Z',
  //     documentsIds: [],
  //     futureCommercialAccountingDate: '2021-02-04T12:28:10.477Z',
  //     housingMeteringDeviceType: 'string',
  //     resource: 'HotWaterSupply',
  //     model: 'ПРЭМ 1',
  //     pipeId: 0,
  //     pipe: {
  //       calculatorId: 0,
  //       entryNumber: 1,
  //       hubNumber: 2,
  //       pipeNumber: 3,
  //       magistral: 'Flow',
  //     },
  //     diameter: 0,
  //   },
  //   {
  //     serialNumber: '0987654321',
  //     lastCheckingDate: '2021-02-04T12:28:10.477Z',
  //     futureCheckingDate: '2021-02-04T12:28:10.477Z',
  //     lastCommercialAccountingDate: '2021-02-04T12:28:10.477Z',
  //     documentsIds: [],
  //     futureCommercialAccountingDate: '2021-02-04T12:28:10.477Z',
  //     housingMeteringDeviceType: 'string',
  //     resource: 'ColdWaterSupply',
  //     model: 'ПРЭМ 2',
  //     pipeId: 0,
  //     pipe: {
  //       calculatorId: 0,
  //       entryNumber: 4,
  //       hubNumber: 5,
  //       pipeNumber: 6,
  //       magistral: 'string',
  //     },
  //     diameter: 0,
  //   },
  // ];
  //  const [devices, setDevices] = useState(devicesArr);

  console.log('housingStockId', housingStockId);

  function getPresentCalculators() {
    getCalculators(housingStockId).then((res) => {
      const { items } = res;
      const calculatorsList = items.map((calculator) => {
        const { id, serialNumber, model } = calculator;
        return { value: id, label: `${model} ${serialNumber}` };
      });
      setCalculators(calculatorsList);
      setCalculatorsExtended(items);
      console.log(items);
    });
  }

  useEffect(() => {
    getHousingStock(housingStockId).then((res) => {
      setHousingStock(res);
      console.log(res);
    });
    getPresentCalculators();
  }, []);

  useEffect(() => {
    getPresentCalculators();
  }, [addCalculator]);

  if (!housingStock || !calculators || !devices) {
    return <Loader size="64" show />;
  }
  const props = {
    housingStock,
    addCalculator,
    setAddCalculator,
    calculators,
    housingStockId,
    currentCalculatorId,
    setCurrentCalculatorId,
    addOdpu,
    setAddOdpu,
    devices,
    setDevices,
    entryNumber,
    setEntryNumber,
    calculatorsExtended,
    setCalculatorsExtended,
    resource,
    setResource,
    communicationPipes,
    setCommunicationPipes,
  };
  return (
    <div>
      <Header {...props} />
      <AddNodeForm {...props} />
      <ModalAddCalculator {...props} />
      <ModalAddDevice {...props} />
    </div>
  );
};

export default AddNode;
