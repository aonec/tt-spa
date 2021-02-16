import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Steps } from 'antd';
import { getHousingStock, getCalculators } from './apiAddNode';
import Header from './components/Header';
import { Loader } from '../../../components';
import AddNodeForm from './components/AddNodeForm';
import ModalAddCalculator from './modals/ModalAddCalculator';
import ModalAddDevice from './modals/ModalAddDevice';
import { resources } from '../../tt-components/localBases';

export const AddNodeContext = React.createContext();

const communicationPipeTemplate = [{
  number: 1,
  entryNumber: 2,
  magistral: 'FeedFlow',
  devices: [
    {
      serialNumber: '1634033434354444',
      lastCheckingDate: '2021-02-05T06:25:25.707Z',
      futureCheckingDate: '2024-02-05T06:25:25.707Z',
      lastCommercialAccountingDate: '2021-02-05T06:25:25.707Z',
      futureCommercialAccountingDate: '2021-02-05T06:25:25.707Z',
      documentsIds: [],
      housingMeteringDeviceType: 'FlowMeter',
      resource: 'HotWaterSupply',
      model: 'THERMO 26122020',
      diameter: 12,
      pipe: {
        calculatorId: 2538469,
        entryNumber: 2,
        pipeNumber: 2,
        magistral: 'FeedFlow',
      },
    },
  ],
},
];

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
  const [currentTabKey, setTab] = useState('2');

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
        return { key: id, value: `${model} ${serialNumber}` };
      });

      // const calculatorsList = items.map((calculator) => {
      //   const { id, serialNumber, model } = calculator;
      //   return { value: id, label: `${model} ${serialNumber}` };
      // });
      setCalculators(calculatorsList);
      setCalculatorsExtended(items);
      console.log(calculatorsList);
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
    housingStock,
  };

  const { Step } = Steps;

  const Stages = () => {
    const arr = [{
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
    const stepsList = arr.map((step, index)=>{
        const {title, description} = step;
        return <Step title={title} />
    })
    return (
      <Steps direction="vertical" size="small" current={currentTabKey - 1}>
          {stepsList}
        {/*<Step title="Finished" description="This is a description." />*/}
        {/*<Step title="In Progress" description="This is a description." />*/}
        {/*<Step title="Waiting" description="This is a description." />*/}
      </Steps>
    );
  };

  return (
    <AddNodeContext.Provider value={context}>
      <div>
        <Header />
        <AddNodeForm />
        <Stages />
        <ModalAddCalculator />
        <ModalAddDevice />
      </div>
    </AddNodeContext.Provider>
  );
};

export default AddNode;
