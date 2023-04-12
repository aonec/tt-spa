import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Loader } from '../../components';
import { IndividualDeviceResponse } from '../../../myApi';
import { getIndividualDevice } from '../../_api/apiRequests';
import IndividualDeviceEditForm from './components/IndividualDeviceEditForm';
import Tabs from '../../tt-components/Tabs';
import ModalDeviceExists from '../../tt-components/ModalDeviceExists';

export const IndividualDeviceEdit = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [currentTabKey, setTab] = useState('1');
  const [alert, setAlert] = useState(false);
  const [existDevice, setExistDevice] = useState();

  
  return (
    <>
     
    </>
  );
};

export default IndividualDeviceEdit;
