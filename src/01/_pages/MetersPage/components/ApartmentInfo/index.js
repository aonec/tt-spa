/* eslint-disable */

import React, { useEffect, useMemo, useState } from 'react';
import { Icon, Loader } from '01/components';
import { Link, useHistory, useParams } from 'react-router-dom';
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
import { $currentManagingFirmUser } from '01/features/managementFirmUsers/displayCurrentUser/models';
import { SelectEditPersonalNumberTypeModal } from '01/features/homeowner/editPersonalNumber/SelectEditPersonalNumberTypeModal';
import { openEditPersonalNumberTypeModal } from '01/features/homeowner/editPersonalNumber/models';
import {
  $currentPersonalNumberIndex,
  setCurrentPersonalNumberIndex,
} from '01/features/homeowner/displayHomeowner/models';
import {
  AlertLink,
  ApartmentAlertWrapper,
  ArrowRight,
  GroupWrapper,
  HomeownerAccountChangeDate,
  Wrapper,
} from './ApartmentInfo.styled';
import { checkIsHomeownerAccountRecentlyModified } from './utils';
import { Skeleton } from 'antd';
import { ESecuredIdentityRoleName } from 'myApi';
import { HomeownerInfo } from './HomeownerInfo';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

export const ApartmentInfo = () => {
  const [show, setShow] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  const currentPersonalNumberIndex = useStore($currentPersonalNumberIndex);

  const apartment = useStore($apartment);
  const homeownerAccounts = apartment?.homeownerAccounts;

  useEffect(() => {
    setCurrentPersonalNumberIndex(0);
  }, [homeownerAccounts]);

  const title = getApartmentAddressString(apartment);

  const houseManagement = apartment?.housingStock?.houseManagement;

  const currentHomeowner =
    homeownerAccounts && homeownerAccounts[currentPersonalNumberIndex];

  const pending = useStore(fetchApartmentFx.pending);

  const user = useStore($currentManagingFirmUser);

  const isSeniorOperator = useMemo(
    () =>
      user?.roles?.find(
        ({ key }) => key === ESecuredIdentityRoleName.SeniorOperator
      ),
    [user]
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

  const replacedAccounts = apartment?.homeownerAccounts?.reduce(
    (acc, account) => {
      if (
        !account.replacedByAccount ||
        moment().diff(moment(account.closedAt), 'month') > 3
      ) {
        return acc;
      }
      return [...acc, account];
    },
    []
  );

  const apartmentTaskId = apartment?.activeTaskIds[0];

  const isApartmentTaskExist = Boolean(apartmentTaskId);

  const recentlyModifiedApartmentPersonalAccounts = apartment?.homeownerAccounts.filter(
    checkIsHomeownerAccountRecentlyModified
  );

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
      cb: () => openEditPersonalNumberTypeModal(),
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

  const replacedAlert = useMemo(
    () =>
      replacedAccounts.map((account) => (
        <ApartmentAlertWrapper>
          <Alert type="stop" color="FC525B">
            <AlertContent>
              <div>
                Лицевой счет {account.personalAccountNumber} заменен на{' '}
                {account.replacedByAccount.personalAccountNumber}
                {moment(account.closedAt).format('DD.MM.YYYY')}
              </div>
            </AlertContent>
          </Alert>
        </ApartmentAlertWrapper>
      )),
    [replacedAccounts]
  );

  const pausedAlert = isPaused && (
    <ApartmentAlertWrapper>
      <Alert type="stop" color="FC525B">
        <AlertContent>
          <div>
            Квартира на паузе до{' '}
            {moment(apartment.stoppedTo).format('DD.MM.YYYY')}
          </div>
          <AlertLink
            onClick={cancelPauseApartment}
            className="ant-btn-link"
            style={{ color: '#FC525B' }}
          >
            Снять с паузы
          </AlertLink>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );

  const apartmentTaskAlert = (
    <ApartmentAlertWrapper>
      <Alert type="warning" color="FC525B">
        <AlertContent>
          <div>
            По данной квартире есть незакрытая задача. Возможность вводить
            показания появится после закрытия задачи.
          </div>
          <Link to={`/tasks/profile/${apartmentTaskId}`}>
            <AlertLink className="ant-btn-link" style={{ color: '#FC525B' }}>
              Перейти к задаче
              <ArrowRight />
            </AlertLink>
          </Link>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );

  const apartmentHomeownerAcconutChangeAlerts = recentlyModifiedApartmentPersonalAccounts?.map(
    (homeownerAccount) => (
      <ApartmentAlertWrapper key={homeownerAccount.id}>
        <Alert type="info">
          <AlertContent>
            <div>
              Добавлен новый номер лицевого счёта квартиры{' '}
              {homeownerAccount.personalAccountNumber} ({homeownerAccount.name})
            </div>
            <HomeownerAccountChangeDate>
              Дата изменения:{' '}
              {moment(homeownerAccount.openAtFact).format('DD.MM.YYYY')}
            </HomeownerAccountChangeDate>
          </AlertContent>
        </Alert>
      </ApartmentAlertWrapper>
    )
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
        <GroupWrapper>
          <Icon
            icon="off"
            color="var(--main-100)"
            style={{ marginRight: 8, position: 'relative', top: 1 }}
          />
          <span>Скрыть подробную информацию</span>
        </GroupWrapper>
      ) : (
        <GroupWrapper>
          <Icon
            icon="on"
            color="var(--main-100)"
            style={{ marginRight: 8, position: 'relative', top: 1 }}
          />
          <span>Показать подробную информацию</span>
        </GroupWrapper>
      )}
    </div>
  );

  const content = apartment && (
    <>
      <Grid>
        <div>
          <Spaces spaceStyles={{ height: 10 }}>
            <CommentTitle>Управляющая компания</CommentTitle>
            {houseManagementRender}
            {toggle}
          </Spaces>
        </div>
        <ApartmentComment comment={apartment.comment || ''} />
      </Grid>
      {show ? (
        <>
          <Space h={10} />
          <HomeownerInfo
            apartment={apartment}
            currentPersonalNumberIndex={currentPersonalNumberIndex}
          />
        </>
      ) : null}
    </>
  );

  return (
    <Wrapper>
      <ApartmentGate id={Number(id)} />
      <PauseApartmentModal />
      <GetIssueCertificateModal />
      <SelectEditPersonalNumberTypeModal />
      <Flex style={{ justifyContent: 'space-between', marginBottom: -12 }}>
        <Flex>
          <ApartmentTitle>{title}</ApartmentTitle>
          <Space />
          {homeownerAccounts?.map(
            (homeowner, index) =>
              homeowner?.personalAccountNumber && (
                <PersonalNumber
                  onClick={() => setCurrentPersonalNumberIndex(index)}
                  isCurrent={currentHomeowner?.id === homeowner.id}
                  key={homeowner.id}
                >
                  {homeowner?.personalAccountNumber}
                </PersonalNumber>
              )
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
      {pending && <Skeleton />}

      {!pending && (
        <>
          <ApartmentInfoWrap>{content}</ApartmentInfoWrap>
          {apartment && pausedAlert}
          {isApartmentTaskExist && apartmentTaskAlert}
          {apartmentHomeownerAcconutChangeAlerts}
        </>
      )}
    </Wrapper>
  );
};

const MenuButtonWrap = styled.div`
  transform: scale(-0.7) translate(-5px, 5px);
`;

export const PersonalNumber = styled.div`
  cursor: pointer;
  color: black;
  ${({ isCurrent }) =>
    isCurrent && `background-color: rgba(24, 158, 233, 1); color: white;`}
  border-radius: 5px;
  padding: 1px 8px;
  border: 2px solid rgba(24, 158, 233, 1);
  font-weight: 500;
  font-size: 14px;
  width: min-content;
  margin-right: 10px;
  transition: 0.2s;

  &:hover {
    ${({ isCurrent }) =>
      !isCurrent && `background-color: rgba(24, 158, 233, 0.2);`}
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  height: 100%;
`;

const ApartmentInfoWrap = styled.div`
  padding: 12px 16px 16px 16px;
  margin: 15px 0 0;
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
  word-break: break-all;
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
        <div style={{ cursor: 'pointer' }}>
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
