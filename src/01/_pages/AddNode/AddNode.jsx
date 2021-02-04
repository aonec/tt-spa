import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHousingStock } from "./apiAddNode";
import Header from './components/Header'
import { Loader } from "../../../components";
import AddNodeForm from "./components/AddNodeForm";

export const AddNodeContext = createContext();

export const AddNode = () => {
  const { housingStockId } = useParams();
  const [housingStock, setHousingStock] = useState();

  console.log('housingStockId', housingStockId);
  useEffect(() => {
    getHousingStock(housingStockId).then((res) => {
      setHousingStock(res);
      console.log(res)
    });
  }, []);

  if (!housingStock) {
    return <Loader size="64" show />;
  }

  return (
    <div>
      <Header housingStock={housingStock}/>
      <AddNodeForm />
    </div>
  );
};

export default AddNode;
