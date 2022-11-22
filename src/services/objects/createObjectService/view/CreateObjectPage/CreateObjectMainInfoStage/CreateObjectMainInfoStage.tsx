import { StyledSelect } from '01/shared/ui/Select/components';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { PageTitle } from '../CreateObjectPage.styled';
import {
  ButtonPadding,
  Footer,
  RightButtonBlock,
  Wrapper,
} from './CreateObjectMainInfoStage.styled';
import { CreateObjectMainInfoStageProps } from './CreateObjectMainInfoStage.types';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({houseManagements}) => {
  return (<>

    <Wrapper>
      <PageTitle>Основная информация </PageTitle>

      <FormItem label="Город">
        <StyledSelect placeholder="Выберите из списка" onChange={(value) => {}}>
          {houseManagements?.map((houseManagement) => (
            <Select.Option value={houseManagement}>
              {houseManagement}
            </Select.Option>
          ))}
        </StyledSelect>
      </FormItem>
      <Footer>
        <Button type="ghost">Назад</Button>
        <RightButtonBlock>
          <ButtonPadding>
            <Button type="ghost">Отмена</Button>
          </ButtonPadding>
          <Button sidePadding={25} onClick={() => {}}>
            Далее
          </Button>
        </RightButtonBlock>
      </Footer>
    </Wrapper></>
  );
};
