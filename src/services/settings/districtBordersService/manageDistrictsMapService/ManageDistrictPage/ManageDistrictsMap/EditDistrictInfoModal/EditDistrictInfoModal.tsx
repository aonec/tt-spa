import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DistrictColorsList } from 'dictionaries';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import {
  ColorCircle,
  FormItemSC,
  SelectColorOptionWrapper,
  Wrapper,
} from './EditDistrictInfoModal.styled';
import { Props } from './EditDistrictInfoModal.types';

export const EditDistrictInfoModal: FC<Props> = ({
  closeEditDistrictModal,
  districtName,
  districtColorType,
}) => {
  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: { districtName, districtColorType },
      onSubmit: () => {},
      validationSchema: Yup.object().shape({
        districtName: Yup.string().required('Это поле обязательное'),
      }),
    });

  return (
    <FormModal
      title="Редактировать район"
      formId="edit-district-info-form"
      form={
        <Wrapper>
          <FormItemSC label="Наазвание района">
            <Input
              value={values.districtName}
              onChange={handleChange}
              name="districtName"
              placeholder="Введите название района"
            />
            <ErrorMessage>{errors.districtName}</ErrorMessage>
          </FormItemSC>
          <FormItemSC label="Цвет">
            <Select
              value={values.districtColorType}
              onChange={(value) => setFieldValue('districtColorType', value)}
            >
              {DistrictColorsList.map((elem) => (
                <Select.Option value={elem.type} key={elem.type}>
                  <SelectColorOptionWrapper>
                    <ColorCircle
                      fillColor={elem.color}
                      strokeColor={elem.strokeColor}
                    />
                    {elem.name}
                  </SelectColorOptionWrapper>
                </Select.Option>
              ))}
            </Select>
          </FormItemSC>
        </Wrapper>
      }
      visible
      onCancel={closeEditDistrictModal}
      onSubmit={handleSubmit}
      submitBtnText="Сохранить изменения"
    />
  );
};
