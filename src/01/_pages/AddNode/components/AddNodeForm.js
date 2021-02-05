import React, { useContext } from 'react';
import TabsComponent from './Tabs';
import AddNodeFirstTab from './AddNodeFirstTab';
import { AddNodeContext } from '../index';
import AddNodeSecondTab from './AddNodeSecondTab';
import AddNodeThirdTab from './AddNodeThirdTab';

const AddNodeForm = () => {
  const {
    handleCancel, currentTabKey, setTab, handleChangeTab, handleNext,
  } = useContext(AddNodeContext);

  return (
    <div>
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
      {/* First Tab */}
      <AddNodeFirstTab />
      {/* Second Tab */}
      <AddNodeSecondTab />
      {/* Third Tab */}
      <AddNodeThirdTab />

    </div>
  );
};
export default AddNodeForm;
