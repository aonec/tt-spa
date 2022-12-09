import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { StyledSelect } from '01/shared/ui/Select/components';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ElevatorExistingType } from '../CreateObjectFinalStageModal/CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';
import { ElevatorDictionary } from '../CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';
import { PageTitle } from '../CreateObjectPage.styled';
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
  createObjectData,
  openPreviewModal,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik<AdditionalInfo>({
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
          <StyledSelect
            placeholder="Выберите из списка"
            onChange={(value) => setFieldValue('elevator', value)}
            value={values.elevator || undefined}
          >
            {Object.values(ElevatorExistingType).map((e) => (
              <Select.Option value={e} key={e}>
                {ElevatorDictionary[e]}
              </Select.Option>
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
