import React, { useContext } from 'react';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { isConnectedValue } from '../../../../tt-components/localBases';
import { putOdpu } from '../../../EditODPU/components/apiEditOdpu';
import { Title, ButtonTT } from '../../../../tt-components';
import { Buttons } from '../../../../tt-components/Buttons'
import { NodeContext } from "../../index";

const EnableModal = () => {
  console.log('DisableModal');
  const { visible, setVisible } = useContext(NodeContext);
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
    },
    validationSchema: Yup.object({
      test: Yup.string().required('Поле обязательное'),
    }),
    onSubmit: () => {
      alert('Узел снят с учета!');
    },
  });

  const handleCancel = () => {
    setVisible(prevState => ({ ...prevState, showEnable: false }))
  }

  return (
    <Modal
      visible={visible.showEnable}
      footer={null}
      width={800}
      bodyStyle={{
        padding: 0,
      }}
    >
      <form>
        <div style={{ padding: '24px' }}>
          <Title color="black" size={'middle'}>
            Постановка узла на коммерческий учёт
          </Title>
          <span>После этого данные узла будут использоваться для мониторинга работы инженерной системы и расчета платы за потребленный объем ресурса</span>
        </div>

        <Buttons>
          <ButtonTT color="white">
            Отмена
          </ButtonTT>

          <ButtonTT color="blue" style={{ marginLeft: '16px' }}>
            Снять с учета
          </ButtonTT>
        </Buttons>

      </form>
    </Modal>
  );
};

export default EnableModal