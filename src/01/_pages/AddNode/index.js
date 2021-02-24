import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHousingStock, getCalculators } from './apiAddNode';
import Header from './components/Header';
import { Loader } from '../../../components';
import AddNodeForm from './components/AddNodeForm';
import ModalAddCalculator from './modals/ModalAddCalculator';
import ModalAddDevice from './modals/ModalAddDevice';

export const AddNodeContext = React.createContext();

export const AddNode = () => {
  const { housingStockId, push } = useParams();
  const [housingStock, setHousingStock] = useState();
  const [calculators, setCalculators] = useState();
  const [calculatorsExtended, setCalculatorsExtended] = useState();
  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);
  const [addNode, setAddNode] = useState(false);
  const [communicationPipes, setCommunicationPipes] = useState([]);
  const [node, setNode] = useState({});
  const [currentTabKey, setTab] = useState('1');

  const stepsArr = [{
    title: 'Общие данные',
    description: 'This is a description.',
  },
  {
    title: 'Настройки соединения ',
    description: 'This is a description.',
  },
  {
    title: 'Подключенные приборы ',
    description: 'This is a description.',
  },
  ];

  function handleCancel() {
    push(`objects/${housingStockId}`);
  }

  function handleChangeTab(value) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function isEmpty(obj) {
    for (const key in obj) {
      // если тело цикла начнет выполняться - значит в объекте есть свойства
      return false;
    }
    return true;
  }

  // useEffect(() => {
  //   console.log('node', node);
  // }, [node]);

  // useEffect(() => {
  //   console.log('communicationPipes', communicationPipes);
  // }, [communicationPipes]);

  // console.log('housingStockId', housingStockId);

  function getPresentCalculators() {
    getCalculators(housingStockId).then((res) => {
      const { items } = res;
      const calculatorsList = items.map((calculator) => {
        const { id, serialNumber, model } = calculator;
        return { key: id, value: `${model} ${serialNumber}` };
      });

      setCalculators(calculatorsList);
      setCalculatorsExtended(items);
      // console.log(calculatorsList);
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
    calculatorsExtended,
    communicationPipes,
    setCommunicationPipes,
    housingStock,
    stepsArr,
    isEmpty,
    addNode,
    setAddNode,
  };

  return (
    <AddNodeContext.Provider value={context}>
      <div>
        <Header />
        <AddNodeForm />
      </div>
    </AddNodeContext.Provider>
  );
};

export default AddNode;
