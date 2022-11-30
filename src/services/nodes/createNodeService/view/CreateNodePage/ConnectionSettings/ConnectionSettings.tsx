import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { CalculatorSelectWrapper } from './ConnectionSettings.styled';
import { ConnectionSettingsProps } from './ConnectionSettings.types';

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  goPrevStep,
}) => {
  return (
    <div>
      <Title>Настройки соединения</Title>
      <div>
        <FormItem label="Подключение к вычислителю">
          <Select placeholder="Выберите" />
        </FormItem>
        <CalculatorSelectWrapper>
          <FormItem label="Вычислитель, к которому подключен узел">
            <Select placeholder="Выберите" />
          </FormItem>
          <LinkButton onClick={() => {}}>
            + Создать новый вычислитель
          </LinkButton>
        </CalculatorSelectWrapper>
        <FormItem label="Номер ввода">
          <Select placeholder="Выберите из списка" />
        </FormItem>
      </div>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20}>Далее</Button>
      </Footer>
    </div>
  );
};
