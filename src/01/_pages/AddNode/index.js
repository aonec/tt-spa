import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHousingStock, getCalculators } from './apiAddNode';
import Header from './components/Header';
import { Loader } from '../../../components';
import AddNodeForm from './components/AddNodeForm';
import ModalAddCalculator from './modals/ModalAddCalculator';

export const AddNode = () => {
  const { housingStockId } = useParams();
  const [housingStock, setHousingStock] = useState();
  const [calculators, setCalculators] = useState();
  const [addCalculator, setAddCalculator] = useState(false);

  console.log('housingStockId', housingStockId);

  useEffect(() => {
    getHousingStock(housingStockId).then((res) => {
      setHousingStock(res);
      console.log(res);
    });

    getCalculators(housingStockId).then((res) => {
      const {items} = res;
      const calculatorsList = items.map((calculator) => {
        const {id, serialNumber, model} = calculator
        return {value: id, label: `${model} ${serialNumber}`}
      })
      setCalculators(calculatorsList);
      console.log(items);
    });

  }, []);

  if (!housingStock || !calculators) {
    return <Loader size="64" show />;
  }
  const props = { housingStock, addCalculator, setAddCalculator, calculators };
  return (
    <div>
      <Header {...props} />
      <AddNodeForm {...props} />
      <ModalAddCalculator {...props} />
    </div>
  );
};

export default AddNode;
