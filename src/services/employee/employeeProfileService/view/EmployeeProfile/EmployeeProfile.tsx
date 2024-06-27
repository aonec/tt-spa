import { SpaceLine } from 'ui-kit/SpaceLine';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import dayjs from 'api/dayjs';
import React, { FC, useMemo, useState } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
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
import { useNavigate } from 'react-router-dom';
import { sortUserRoles } from 'services/company/companyProfileService/view/CompanyProfile/Tabs/Staff/Staff.utils';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { StaffStatus } from 'ui-kit/shared/StaffStatus/StaffStatus';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export const EmployeeProfile: FC<EmployeeProfileProps> = ({
  userData,
  handleOpenChangeStatusModal,
  handleOpenDeleteEmployeeModal,
  handleCatchEmployeeId,
}) => {
  const navigate = useNavigate();

  const userInitials = `${userData?.firstName || ''} ${
    userData?.middleName || ''
  } ${userData?.lastName || ''}`;

  const userId = userData?.id;

  const phoneMask = usePhoneMask();

  const sortedRoles = sortUserRoles(userData?.roles || []);
  const rolesString = sortedRoles?.map(({ value }) => value).join(', ');

  const [currentTabKey, setTab] = useState('1');

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: '1' },
      { label: 'Статистика', key: '2' },
    ],
    [],
  );

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
                navigate(
                  `/companyProfile/editManagingFirmUser/${userData?.id}`,
                ),
            },
            {
              title: 'Удалить сотрудника',
              color: ContextMenuButtonColor.danger,
              onClick: () => {
                handleOpenDeleteEmployeeModal();
                userId && handleCatchEmployeeId(userId);
              },
            },
          ],
        }}
      />
      {userData?.status?.type && (
        <StaffStatus status={userData?.status?.type} />
      )}

      <TabsSC activeKey={currentTabKey} onChange={setTab} items={tabItems} />

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
                  dayjs(userData?.hireDate).format('DD.MM.YYYY')) ||
                  'Нет данных'}
              </Field>
            </GridContainer>
            <SpaceLine />
            <GridContainer>
              <FieldTitle>Объекты на обслуживании</FieldTitle>
              <FieldHousingStocksNumber>
                Выбрано {userData?.buildings?.length} адресов
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
