import React, { FC, useMemo } from 'react';
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
import { ElevatorExistingType } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';
import {
  ElevatorDictionary,
  IsElevatorDictionaryBoolean,
  getElevatorType,
} from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';
import { EHouseCategory } from 'myApi';

export const AdditionalInfoTab: FC<AdditionalInfoTabProps> = ({
  onPageCancel,
  handleUpdateHousingStock,
  houseCategory,
  housingStock,
  nonResidentialBuilding,
}) => {
  const building = useMemo(() => {
    if (houseCategory === EHouseCategory.Living) {
      return housingStock;
    }
    return nonResidentialBuilding;
  }, [houseCategory, nonResidentialBuilding, housingStock]);

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      numberOfFloors: building?.numberOfFloors,
      numberOfEntrances:
        houseCategory === EHouseCategory.Living
          ? housingStock?.numberOfEntrances
          : null,
      isThereElevator: getElevatorType(building?.isThereElevator || false),
      numberOfApartments:
        houseCategory === EHouseCategory.Living
          ? housingStock?.numberOfApartments
          : null,
      totalArea: building?.totalArea,
      totalLivingArea:
        houseCategory === EHouseCategory.Living
          ? housingStock?.totalLivingArea
          : null,
      constructionYear: building?.constructionYear,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      const {
        constructionYear,
        isThereElevator,
        numberOfApartments,
        numberOfEntrances,
        numberOfFloors,
        totalArea,
        totalLivingArea,
      } = data;

      handleUpdateHousingStock({
        constructionYear,
        isThereElevator: IsElevatorDictionaryBoolean[isThereElevator],
        numberOfApartments,
        numberOfEntrances,
        numberOfFloors,
        totalArea,
        totalLivingArea,
      });
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
            onChange={(value) =>
              setFieldValue('numberOfFloors', Number(value.target.value))
            }
            value={values.numberOfFloors || undefined}
            type="number"
          />
        </FormItem>

        <FormItem label="Лифт">
          <Select
            placeholder="Выберите из списка"
            onChange={(value) => setFieldValue('isThereElevator', value)}
            value={values.isThereElevator || undefined}
          >
            {Object.values(ElevatorExistingType).map((e) => (
              <Select.Option value={e} key={e}>
                {ElevatorDictionary[e]}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        {houseCategory === EHouseCategory.Living && (
          <>
            <FormItem label="Число подъездов">
              <Input
                placeholder="Введите"
                onChange={(value) =>
                  setFieldValue('numberOfEntrances', Number(value.target.value))
                }
                value={values.numberOfEntrances || undefined}
                type="number"
              />
            </FormItem>
            <FormItem label="Количество квартир">
              <Input
                placeholder="Введите"
                onChange={(value) =>
                  setFieldValue(
                    'numberOfApartments',
                    Number(value.target.value),
                  )
                }
                value={values.numberOfApartments || undefined}
                type="number"
              />
            </FormItem>
            <FormItem label="Общая площадь жилых помещений">
              <Input
                placeholder="Введите"
                onChange={(value) =>
                  setFieldValue('totalLivingArea', Number(value.target.value))
                }
                value={values.totalLivingArea || undefined}
                type="number"
              />
            </FormItem>
            <FormItem label="Общая площадь">
              <Input
                placeholder="Введите"
                onChange={(value) =>
                  setFieldValue('totalArea', Number(value.target.value))
                }
                value={values.totalArea || undefined}
                type="number"
              />
            </FormItem>
          </>
        )}

        <FormItem label="Год постройки">
          <Input
            placeholder="Введите"
            onChange={(value) =>
              setFieldValue('constructionYear', Number(value.target.value))
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
