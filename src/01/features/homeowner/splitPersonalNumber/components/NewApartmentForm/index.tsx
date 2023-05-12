import { PersonalNumberEditForm } from '01/features/homeowner/editPersonalNumber/components/PersonalNumberEditForm';
import { Grid } from '01/shared/ui/Layout/Grid';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import { Wrap } from '../TransferDevices';
import { Form } from 'antd';
import { useStore } from 'effector-react';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { newApartmentPersonalNumberForm } from '../../models';
import { useForm } from 'effector-forms/dist';
import { PersonalNumberFormMountPlaceType } from '01/features/homeowner/editPersonalNumber/components/PersonalNumberEditForm/personalNumberEditForm.controller';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';

export const NewApartmentForm = () => {
  const apartment = useStore($apartment);
  const { fields } = useForm(newApartmentPersonalNumberForm);

  const address = apartment?.housingStock?.address?.mainAddress;

  return (
    <Wrap>
      <Grid temp="1fr 0.5fr 0.5fr" gap="15px">
        <Form.Item label="Улица">
          <Input disabled value={address?.street || undefined} />
        </Form.Item>
        <Form.Item label="Дом">
          <Input
            disabled
            value={`${address?.number}${address?.corpus || ''}`}
          />
        </Form.Item>
        <Form.Item label="Квартира">
          <Input
            value={fields.apartmentNumber.value || undefined}
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
      <PersonalNumberEditForm
        form={newApartmentPersonalNumberForm}
        type={PersonalNumberFormMountPlaceType.Split}
      />
    </Wrap>
  );
};
