import { useFormik } from 'formik';
import React, { FC } from 'react';
import dayjs from 'api/dayjs';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ElevatorExistingType } from '../CreateObjectFinalStageModal/CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';
import { ElevatorDictionary } from '../CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';
import { PageTitle } from '../CreateObjectPage.styled';
import {
  ButtonPadding,
  ButtonSC,
  ConstrutionYearWrapper,
  Footer,
  GridContainer,
  RightButtonBlock,
  Wrapper,
} from './CreateObjectAdditionalInfoStage.styled';
import {
  AdditionalInfo,
  CreateObjectAdditionalInfoStageProps,
} from './CreateObjectAdditionalInfoStage.types';
import { DatePicker } from 'ui-kit/DatePicker';
import { EHouseCategory } from 'api/types';

export const CreateObjectAdditionalInfoStage: FC<
  CreateObjectAdditionalInfoStageProps
> = ({
  goBackStage,
  onPageCancel,
  handleSubmitCreateObject,
  createObjectData,
  openPreviewModal,
}) => {
  const { values, handleSubmit, setFieldValue, handleChange } =
    useFormik<AdditionalInfo>({
      initialValues: {
        floors: createObjectData?.floors || null,
        entrances: createObjectData?.entrances || null,
        elevator: createObjectData?.elevator || null,
        constructionYear: createObjectData?.constructionYear || '',
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

      <GridContainer
        category={createObjectData?.objectCategory || EHouseCategory.Living}
      >
        <FormItem label="Число этажей">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('floors', value.target.value)}
            value={values.floors || undefined}
            type="number"
          />
        </FormItem>

        {createObjectData?.objectCategory === EHouseCategory.Living && (
          <FormItem label="Число подъездов">
            <Input
              placeholder="Введите"
              name="entrances"
              onChange={handleChange}
              value={values.entrances || undefined}
              type="number"
            />
          </FormItem>
        )}

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

      <ConstrutionYearWrapper>
        <FormItem label="Год постройки">
          <DatePicker
            picker="year"
            onChange={(value, dateString) =>
              setFieldValue('constructionYear', dateString)
            }
            value={
              values.constructionYear
                ? dayjs(values.constructionYear)
                : undefined
            }
          />
        </FormItem>
      </ConstrutionYearWrapper>

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
          <ButtonSC onClick={() => handleSubmit()}>Создать объект</ButtonSC>
        </RightButtonBlock>
      </Footer>
    </Wrapper>
  );
};
