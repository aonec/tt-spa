import { PersonalNumberEditForm } from '01/features/homeowner/editPersonalNumber/components/PersonalNumberEditForm';
import { Grid } from '01/shared/ui/Layout/Grid';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import { Wrap } from '../TransferDevices';
import { Form } from 'antd';
import { InputTT } from '01/tt-components';
import { useStore } from 'effector-react';
import { $apartment } from '01/features/apartments/displayApartment/models';

export const NewApartmentForm = () => {
  const apartment = useStore($apartment);

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
          <InputTT />
        </Form.Item>
      </Grid>
      <SpaceLine />
      <PersonalNumberEditForm />
    </Wrap>
  );
};
