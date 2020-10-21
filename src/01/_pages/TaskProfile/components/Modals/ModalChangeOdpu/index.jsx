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

const ModalChangeOdpu = (props) => {
  const [task, setTask] = useState();
  const { 0: taskId } = useParams();
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'visible'], false),
  );

  async function getTask(url = ''){
    try {
      const res = await axios.get(`Tasks/${url}`);
      console.log('res = ', res);
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
    console.log(taskId);
    getTask(taskId).then((res) => {
      setTask(res);
    }).then(() => {
      console.log(task);
    });
  }, [props]);

  const handleCancel = () => {
    dispatch(setModalDeregisterVisible(false));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="964px"
    >
      <ChangeOdpuForm task={task}/>

    </Modal>
  );
};
export default ModalChangeOdpu;
