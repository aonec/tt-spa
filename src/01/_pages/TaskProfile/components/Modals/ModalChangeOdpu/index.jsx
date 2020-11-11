import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import {
  setModalChangeODPUVisible,
} from '../../../../../Redux/actions/actions';
import ChangeOdpuForm from './ChangeOdpuForm';
import axios from '../../../../../axios';

const ModalChangeOdpu = () => {
  const [task, setTask] = useState();
  const { 0: taskId } = useParams();
  const dispatch = useDispatch();
  const visible = useSelector(
    (state) => _.get(state, ['changeOdpuReducer', 'visible'], false),
  );

  async function getTask(url = '') {
    try {
      const res = await axios.get(`Tasks/${url}`);
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
    getTask(taskId).then((res) => {
      setTask(res);
    });
  }, []);

  const handleCancel = () => {
    dispatch(setModalChangeODPUVisible(false));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="964px"
    >
      <ChangeOdpuForm task={task} />

    </Modal>
  );
};
export default ModalChangeOdpu;
