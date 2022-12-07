import { usePhoneMask } from '01/features/staff/addStaff/utils';
import { StaffStatus } from '01/features/staff/displayStaff/models/components/StaffStatus';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { PageHeader } from '01/shared/ui/PageHeader';
import { TabsItemInterface } from '01/tt-components/interfaces';
import Tabs from '01/tt-components/Tabs';
import { sortUserRoles } from '01/_pages/Settings/components/Staff.utils';
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
  Margin,
  Wrapper,
  СompetenceDiv,
} from './EmployeeProfile.styled';
import { EmployeeProfileProps } from './EmployeeProfile.types';

export const EmployeeProfile: FC<EmployeeProfileProps> = ({ userData }) => {
  const userInitials = `${userData?.firstName || ''} ${
    userData?.middleName || ''
  } ${userData?.lastName || ''}`;

  const phoneMask = usePhoneMask();

  const sortedRoles = sortUserRoles(userData?.roles || []);
  const rolesString = sortedRoles?.map(({ value }) => value).join(', ');

  const [currentTabKey, setTab] = useState('1');

  const tabItems: Array<TabsItemInterface> = [
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
      <Margin>
        <GoBack />
      </Margin>
      <PageHeader
        title={userInitials}
        contextMenu={{
          menuButtons: [
            { title: 'Изменить стутус', onClick: () => {} },
            {
              title: 'Редактировать информацию о сотруднике',
              onClick: () => {},
            },
            {
              title: 'Удалить сотрудника',
              color: 'danger',
              onClick: () => {},
            },
          ],
        }}
      />
      {userData?.status?.type && (
        <StaffStatus status={userData?.status?.type} />
      )}

      <Margin>
        <Tabs tabItems={tabItems} tabsType={'tabs'} activeKey={currentTabKey} />
      </Margin>

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
          <div></div>
        </GridWrapper>
      )}
      {currentTabKey === '2' && <h2>Страница появится в будущем</h2>}
    </Wrapper>
  );
};
