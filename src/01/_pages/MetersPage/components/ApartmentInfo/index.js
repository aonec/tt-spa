import React from 'react';
import styled, { css, use } from 'reshadow/macro';

import { userInfo, UserInfo } from './UserInfo';
import { Icon } from '01/components';
import { useHistory, useParams } from 'react-router-dom';
import { Flex } from '01/shared/ui/Layout/Flex';
import { MenuButtonTT } from '01/tt-components';

const styles = css`
  drower {
    box-shadow: var(--shadow);
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
    grid-gap: 8px;
    padding: 0;
    overflow: hidden;
    height: 0;
    &[|show] {
      padding: 16px;
      height: auto;
    }
  }
`;

export const ApartmentInfo = ({ userInfo = [], title }) => {
  const [show, setShow] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  const menuButtonArray = [
    {
      title: 'Добавить новый прибор',
      show: true,
      cb: () => history.push(`/apartment/${id}/addIndividualDevice`),
    },
  ];
  return styled(styles)(
    <>
      <Flex style={{ justifyContent: 'space-between', marginTop: 40 }}>
        <apart_title as="h2">{title}</apart_title>
        <MenuButtonTT menuButtonArr={menuButtonArray} />
      </Flex>

      <drower>
        <drower_btn onClick={() => setShow(!show)}>
          <Icon icon="down" /> Информация о квартире
        </drower_btn>
        <drower_content {...use({ show })}>
          <UserInfo list={userInfo} />
        </drower_content>
      </drower>
    </>
  );
};
