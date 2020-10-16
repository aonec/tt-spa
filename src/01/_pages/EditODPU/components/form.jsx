// import $ from 'jquery';
// import React, { useEffect } from 'react';
// import '../editodpu.scss';

// const visibleInputs = [
//   [1, 2], [3, 4], [5, 6],
// ];
//
// const FormEditODPU = (props) => {
//   const { currentTabKey } = props;
//   console.log('FormEditODPU');
//
//   useEffect(() => {
//     $(`#${Number(1)}`).addClass('hide');
//     $(`#${Number(2)}`).addClass('hide');
//     $(`#${Number(3)}`).addClass('hide');
//     $(`#${Number(4)}`).addClass('hide');
//     $(`#${Number(5)}`).addClass('hide');
//     $(`#${Number(6)}`).addClass('hide');
//
//     visibleInputs[currentTabKey - 1].map((item) => {
//       $(`#${Number(item)}`).removeClass('hide');
//     });
//   }, [props]);
//   return (
//     <div>
//       formEditODPU
//       <hr />
//       <div>
//         currentTabKey
//         {currentTabKey}
//       </div>
//       <hr />
//       <p id={1}>p1</p>
//       <p id={2}>p2</p>
//       <p id={3}>p3</p>
//       <p id={4}>p4</p>
//       <p id={5}>p5</p>
//       <p id={6}>p6</p>
//     </div>
//   );
// };
//
// export default FormEditODPU;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import {
  DatePicker,
  Form, Input, Select,
} from 'antd';
import moment from 'moment';
import { onChangeDeviceFormValueByPath } from '../../../Redux/actions/actions';
import { types, resources, serviceLife } from './CalculatorJSON';
import '../editodpu.scss'

const FormEditODPU = (props) => {
  const { currentTabKey } = props;
  const { 1: deviceId } = useParams();
  const dispatch = useDispatch();

  const form = useSelector((state) => state.deviceReducer) || {};
  const object = useSelector((state) => state.objectReducer) || {};

  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    infoId,
    futureCheckingDate,
    closingDateTime,
    model,
  } = form;

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: types[0].value,
      resource: resources[0].value,
      model: '',
      serialNumber: '',
      test: '',
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
      model: Yup.string().required('Введите модель прибора'),
      // test: Yup.string().required('Введите данные'),
      // closingDateTime: Yup.string().required('Введите данные'),
    }),
    onSubmit: async () => {
      // deregisterDevice(form);
      console.log('Submit');
    },
  });

  const visibleInputs = [
    ['housingMeteringDeviceType', 'resource','lastCommercialAccountingDate', 'futureCommercialAccountingDate'], ['model'], ['serialNumber'],
  ];
  useEffect(() => {
    console.log($('.housingMeteringDeviceType'))



    // $('.housingMeteringDeviceType').addClass('hide')

  }, [])

  useEffect(() => {
    console.log($('.housingMeteringDeviceType'))

    visibleInputs.map((item) =>{
      item.map((someItem)=>{
        $(`.${someItem}`).addClass('hide')
      })
    })
    
    visibleInputs[currentTabKey - 1].map((item) =>{

        $(`.${item}`).removeClass('hide')

    })

    $('.housingMeteringDeviceType').addClass('hide')

  }, [props])

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
    }
    return null;
  };

  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit}>

        <Form.Item label="Выберите тип прибора" className={"housingMeteringDeviceType"}>
          <Select
            height="60px"
            name="housingMeteringDeviceType"
            onChange={(event) => {
              values.housingMeteringDeviceType = event;
              const value = event;
              const path = ['housingMeteringDeviceType'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={types}
            value={values.housingMeteringDeviceType}
          />
          <Alert name="closingDateTime"/>
        </Form.Item>

        <Form.Item label="Выберите тип ресурса" className="resource">
          <Select
            name="resource"
            onChange={(event) => {
              values.resource = event;
              const value = event;
              const path = ['resource'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={resources}
            value={values.resource}

          />
        </Form.Item>

        <Form.Item label="Выберите модель прибора" className="model">
          <Input

            name="model"
            type="text"
            onChange={(event) => {
              handleChange(event);
              const { value } = event.target;
              const path = ['model'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={values.model || model}
            onBlur={handleBlur}
          />
          <Alert name="model"/>
        </Form.Item>

        <Form.Item label="Серийный номер" className="serialNumber">
          <Input

            name="serialNumber"
            type="text"
            format="DD.MM.YYYY"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['serialNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={values.serialNumber || serialNumber}
            onBlur={handleBlur}
          />
          <Alert name="serialNumber"/>
        </Form.Item>

        <Form.Item label="Дата выпуска прибора" className={'lastCommercialAccountingDate'}>
          <DatePicker
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            format="DD.MM.YYYY"
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={moment(checkingDate)}
          />
          <Alert name="lastCommercialAccountingDate"/>
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию" className={'lastCommercialAccountingDate'} >
          <DatePicker
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            format="DD.MM.YYYY"
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
          <Alert name="futureCheckingDate"/>
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу" className={'futureCommercialAccountingDate'}>
          <Select

            name="futureCommercialAccountingDate"
            onChange={(event) => {
              const value = moment()
                .add(event, 'year')
                .toISOString();
              const path = ['futureCommercialAccountingDate'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
          <Alert name="futureCommercialAccountingDate"/>
        </Form.Item>

      </form>
    </>
  );
};

export default FormEditODPU;
