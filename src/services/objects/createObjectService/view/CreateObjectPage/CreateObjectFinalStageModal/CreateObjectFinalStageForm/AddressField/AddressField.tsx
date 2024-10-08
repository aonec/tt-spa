import React, { FC } from 'react';
import { Field, SpacedIndex, SpacesHouseNumber } from './AddressField.styled';
import { AddressFieldProps } from './AddressField.types';

export const AddressField: FC<AddressFieldProps> = ({ createObjectData }) => {
  if (!createObjectData) {
    return (<Field>-</Field>);
  }

  return (
    <Field>
      {createObjectData.city}, ул. {createObjectData.street},
      <SpacesHouseNumber>{createObjectData.house}</SpacesHouseNumber>
      {createObjectData.corpus && `к. ${createObjectData.corpus} `}
      {createObjectData?.index && <SpacedIndex>({createObjectData?.index})</SpacedIndex>}
    </Field>
  );
};
