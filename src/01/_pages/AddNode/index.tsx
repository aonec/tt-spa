import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { Loader } from '../../components';
import AddNodeForm from './components/AddNodeForm';
import { AddNodeContext } from './AddNodeContext';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { HousingStockResponse } from '../../../myApi';
import {
  getHousingStock,
  getHousingStockCalculators,
} from '../../_api/apiRequests';

export const AddNode = () => {
  const { housingStockId, push } = useParams();
  const [
    housingStock,
    setHousingStock,
  ] = useState<HousingStockResponse | null>();

  const [calculators, setCalculators] = useState<any>();

  //Модальные окна
  const [addCalculatorVisible, setAddCalculatorVisible] = useState(false);
  const [addHousingVisible, setAddHousingVisible] = useState(false);
  const [nodeModalVisible, setNodeModalVisible] = useState(false);

  //Модальное окно итоговое
  const [addNode, setAddNode] = useState(false);

  const [calculatorForm, setCalculatorForm] = useState({});
  const [nodeForm, setNodeForm] = useState({});
  const [communicationPipes, setCommunicationPipes] = useState([]);

  const [currentTabKey, setTab] = useState('1');

  const stepsArr: Array<TabsItemInterface> = [
    {
      title: 'Настройки соединения',
      key: '1',
      cb: () => setTab('1'),
      description: 'This is a description.',
    },
    {
      title: 'Общие данные',
      key: '2',
      cb: () => setTab('2'),
      description: 'This is a description.',
    },
    {
      title: 'Подключенные приборы',
      key: '3',
      cb: () => setTab('3'),
      description: 'This is a description.',
    },
  ];

  function handleCancel() {
    push(`objects/${housingStockId}`);
  }

  function handleCurrent(value: string) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function handlePrevious() {
    setTab(String(Number(currentTabKey) - 1));
  }

  useEffect(() => {
    getHousingStock(housingStockId).then((res) => {
      setHousingStock(res);
    });
    getHousingStockCalculators(housingStockId).then((res) => {
      const calculatorsList = res?.map((calculator) => {
        const { id, serialNumber, model } = calculator;
        return { ...calculator, key: id, value: `${model} ${serialNumber}` };
      });

      setCalculators(calculatorsList);
    });
  }, []);

  if (!housingStock || !calculators) {
    return <Loader size={32} show={true} />;
  }

  const context = {
    handleCancel,
    currentTabKey,
    setTab,
    handleCurrent,
    handleNext,
    handlePrevious,
    calculatorForm,
    setCalculatorForm,
    nodeForm,
    setNodeForm,
    housingStockId,
    calculators,
    addCalculatorVisible,
    setAddCalculatorVisible,
    addHousingVisible,
    setAddHousingVisible,
    communicationPipes,
    setCommunicationPipes,
    housingStock,
    stepsArr,
    nodeModalVisible,
    setNodeModalVisible,
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
