import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import {
  setModalDeregisterVisible,
} from '../../../../../Redux/actions/actions';
import { ButtonTT } from '../../../../../tt-components';
import ChangeOdpuForm from './ChangeOdpuForm';
import axios from '../../../../../axios';
import { useInformation } from '../../../hooks/useInformation';

const ModalChangeOdpu = (props) => {
  const [task, setTask] = useState();
  const { 0: taskId } = useParams();

  async function getTask(url = '') {
    try {
      const res = await axios.get(`Tasks/${url}`);
      console.log("res = ", res)
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса задачи',
      };
    }
  }
  useEffect(() => {
      console.log(taskId)
      getTask(taskId).then((res) => {
      setTask(res);
    }).then(()=>{
        console.log(task)
      });
  }, [props]);


  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'visible'], false),
  );

  const handleCancel = () => {
    dispatch(setModalDeregisterVisible(false));
  };

  const [device, setDevice] = useState();


  const Buttons = () => {
    console.log('Buttons');
    return (
      <div>
        <ButtonTT
          type="submit"
          color="red"
          form="formikForm"
        >
          Снять прибор с учета
        </ButtonTT>
        <ButtonTT
          style={{ marginLeft: '16px' }}
          type="submit"
          color="white"
          onClick={handleCancel}
        >
          Отмена
        </ButtonTT>
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="964px"
    >
      <ChangeOdpuForm device={device} />

    </Modal>
  );
};
export default ModalChangeOdpu;
