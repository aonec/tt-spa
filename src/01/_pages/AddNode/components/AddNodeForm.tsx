import React, { useContext } from 'react';
import Tabs from '../../../tt-components/Tabs';
import { Stages } from '../../../tt-components/Stages';
import { GridTT } from '../../../tt-components';
import { AddNodeContext } from '../AddNodeContext';
import AddNodeFirstTab from './AddNodeFirstTab';
import AddNodeSecondTab from './AddNodeSecondTab';
import AddNodeThirdTab from './AddNodeThirdTab';

const AddNodeForm = () => {
  const { currentTabKey, handleNext, stepsArr } = useContext(AddNodeContext);

  if (!currentTabKey || !handleNext || !stepsArr) {
    return null;
  }

  return (
    <div>
      <GridTT>
        <></>
        <Tabs
          tabItems={stepsArr}
          tabsType={'tabs'}
          activeKey={currentTabKey}
          visible={false}
        />
      </GridTT>

      <GridTT>
        {/* First Tab */}
        <AddNodeFirstTab />
        {/* Second Tab */}
        <AddNodeSecondTab />
        {/* Third Tab */}
        <AddNodeThirdTab />

        <Stages />
      </GridTT>
    </div>
  );
};
export default AddNodeForm;
