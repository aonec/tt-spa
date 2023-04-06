import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import {
  BlockTitle,
  CompetenciesContainer,
  Field,
  FieldHousingStocksNumber,
  FieldName,
  FieldTitle,
  GridContainer,
  GridWrapper,
  PageHeaderSC,
  TabsSC,
  Wrapper,
  СompetenceDiv,
} from './EmployeeProfile.styled';
import { EmployeeProfileProps } from './EmployeeProfile.types';
import { useHistory } from 'react-router-dom';
import { sortUserRoles } from 'services/company/companyProfileService/view/CompanyProfile/Tabs/Staff/Staff.utils';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { StaffStatus } from 'ui-kit/shared_components/StaffStatus/StaffStatus';

export const EmployeeProfile: FC<EmployeeProfileProps> = ({
  userData,
  handleOpenChangeStatusModal,
  handleOpenDeleteEmployeeModal,
}) => {
  const history = useHistory();

  const userInitials = `${userData?.firstName || ''} ${
    userData?.middleName || ''
  } ${userData?.lastName || ''}`;

  const phoneMask = usePhoneMask();

  const sortedRoles = sortUserRoles(userData?.roles || []);
  const rolesString = sortedRoles?.map(({ value }) => value).join(', ');

  const [currentTabKey, setTab] = useState('1');

  const tabItems = [
    {
      title: 'Общие данные',
      key: '1',
      cb: () => setTab('1'),
    },
    {
      title: 'Статистика',
      key: '2',
      cb: () => setTab('2'),
    },
  ];

  return (
    <Wrapper>
      <GoBack />
      <PageHeaderSC
        title={userInitials}
        contextMenu={{
          menuButtons: [
            {
              title: 'Изменить статус',
              onClick: () => handleOpenChangeStatusModal(),
            },
            {
              title: 'Редактировать информацию о сотруднике',
              onClick: () =>
                history.push(
                  `/companyProfile/editManagingFirmUser/${userData?.id}`,
                ),
            },
            {
              title: 'Удалить сотрудника',
              color: 'danger',
              onClick: () => handleOpenDeleteEmployeeModal(),
            },
          ],
        }}
      />
      {userData?.status?.type && (
        <StaffStatus status={userData?.status?.type} />
      )}

      <TabsSC tabItems={tabItems} tabsType={'tabs'} activeKey={currentTabKey} />

      {currentTabKey === '1' && (
        <GridWrapper>
          <div>
            {userData?.competences?.length ? (
              <>
                <BlockTitle>Компетенции</BlockTitle>
                <CompetenciesContainer>
                  {userData?.competences.map((e) => (
                    <СompetenceDiv>{e.title}</СompetenceDiv>
                  ))}
                </CompetenciesContainer>
              </>
            ) : null}

            <BlockTitle>Информация</BlockTitle>

            <GridContainer>
              <FieldTitle>ФИО</FieldTitle>
              <FieldName>{userInitials}</FieldName>
            </GridContainer>
            <SpaceLine />

            <GridContainer>
              <FieldTitle>Электронная почта</FieldTitle>
              <Field>{userData?.email || '-'} </Field>
            </GridContainer>
            <SpaceLine />

            <GridContainer>
              <FieldTitle>Контактный телефон</FieldTitle>
              <Field>
                {userData?.cellphone
                  ? phoneMask.maskValue(userData?.cellphone)
                  : 'Телефон не указан'}
              </Field>
            </GridContainer>
            <SpaceLine />

            <GridContainer>
              <FieldTitle>Роль</FieldTitle>
              <Field>
                <Tooltip title={rolesString}>
                  {(sortedRoles.length && sortedRoles?.[0].value) ||
                    'Роли не найдены'}
                </Tooltip>
              </Field>
            </GridContainer>
            <SpaceLine />

            <GridContainer>
              <FieldTitle>Дата начала работы</FieldTitle>
              <Field>
                {(userData?.hireDate &&
                  moment(userData?.hireDate).format('DD.MM.YYYY')) ||
                  'Нет данных'}
              </Field>
            </GridContainer>
            <SpaceLine />
            <GridContainer>
              <FieldTitle>Объекты на обслуживании</FieldTitle>
              <FieldHousingStocksNumber>
                Выбрано {userData?.housingStocks?.length} адресов
              </FieldHousingStocksNumber>
            </GridContainer>
            <SpaceLine />
          </div>
        </GridWrapper>
      )}
      {currentTabKey === '2' && <h2>Страница появится в будущем</h2>}
    </Wrapper>
  );
};