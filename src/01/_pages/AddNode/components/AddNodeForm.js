import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  resources, magistrals, housingMeteringDeviceTypes, isConnected, ipv4RegExp, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning, StyledModalHeader,
} from '../../../tt-components';
import TabsComponent from './Tabs';
import RelatedDevices from './RelatedDevices';
import { styles, StyledFormPage } from './styledComponents';
import { addNode } from '../apiAddNode';

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
