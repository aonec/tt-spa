import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHousingStock, getCalculators } from './apiAddNode';
import Header from './components/Header';
import { Loader } from '../../components';
import AddNodeForm from './components/AddNodeForm';
import { AddNodeContext } from './AddNodeContext';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { HousingStockResponse } from '../../../myApi';

export const AddNode = () => {
  const { housingStockId, push } = useParams();
  const [
    housingStock,
    setHousingStock,
  ] = useState<HousingStockResponse | null>();
  const [calculators, setCalculators] = useState<any>();
  const [calculatorsExtended, setCalculatorsExtended] = useState<any>();
  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);
  const [addNode, setAddNode] = useState(false);
  const [communicationPipes, setCommunicationPipes] = useState([]);
  const [node, setNode] = useState({});
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

  function handleChangeTab(value: string) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function isEmpty(obj: any) {
    for (const key in obj) {
      // если тело цикла начнет выполняться - значит в объекте есть свойства
      return false;
    }
    return true;
  }

  function getPresentCalculators() {
    getCalculators(housingStockId).then((res) => {
      console.log(res);
      const calculatorsList = res?.map((calculator) => {
        const { id, serialNumber, model } = calculator;
        return { value: id, label: `${model} ${serialNumber}` };
      });

      setCalculators(calculatorsList);
      setCalculatorsExtended(res);
    });
  }

  useEffect(() => {
    getHousingStock(housingStockId).then((res) => {
      setHousingStock(res);
    });
    getPresentCalculators();
  }, []);

  useEffect(() => {
    getPresentCalculators();
  }, [addCalculator]);

  if (!housingStock || !calculators || !communicationPipes) {
    return <Loader size={32} show={true} />;
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
