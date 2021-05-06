import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import { useParams } from 'react-router-dom';
import { ButtonTT, SelectTT, InputTT, Title } from '../../tt-components';

import { getContractor, putContractor } from './apiContractor';
import { phoneRegExp } from '../../tt-components/localBases';
import ContractorForm from './contractorForm';

export const Contractor = () => {
  const params = useParams();
  const { userId } = params;

  const [contractor, setContractor] = useState();

  useEffect(() => {
    getContractor(userId).then((res) => {
      setContractor(res);
    });
  }, []);

  if (!contractor) {
    return <div>Загрузка</div>;
  }
  return <ContractorForm contractor={contractor} />;
};

export default Contractor;
