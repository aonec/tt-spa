import React, { FC } from 'react';
import { Wrapper } from './CreateResourceDisconnectionPanel.styled';
import { Props } from './CreateResourceDisconnectionPanel.types';
import { Button } from 'ui-kit/Button';

export const CreateResourceDisconnectionPanel: FC<Props> = ({
  openCreateDisconnectionModal,
}) => {
  return (
    <Wrapper>
      <Button onClick={openCreateDisconnectionModal}>
        Создать отключение ресурса
      </Button>
    </Wrapper>
  );
};
