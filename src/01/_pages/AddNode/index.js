import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHousingStock, getCalculators } from './apiAddNode';
import Header from './components/Header';
import { Loader } from '../../../components';
import AddNodeForm from './components/AddNodeForm';
import ModalAddCalculator from './modals/ModalAddCalculator';
import ModalAddDevice from './modals/ModalAddDevice';
import { resources } from '../../tt-components/localBases';

export const AddNodeContext = React.createContext();

export const AddNode = () => {
  const { housingStockId, push } = useParams();
  const [housingStock, setHousingStock] = useState();
  const [calculators, setCalculators] = useState();
  const [calculatorsExtended, setCalculatorsExtended] = useState();
  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);
  const [currentCalculatorId, setCurrentCalculatorId] = useState(null);
  const [communicationPipes, setCommunicationPipes] = useState([]);
  const [entryNumber, setEntryNumber] = useState(null);
  const [resource, setResource] = useState(resources[0].value);
  const [node, setNode] = useState({});
  const [currentTabKey, setTab] = useState('1');

  useEffect(() => {
    console.log('node', node);
  }, [node]);

  useEffect(() => {
    console.log('communicationPipes', communicationPipes);
  }, [communicationPipes]);

  console.log('housingStockId', housingStockId);

  function handleCancel() {
    push(`objects/${housingStockId}`);
  }

  function handleChangeTab(value) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

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

  if (!housingStock || !calculators || !communicationPipes) {
    return <Loader size="64" show />;
  }

  const context = {
    handleCancel,
    currentTabKey,
    setTab,
    handleChangeTab,
    handleNext,
    node,
    setNode,
    housingStockId,
    calculators,
    addCalculator,
    setAddCalculator,
    addOdpu,
    setAddOdpu,
    communicationPipes,
    setCommunicationPipes,
    housingStock
  };
  return (
    <AddNodeContext.Provider value={context}>
      <div>
        <Header />
        <AddNodeForm />
        <ModalAddCalculator />
        <ModalAddDevice />
      </div>
    </AddNodeContext.Provider>
  );
};

export default AddNode;
