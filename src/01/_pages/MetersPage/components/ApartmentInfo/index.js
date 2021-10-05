import React, { useEffect, useState } from 'react';

import { UserInfo } from './UserInfo';
import { Icon, Loader } from '01/components';
import { useHistory, useParams } from 'react-router-dom';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ButtonTT, MenuButtonTT } from '01/tt-components';
import styled from 'styled-components';

import { ReactComponent as EditIcon } from './icons/Edit.svg';
import TextArea from 'antd/lib/input/TextArea';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import axios from '01/axios';
import { formQueryString } from '01/utils/formQueryString';
import {
  $apartment,
  ApartmentGate,
  fetchApartmentFx,
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
import { $currentManagingFirmUser } from '01/features/managementFirmUsers/displayCurrentUser/models';
import { ESecuredIdentityRoleName } from 'myApi';

export const ApartmentInfo = () => {
  const [show, setShow] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  const apartment = useStore($apartment);
  const { userInfo = [], title, comment } = useApartmentInfo(apartment);
  const homeowner = apartment?.homeowners[0];
  const houseManagement = apartment?.housingStock?.houseManagement;

  const pending = useStore(fetchApartmentFx.pending);

  const user = useStore($currentManagingFirmUser);

  const isSeniorOperator = user?.userRoles?.find(
    ({ type }) => type === ESecuredIdentityRoleName.ManagingFirmSeniorOperator
  );

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
      title: 'Изменить лицевой счет',
      cb: () => history.push(`/homeowner/${id}/switchPersonalNumber`),
      show: isSeniorOperator,
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

  const pausedAlert = isPaused && (
    <>
      <Alert type="stop" color="FC525B">
        <AlertContent>
          <div>
            Квартира на паузе до{' '}
            {moment(apartment.stoppedTo).format('DD.MM.YYYY')}
          </div>
          <div
            onClick={cancelPauseApartment}
            className="ant-btn-link"
            style={{ color: '#FC525B' }}
          >
            Снять с паузы
          </div>
        </AlertContent>
      </Alert>
      <Space />
    </>
  );

  const houseManagementRender = houseManagement && (
    <div style={{ fontSize: 12, fontWeight: 500 }}>
      {houseManagement.name}
      <span>{houseManagement.comment}</span>
      <span> (тел: {houseManagement.phone})</span>
    </div>
  );

  const toggle = (
    <div onClick={() => setShow((p) => !p)} style={{ cursor: 'pointer' }}>
      {show ? (
        <>
          <Icon
            icon="off"
            color="var(--main-100)"
            style={{ marginRight: 8, position: 'relative', top: 1 }}
          />
          <span>Скрыть подробную информацию</span>
        </>
      ) : (
        <>
          <Icon
            icon="on"
            color="var(--main-100)"
            style={{ marginRight: 8, position: 'relative', top: 1 }}
          />
          <span>Показать подробную информацию</span>
        </>
      )}
    </div>
  );

  const content = apartment && (
    <Grid>
      <div>
        <Spaces spaceStyles={{ height: 10 }}>
          <CommentTitle>Управляющая компания</CommentTitle>
          {houseManagementRender}
          {toggle}
        </Spaces>
        {show ? (
          <>
            <Space h={10} />
            <UserInfo list={userInfo} />
          </>
        ) : null}
      </div>
      <ApartmentComment comment={comment} />
    </Grid>
  );

  return (
    <>
      <ApartmentGate id={Number(id)} />
      <PauseApartmentModal />
      <GetIssueCertificateModal />
      <ApartmentInfoWrap>
        <Flex style={{ justifyContent: 'space-between', marginBottom: -12 }}>
          <Flex>
            <ApartmentTitle>{title}</ApartmentTitle>
            <Space />
            {homeowner?.personalAccountNumber && (
              <PersonalNumber>
                {homeowner?.personalAccountNumber}
              </PersonalNumber>
            )}
          </Flex>
          <MenuButtonWrap>
            <MenuButtonTT
              menuButtonArr={menuButtonArray}
              loading={pending}
              size="small"
            />
          </MenuButtonWrap>
        </Flex>
        {content && (
          <>
            <Space />
            {content}
          </>
        )}
      </ApartmentInfoWrap>

      {apartment && <>{pausedAlert}</>}
    </>
  );
};

const MenuButtonWrap = styled.div`
  transform: scale(-0.7) translate(-5px, 5px);
`;

const PersonalNumber = styled.div`
  background-color: rgba(24, 158, 233, 1);
  border-radius: 5px;
  padding: 4px 10px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  width: min-content;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const ApartmentInfoWrap = styled.div`
  padding: 10px 10px 10px 15px;
  margin: 15px 0;
  background: rgba(24, 158, 233, 0.1);
  border-radius: 10px;
`;

const ApartmentTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const AlertContent = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const CommentModuleWrap = styled.div``;
const CommentTitle = styled.div`
  font-weight: 600;
  opacity: 0.6;
  margin-bottom: -10px;
  &:after {
    content: ':';
  }
`;
const CommentWrap = styled.div`
  margin-top: 10px;
`;
const CommentText = styled.div`
  font-size: 16px;
`;

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
