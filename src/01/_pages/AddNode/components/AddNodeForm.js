import React, { useContext } from 'react';
import TabsComponent from './Tabs';
import AddNodeFirstTab from './AddNodeFirstTab';
import { AddNodeContext } from '../index';
import AddNodeSecondTab from './AddNodeSecondTab';
import AddNodeThirdTab from './AddNodeThirdTab';
import { Stages } from '../../../tt-components/Stages';
import { GridTT } from '../../../tt-components';

const AddNodeForm = () => {
  const {
    handleCancel, currentTabKey, setTab, handleChangeTab, handleNext, stepsArr,
  } = useContext(AddNodeContext);

  return (
    <div>
      <GridTT>
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <></>
      </GridTT>

      <GridTT>
        <>
          {/* First Tab */}
          <AddNodeFirstTab />
          {/* Second Tab */}
          <AddNodeSecondTab />
          {/* Third Tab */}
          <AddNodeThirdTab />
        </>
        <Stages />

      </GridTT>

    </div>
  );
};
export default AddNodeForm;
