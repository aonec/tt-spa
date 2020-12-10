import React, { useContext } from 'react';
import { Form, Modal } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { isConnectedValue } from '../../../../tt-components/localBases';
import { putOdpu } from '../../../EditODPU/components/apiEditOdpu';
import { Title, ButtonTT, DatePickerTT } from '../../../../tt-components';
import { Buttons } from '../../../../tt-components/Buttons';
import { NodeContext } from '../../index';

const EnableModal = () => {
  console.log('DisableModal');
  const {
    visible, setVisible, switched, setSwitched,
  } = useContext(NodeContext);
  const {
    handleSubmit,
    handleChange, values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      test: 'test',
      lastCommercialAccountingDate: moment(),
      futureCommercialAccountingDate: moment(),
    },
    validationSchema: Yup.object({
      test: Yup.string().required('Поле обязательное'),
    }),
    onSubmit: () => {
      alert('Узел поставлен на учет!');
      setTimeout(() => {
        setVisible((prevState) => ({ ...prevState, showEnable: false }));
      }, 1000);
    },
  });

  const handleCancel = () => {
    setVisible((prevState) => ({ ...prevState, showEnable: false }));
    setSwitched((prevState) => !prevState);
  };

  return (
    <Modal
      visible={visible.showEnable}
      footer={null}
      width={800}
      bodyStyle={{
        padding: 0,
      }}
    >
      <form id="enableModal" onSubmit={handleSubmit}>
        <div style={{ padding: '24px' }}>
          <Title color="black" size="middle">
            Постановка узла на коммерческий учёт
          </Title>
          <span>После этого данные узла будут использоваться для мониторинга работы инженерной системы и расчета платы за потребленный объем ресурса</span>
        </div >
        <div style={{padding: '0 24px', display: 'flex', justifyContent: 'space-between'}}>
          <Form.Item label="Дата начала действия акта-допуска" style={{ width: '49%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date);
              }}
              value={values.lastCommercialAccountingDate}
            />
          </Form.Item>

          <Form.Item label="Дата окончания действия акта-допуска" style={{ width: '49%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('futureCommercialAccountingDate', date);
              }}
              value={values.futureCommercialAccountingDate}
              name="futureCommercialAccountingDate"
            />
          </Form.Item>
        </div>
        <Buttons>
          <ButtonTT type="button" color="white" onClick={handleCancel}>
            Отмена
          </ButtonTT>

          <ButtonTT type="submit" color="blue" style={{ marginLeft: '16px' }}>
            Поставить
          </ButtonTT>
        </Buttons>

      </form>
    </Modal>
  );
};

export default EnableModal;
