import React from 'react';
import styled, { css, use } from 'reshadow/macro';

import { UserInfo } from './UserInfo';
import { Icon } from '01/components';
import { useHistory, useParams } from 'react-router-dom';
import { Flex } from '01/shared/ui/Layout/Flex';
import { MenuButtonTT } from '01/tt-components';

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
    padding: 0;
    overflow: hidden;
    height: 0;
    &[|show] {
      padding: 8px 16px;
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
        </drower_content>
      </drower>
    </>
  );
};
