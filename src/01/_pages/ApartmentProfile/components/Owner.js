import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '01/components/Icon';
import { Button, Title } from '.';
import { ListItem, ListItemDescription, ListItemValue } from './ListItem';

const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;
const Owner = (props) => {
  const descriptions = [
    'Номер лицевого счета',
    'Статус собственник',
    'Юридическое состояние',
    'Контактный номер телефона',
  ];

  const { firstName, personalAccountNumber, phoneNumber, test, test2 } = props;
  return (
    <>
      <TitleWrap style={{ paddingTop: '32px' }}>
        {' '}
        <Icon icon="key" />
        <Title size="24" style={{ paddingLeft: '8px' }}>
          {firstName || 'Собственник: данные обновляются'}
        </Title>
      </TitleWrap>
      <ListItem>
        <ListItemDescription>Номер лицевого счета</ListItemDescription>
        <ListItemValue>
          {personalAccountNumber || 'Данные обновляются'}
        </ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemDescription>Статус собственник</ListItemDescription>
        <ListItemValue>{test || 'Данные обновляются'}</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemDescription>Юридическое состояние</ListItemDescription>
        <ListItemValue>{test2 || 'Данные обновляются'}</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemDescription>Контактный номер телефона</ListItemDescription>
        <ListItemValue>{phoneNumber || 'Данные обновляются'}</ListItemValue>
      </ListItem>

      <Button style={{ marginTop: '16px' }}>
        Перейти в профиль собственника
      </Button>
    </>
  );
};

export default Owner;
