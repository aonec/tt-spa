import React, { useContext, useEffect, useState } from 'react';
import { TaskCommentResponse } from '../../.../../api/types';
import InputTT from '../../../../tt-components/InputTT';
import { ButtonTT } from '../../../../tt-components/ButtonTT';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { Alert } from 'antd';
import { TasksProfileContext } from '../../context';
import SingleComment from './SingleComment';
import styled from 'styled-components';
import Icon from '../../../../tt-components/Icon';
import { Loader } from '../../../../components/Loader';

const TaskComments = ({
  comments,
}: {
  comments: TaskCommentResponse[] | null;
}) => {
  const { perpetrator } = useContext(TasksProfileContext);
  const currentUser = JSON.parse(localStorage.getItem('user')!);
  const isPerpetrator = currentUser?.id === perpetrator?.id;

  const [data, setData] = useState(comments || []);
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
  };

  const onClick = async () => {
    setPostStatus('loading');
    try {
      const comment = await postComment(id, currentComment);
      setPostStatus('success');
      setCurrentComment('');
      setData([comment, ...data]);
    } catch (error) {
      setPostStatus('error');
      setPostError(error);
    }
  };

  return (
    <div>
      {/*<form action="">*/}
      <h2 style={{ marginBottom: 24 }}>Комментарии к задаче</h2>
      {data && data.length === 0 ? (
        <div
          style={{
            display: 'flex',
            marginBottom: 48,
            alignItems: 'center',
            color: 'var(--main90)',
          }}
        >
          <IconContainer>
            <Icon icon="moon" color="var(--main-100)" size={16} />
          </IconContainer>
          Комментарии ещё не добавлены
        </div>
      ) : null}

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <IconContainer>
          <Icon icon="avatar" color="var(--main-100)" />
        </IconContainer>
        <InputTT value={currentComment} onChange={handleChange} height="32px" />
      </div>

      {postStatus === 'loading' ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader show style={{ width: 32, height: 32 }} />
        </div>
      ) : null}
      {postStatus === 'error' ? (
        <Alert
          message="Не удалось добавить комментарий"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      <ButtonContainer>
        <ButtonTT
          disabled={currentComment === '' || !isPerpetrator}
          color="blue"
          type="submit"
          small
          onClick={onClick}
          style={{ marginBottom: 16 }}
        >
          Добавить комментарий
        </ButtonTT>
      </ButtonContainer>
      {data && data.length > 0
        ? data.map((comment) => (
            <SingleComment key={comment.id} comment={comment} />
          ))
        : null}
      {/*</form>*/}
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--main-4);
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

export default TaskComments;
