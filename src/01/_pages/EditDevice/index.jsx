import React, {useEffect} from 'react';
import axios from '01/axios'
import {Header} from '01/tt-components'
import TabsComponent from './components/Tabs'
import { Route, useParams } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';


async function getDevice(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/${url}`);
    console.log('res', res);
    //  return { ...res, info: true, header: createTitleObject(res) };
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

const EditDevice = () => {
  const dispatch = useDispatch();
  const editCalculatorReducer = useSelector((state) => state.editCalculatorReducer);
  
  const { 0: objid, 1: deviceId } = useParams();
  useEffect(()=>{
    getDevice(deviceId)
    console.log(editCalculatorReducer)
  },[])

 
 return (

    <>
  <Header>ВКТ-7 (123456789). Редактирование</Header>
  <TabsComponent editCalculatorReducer={editCalculatorReducer}/>
  <div>{deviceId}</div>
    </>
  )
};

export default connect()(EditDevice)
