import { StyledSelect } from '01/shared/ui/Select/components';
import { InputTT } from '01/tt-components';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { PageTitle } from '../CreateObjectPage.styled';
import {
  ButtonPadding,
  Footer,
  GridContainer,
  RightButtonBlock,
  Wrapper,
} from './CreateObjectAdditionalInfoStage.styled';
import { CreateObjectAdditionalInfoStageProps } from './CreateObjectAdditionalInfoStage.types';

export const CreateObjectAdditionalInfoStage: FC<CreateObjectAdditionalInfoStageProps> = ({
  goBackStage,
  onPageCancel,
}) => {
  const lift = ['Есть', 'Нет'];
  return (
    <Wrapper>
      <PageTitle>Дополнительная информация </PageTitle>

      <GridContainer>
        <FormItem label="Число этажей">
          <InputTT placeholder="Введите" />
        </FormItem>

        <FormItem label="Число подъездов">
          <InputTT placeholder="Введите" />
        </FormItem>

        <FormItem label="Лифт">
          <StyledSelect
            placeholder="Выберите из списка"
            onChange={(value) => {}}
          >
            {lift.map((e) => (
              <Select.Option value={e}>{e}</Select.Option>
            ))}
          </StyledSelect>
        </FormItem>
      </GridContainer>

      <Footer>
        <Button type="ghost" onClick={() => goBackStage()}>
          Назад
        </Button>
        <RightButtonBlock>
          <ButtonPadding>
            <Button type="ghost" onClick={() => onPageCancel()}>
              Отмена
            </Button>
          </ButtonPadding>
          <Button sidePadding={25} onClick={() => {}}>
            Создать объект
          </Button>
        </RightButtonBlock>
      </Footer>
    </Wrapper>
  );
};
