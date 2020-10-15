import React, { useState } from 'react';
import { Header } from '../../tt-components';
import TabsComponent from './components/Tabs/Main';

const EditODPU = () => {
  const [currentTabKey, setTab] = useState('1');

  function handleChangeTab(value) {
    setTab(value);
  }

  return (
    <>
      <Header>СГВ-5 (123456789). Редактирование</Header>
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
    </>
  );
};
export default EditODPU;
