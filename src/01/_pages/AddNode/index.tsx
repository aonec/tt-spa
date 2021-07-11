import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  const { housingStockId: housingStockIdStr } = useParams<{
    housingStockId: string;
  }>();
  const housingStockId = Number(housingStockIdStr);
  const { push } = useHistory();
  const [
    housingStock,
    setHousingStock,
  ] = useState<HousingStockResponse | null>();
  const [calculators, setCalculators] = useState<any>();
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

  function getPresentCalculators() {
    getHousingStockCalculators(housingStockId).then((res) => {
      const calculatorsList = res?.map((calculator) => {
        const { id, serialNumber, model } = calculator;
        return {
          ...calculator,
          key: id,
          value: `${model} ${serialNumber}`,
        };
      });
      setCalculators(calculatorsList);
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
    communicationPipes,
    setCommunicationPipes,
    housingStock,
    stepsArr,
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
