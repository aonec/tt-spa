import React, { FC } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
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
import { ElevatorExistingType } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';
import {
  ElevatorDictionary,
  getElevatorType,
} from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';

export const AdditionalInfoTab: FC<AdditionalInfoTabProps> = ({
  housingStock,
  onPageCancel,
  handleUpdateHousingStock,
}) => {
  const constructionYear = moment(housingStock.constructionYear).format('YYYY');

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      floors: housingStock.numberOfFloors,
      entrances: housingStock.numberOfEntrances,
      elevator: getElevatorType(housingStock.isThereElevator),
      apartments: housingStock.numberOfApartments,
      totalArea: housingStock.totalArea,
      totalLivingArea: housingStock.totalLivingArea,
      constructionYear: Number(constructionYear),
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleUpdateHousingStock(data);
    },
    validateOnChange: false,
  });

  return (
    <Wrapper>
      <PageTitle>Дополнительная информация </PageTitle>

      <GridContainer>
        <FormItem label="Количество этажей">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('floors', value.target.value)}
            value={values.floors || undefined}
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

        <FormItem label="Число подъездов">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('entrances', value.target.value)}
            value={values.entrances || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Количество квартир">
          <Input
            placeholder="Введите"
            onChange={(value) =>
              setFieldValue('apartments', value.target.value)
            }
            value={values.apartments || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Общая площадь жилых помещений">
          <Input
            placeholder="Введите"
            onChange={(value) =>
              setFieldValue('totalLivingArea', value.target.value)
            }
            value={values.totalLivingArea || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Общая площадь">
          <Input
            placeholder="Введите"
            onChange={(value) => setFieldValue('totalArea', value.target.value)}
            value={values.totalArea || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Год постройки">
          <Input
            placeholder="Введите"
            onChange={(value) =>
              setFieldValue('constructionYear', value.target.value)
            }
            value={values.constructionYear || undefined}
            type="number"
          />
        </FormItem>
      </GridContainer>

      <Footer>
        <RightButtonBlock>
          <ButtonPadding>
            <Button type="ghost" onClick={onPageCancel}>
              Отмена
            </Button>
          </ButtonPadding>
          <Button onClick={() => handleSubmit()}>Сохранить</Button>
        </RightButtonBlock>
      </Footer>
    </Wrapper>
  );
};
