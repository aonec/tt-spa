import { StyledSelect } from '01/shared/ui/Select/components';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { PageTitle } from '../CreateObjectPage.styled';
import { validationSchema } from './createObjectAdditionalInfoStage.constants';
import {
  ButtonPadding,
  Footer,
  GridContainer,
  RightButtonBlock,
  Wrapper,
} from './CreateObjectAdditionalInfoStage.styled';
import {
  AdditionalInfo,
  CreateObjectAdditionalInfoStageProps,
} from './CreateObjectAdditionalInfoStage.types';

export const CreateObjectAdditionalInfoStage: FC<CreateObjectAdditionalInfoStageProps> = ({
  goBackStage,
  onPageCancel,
  handleSubmitCreateObject,
}) => {
  const lift = ['Есть', 'Нет'];

  const { values, handleSubmit, setFieldValue } = useFormik<AdditionalInfo>({
    initialValues: {
      floors: '',
      entrances: '',
      elevater: '',
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleSubmitCreateObject(data);
    },
    validateOnBlur: true,
    validationSchema,
  });

  return (
    <Wrapper>
      <PageTitle>Дополнительная информация </PageTitle>

      <GridContainer>
        <FormItem label="Число этажей">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('floors', value.target.value)}
            value={values.floors}
          />
        </FormItem>

        <FormItem label="Число подъездов">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('entrances', value.target.value)}
            value={values.entrances}
          />
        </FormItem>

        <FormItem label="Лифт">
          <StyledSelect
            placeholder="Выберите из списка"
            onChange={(value) => setFieldValue('elevater', value)}
            value={values.elevater}
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
          <Button sidePadding={25} onClick={() => handleSubmit()}>
            Создать объект
          </Button>
        </RightButtonBlock>
      </Footer>
    </Wrapper>
  );
};
