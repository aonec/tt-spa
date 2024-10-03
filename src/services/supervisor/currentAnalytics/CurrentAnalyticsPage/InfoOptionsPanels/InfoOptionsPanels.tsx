import { FC } from 'react';
import { Wrapper } from './InfoOptionsPanels.styled';
import { Props } from './InfoOptionsPanels.types';
import { OptionPanelButton } from 'ui-kit/shared/OptionPanelButton';

export const InfoOptionsPanels: FC<Props> = () => {
  return (
    <Wrapper>
      <OptionPanelButton title="Порывы">53</OptionPanelButton>
      <OptionPanelButton title="Отключения">30</OptionPanelButton>
      <OptionPanelButton title="Неисправности">378</OptionPanelButton>
      <OptionPanelButton title="Время на задачу">15.3 мин</OptionPanelButton>
      <OptionPanelButton title="Качество услуг">70 задач</OptionPanelButton>
    </Wrapper>
  );
};
