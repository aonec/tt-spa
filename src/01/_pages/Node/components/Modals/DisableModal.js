import React, { useContext } from 'react';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { isConnectedValue } from '../../../../tt-components/localBases';
import { putOdpu } from '../../../EditODPU/components/apiEditOdpu';
import { Title, ButtonTT } from '../../../../tt-components';
import {Buttons} from '../../../../tt-components/Buttons'
import { NodeContext } from "../../index";

const DisableModal = () => {
  console.log('DisableModal');
  const {visible, setVisible} = useContext(NodeContext);
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
    setVisible(prevState => ({...prevState, showDisable: false}))
  }

  return (
    <Modal
      visible={visible.showDisable}
      footer={null}
      width={800}
      bodyStyle={{
        padding: 0,
      }}
      onCancel={handleCancel}
    >
      <form>
        <div style={{padding: '24px'}}>
          <Title color="black" size={'middle'}>
            Вы уверены что хотите снять узел с учета?
          </Title>
          <span>Для того, чтобы изменить тип узла повторно, вам нужно будет загрузить акт-допуска</span>
        </div>

        <Buttons>
          <ButtonTT type={'button'}
                    onClick={handleCancel}
                    color="white">
            Отмена
          </ButtonTT>

          <ButtonTT type={'submit'} color="blue" style={{marginLeft: '16px'}}>
            Снять с учета
          </ButtonTT>
        </Buttons>

      </form>
    </Modal>
  );
};

export default DisableModal