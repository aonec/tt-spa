import { FC } from 'react';
import { Description, Title, Wrapper } from './ConfigureMvituPanel.styled';
import { Props } from './ConfigureMvituPanel.types';
import { ConnectionIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';

export const ConfigureMvituPanel: FC<Props> = () => {
  return (
    <Wrapper>
      <ConnectionIcon />
      <Title>Интеграция с ВИС МВИТУ не подключена</Title>
      <Description>
        Вы можете подключить интеграцию с ВИС МВИТУ и управлять узлами
      </Description>
      <Button>Подключить</Button>
    </Wrapper>
  );
};
