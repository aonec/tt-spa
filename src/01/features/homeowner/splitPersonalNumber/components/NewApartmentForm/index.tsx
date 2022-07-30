import React from 'react';
import { Wrap } from '../TransferDevices';
import { Form } from 'antd';
import { useStore } from 'effector-react';
import { newApartmentPersonalNumberForm } from '../../models';
import { useForm } from 'effector-forms/dist';
import { $apartment } from '../../../../apartments/displayApartment/models';
import { Grid } from '../../../../../shared/ui/Layout/Grid';
import { InputTT } from '../../../../../tt-components';
import { ErrorMessage } from '../../../../contractors/addContractors';
import { SpaceLine } from '../../../../../shared/ui/Layout/Space/Space';
import { PersonalNumberEditForm } from '../../../editPersonalNumber/components/PersonalNumberEditForm';

export const NewApartmentForm = () => {
  const apartment = useStore($apartment);
  const { fields } = useForm(newApartmentPersonalNumberForm);

  const address = apartment?.housingStock?.address?.mainAddress;

  return (
    <Wrap>
      <Grid temp="1fr 0.5fr 0.5fr" gap="15px">
        <Form.Item label="Улица">
          <InputTT disabled value={address?.street} />
        </Form.Item>
        <Form.Item label="Дом">
          <InputTT
            disabled
            value={`${address?.number}${address?.corpus || ''}`}
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
