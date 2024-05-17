import React, { FC, useMemo } from 'react';
import { TabsSC, Wrapper } from './UserProfile.styled';
import { Props, UserProfileSection } from './UserProfile.types';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { MainInfo } from './MainInfo';
import { NotificationsContainer } from './notifications/notificationsService.container';

export const UserProfile: FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();
  const { section } = useParams<{ section: UserProfileSection }>();

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: UserProfileSection.MainInfo },
      { label: 'Уведомления', key: UserProfileSection.Notifications },
    ],
    [],
  );

  return (
    <Wrapper>
      <PageHeader
        title="Ваш профиль"
        contextMenu={{
          menuButtons: [
            // {
            //   title: 'Редактировать',
            //   onClick: () => handleEditUser(),
            //   hidden: UserProfileSection.Notifications === section,
            // },
          ],
        }}
      />

      <TabsSC
        activeKey={section}
        onChange={(activeKey) =>
          navigate(`/currentUserProfile/${activeKey as UserProfileSection}`)
        }
        items={tabItems}
      />

      {section === UserProfileSection.MainInfo && (
        <MainInfo currentUser={currentUser} />
      )}
      {section === UserProfileSection.Notifications && (
        <NotificationsContainer />
      )}
    </Wrapper>
  );
};
