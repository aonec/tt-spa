import React, { FC } from 'react';
import { useFormik } from 'formik';
import {
  ButtonPadding,
  Footer,
  GridContainer,
  RightButtonBlock,
  Wrapper,
} from './AdditionalInfoTab.styled';
import { AdditionalInfoTabProps } from './AdditionalInfoTab.types';
import { PageTitle } from '../MainInfoTab/MainInfoTab.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { Button } from 'ui-kit/Button';

export const AdditionalInfoTab: FC<AdditionalInfoTabProps> = ({}) => {
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      floors: createObjectData?.floors || null,
      entrances: createObjectData?.entrances || null,
      elevator: createObjectData?.elevator || null,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleSubmitCreateObject(data);
      openPreviewModal();
    },
    validateOnChange: false,
  });

  return (
    <Wrapper>
      <PageTitle>Дополнительная информация </PageTitle>

      <GridContainer>
        <FormItem label="Число этажей">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('floors', value.target.value)}
            value={values.floors || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Число подъездов">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('entrances', value.target.value)}
            value={values.entrances || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Лифт">
          <Select
            placeholder="Выберите из списка"
            onChange={(value) => setFieldValue('elevator', value)}
            value={values.elevator || undefined}
          >
            {Object.values(ElevatorExistingType).map((e) => (
              <Select.Option value={e} key={e}>
                {ElevatorDictionary[e]}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </GridContainer>

      <Footer>
        <RightButtonBlock>
          <ButtonPadding>
            <Button type="ghost" onClick={() => onPageCancel()}>
              Отмена
            </Button>
          </ButtonPadding>
          <Button sidePadding={25} onClick={() => handleSubmit()}>
            Сохранить
          </Button>
        </RightButtonBlock>
      </Footer>
    </Wrapper>
  );
};
