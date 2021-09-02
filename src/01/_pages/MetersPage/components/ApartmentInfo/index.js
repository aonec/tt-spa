import React, { useEffect, useState } from 'react';
import styled, { css, use } from 'reshadow/macro';

import { UserInfo } from './UserInfo';
import { Icon, Loader } from '01/components';
import { useHistory, useParams } from 'react-router-dom';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ButtonTT, MenuButtonTT } from '01/tt-components';
import styledComponents from 'styled-components';

import { ReactComponent as EditIcon } from './icons/Edit.svg';
import TextArea from 'antd/lib/input/TextArea';
import { Space } from '01/shared/ui/Layout/Space/Space';
import axios from '01/axios';
import { formQueryString } from '01/utils/formQueryString';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';
import {
  cancelPauseApartmentButtonClicked,
  pauseApartmentButtonClicked,
} from '01/features/apartments/pauseApartment/models';
import { PauseApartmentModal } from '01/features/apartments/pauseApartment';
import { Alert } from '01/shared/ui/Alert/Alert';
import { useStore } from 'effector-react';
import moment from 'moment';
import confirm from 'antd/lib/modal/confirm';
import { GetIssueCertificateModal } from '01/features/apartments/printIssueCertificate';
import { getIssueCertificateButtonClicked } from '01/features/apartments/printIssueCertificate/models';
import { useApartmentInfo } from '../../hooks/useApartmentInfo';

const styles = css`
  drower {
    box-shadow: var(--shadow);
    margin-top: 16px;
    margin-bottom: 16px;
  }

  drower_btn {
    display: flex;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    & Icon {
      margin-right: 8px;
    }
  }

  drower_content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    padding: 0;
    overflow: hidden;
    height: 0;
    &[|show] {
      padding: 8px 16px;
      height: auto;
    }
  }
`;

const CommentModuleWrap = styledComponents.div``;
const CommentTitle = styledComponents.div`
  font-weight: 600;
  opacity: 0.6; 
`;
const CommentWrap = styledComponents.div`
  margin-top: 15px
`;
const CommentText = styledComponents.div`font-size: 16px`;

const ApartmentComment = ({ comment: commentInitial }) => {
  const [comment, setComment] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => setComment(commentInitial), [commentInitial]);

  const onSaveHandler = async () => {
    setLoading(true);
    const queryString = formQueryString({ Comment: comment });

    const path = `/Apartments/${Number(id)}${queryString}`;

    try {
      await axios.put(path);

      setIsEditMode(false);
    } catch (e) {}

    setLoading(false);
  };

  const onCancelHandler = () => {
    setComment(commentInitial);
    setIsEditMode(false);
  };

  return (
    <CommentModuleWrap>
      <Flex style={{ justifyContent: 'space-between' }}>
        <CommentTitle>Комментарий</CommentTitle>
        <div>
          <EditIcon onClick={() => setIsEditMode(true)} />
        </div>
      </Flex>
      <CommentWrap>
        {isEditMode ? (
          <div>
            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Space />
            <Flex style={{ justifyContent: 'space-between' }}>
              <div></div>
              <Flex>
                <ButtonTT onClick={onCancelHandler} color="white" size="small">
                  Отмена
                </ButtonTT>
                <Space />
                <ButtonTT
                  disabled={loading}
                  color="blue"
                  size="small"
                  onClick={onSaveHandler}
                >
                  {loading ? <Loader show /> : 'Сохранить'}
                </ButtonTT>
              </Flex>
            </Flex>
          </div>
        ) : (
          <CommentText>{comment || 'Нет комментария'}</CommentText>
        )}
      </CommentWrap>
    </CommentModuleWrap>
  );
};

export const ApartmentInfo = () => {
  const [show, setShow] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  const apartment = useStore($apartment);
  const { userInfo = [], title, comment } = useApartmentInfo(apartment);

  const cancelPauseApartment = () =>
    confirm({
      title: 'Вы действительно хотите снять эту квартиру с паузы?',
      okText: 'Снять с паузы',
      cancelText: 'Отмена',
      onOk: async () => {
        cancelPauseApartmentButtonClicked();

        await new Promise((res) => setTimeout(res, 200));
      },
    });

  const isPaused = apartment?.status === 'Pause';

  const menuButtonArray = [
    {
      title: 'Поставить на паузу',
      show: !isPaused,
      cb: pauseApartmentButtonClicked,
    },
    {
      title: 'Снять с паузы',
      show: isPaused,
      cb: cancelPauseApartment,
    },
    {
      title: 'Добавить новый прибор',
      show: true,
      cb: () => history.push(`/apartment/${id}/addIndividualDevice`),
    },
    {
      title: 'Выдать справку',
      show: true,
      cb: () => getIssueCertificateButtonClicked(),
    },
  ];

  return styled(styles)(
    <>
      <ApartmentGate id={Number(id)} />

      <PauseApartmentModal />
      <GetIssueCertificateModal />

      <Flex style={{ justifyContent: 'space-between', marginTop: 40 }}>
        <apart_title as="h2">{title}</apart_title>
        <MenuButtonTT menuButtonArr={menuButtonArray} />
      </Flex>

      {isPaused && (
        <div>
          <Space />
          <Alert type="stop">
            <AlertContent>
              <div>
                Квартира на паузе до{' '}
                {moment(apartment.stoppedTo).format('DD.MM.YYYY')}
              </div>
              <div onClick={cancelPauseApartment} className="ant-btn-link">
                Снять с паузы
              </div>
            </AlertContent>
          </Alert>
        </div>
      )}

      <drower>
        <drower_btn onClick={() => setShow(!show)}>
          <Flex
            style={{
              transform: `rotate(${show ? -180 : 0}deg) translate(${
                show ? 8 : 0
              }px, ${show ? 2 : 0}px)`,
              transition: '.4s',
            }}
          >
            <Icon icon="down" />
          </Flex>
          Информация о квартире
        </drower_btn>
        <drower_content {...use({ show })}>
          <UserInfo list={userInfo} />
          <ApartmentComment comment={comment} />
        </drower_content>
      </drower>
    </>
  );
};

const AlertContent = styledComponents(Flex)`
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;
