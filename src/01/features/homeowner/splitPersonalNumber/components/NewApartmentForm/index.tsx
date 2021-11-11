import { PersonalNumberEditForm } from '01/features/homeowner/editPersonalNumber/components/PersonalNumberEditForm';
import { Grid } from '01/shared/ui/Layout/Grid';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import { Wrap } from '../TransferDevices';
import { Form } from 'antd';
import { InputTT } from '01/tt-components';
import { useStore } from 'effector-react';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { newApartmentPersonalNumberForm } from '../../models';
import { useForm } from 'effector-forms/dist';
import { ErrorMessage } from '01/features/contractors/addContractors';

export const NewApartmentForm = () => {
  const apartment = useStore($apartment);
  const { fields } = useForm(newApartmentPersonalNumberForm);

  return (
    <Wrap>
      <Grid temp="1fr 0.5fr 0.5fr" gap="15px">
        <Form.Item label="Улица">
          <InputTT disabled value={apartment?.housingStock?.street} />
        </Form.Item>
        <Form.Item label="Дом">
          <InputTT
            disabled
            value={`${apartment?.housingStock?.number}${
              apartment?.housingStock?.corpus || ''
            }`}
          />
        </Form.Item>
        <Form.Item label="Квартира">
          <InputTT
            value={fields.apartmentNumber.value}
            onChange={(e: any) =>
              fields.apartmentNumber.onChange(e.target.value)
            }
          />
          <ErrorMessage>
            {fields.apartmentNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
      </Grid>
      <SpaceLine />
      <PersonalNumberEditForm form={newApartmentPersonalNumberForm} />
    </Wrap>
  );
};
