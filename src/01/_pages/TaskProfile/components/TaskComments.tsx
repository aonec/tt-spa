import React, { useContext, useEffect, useState } from 'react';
import { TaskCommentResponse } from '../../../../myApi';
import { useAsync } from '../../../hooks/useAsync';
import InputTT from '../../../tt-components/InputTT';
import { ButtonTT } from '../../../tt-components/ButtonTT';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import axios from '01/axios';
import { Title } from '../../../tt-components/List';
import { Alert } from 'antd';
import { TasksProfileContext } from '../context';

const TaskComments = ({
  comments,
}: {
  comments: TaskCommentResponse[] | null;
}) => {
  // const { setData, setError, error, status, data, run } = useAsync<
  //   TaskCommentResponse[] | null
  // >({
  //   status: 'resolved',
  //   data: comments,
  //   error: null,
  // });
  const taskPerpetrator = useContext(TasksProfileContext);
  debugger;
  // const taskPerpetrator = state.perpetrator;
  // const currentUser = JSON.parse(localStorage.getItem('user'));
  // const isPerpetrator = currentUser.id === taskPerpetrator.id;

  const [data, setData] = useState(comments);
  const { 0: id } = useParams();
  const [postStatus, setPostStatus] = useState('idle');
  const [postError, setPostError] = useState();

  const [currentComment, setCurrentComment] = useState('');
  const handleChange = (e: any) => {
    setCurrentComment(e.target.value);
  };

  const postComment = async (taskId: number, comment: string) => {
    return axios.post<any, TaskCommentResponse>(`tasks/${taskId}/Comments`, {
      comment,
    });
    // return Promise.reject();
  };
  useEffect(() => {});

  const onClick = async () => {
    setPostStatus('loading');
    try {
      const comment = await postComment(id, currentComment);
      setPostStatus('success');
      setCurrentComment('');
      if (data) {
        setData([...data, comment]);
        return;
      }
      setData([comment]);
    } catch (error) {
      setPostStatus('error');
      setPostError(error);
    }
  };

  return (
    <div>
      {/*<form action="">*/}
      <Title>Комментарии к задаче</Title>
      <InputTT
        value={currentComment}
        onChange={handleChange}
        style={{ marginBottom: 16 }}
      />
      {postStatus === 'loading' ? (
        <div style={{ marginBottom: 16 }}>Загрузка комментария...</div>
      ) : null}
      {postStatus === 'error' ? (
        // <div>Не удалось добавить комментарий</div>
        <Alert message="Не удалось добавить комментарий" />
      ) : null}
      <ButtonTT
        color="blue"
        type="submit"
        onClick={onClick}
        style={{ marginBottom: 16 }}
      >
        Добавить комментарий
      </ButtonTT>
      {data
        ? data.map((comment) => {
            return <div key={comment.id}>{comment.text}</div>;
          })
        : null}
      {/*</form>*/}
    </div>
  );
};

export default TaskComments;
