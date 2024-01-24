import React, { FC } from 'react';
import { editHomeownerPhoneNumberService } from './editHomeownerPhoneNumberService.models';
import { FormItem } from 'ui-kit/FormItem';
import { PhoneNumberFormField } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PhoneNumberFormField';
import { useUnit } from 'effector-react';
import { homeownerAccountQuery } from './editHomeownerPhoneNumberService.api';
import { EditHomeownerPhoneNumberContainerProps } from './editHomeownerPhoneNumberService.types';

const {
  gates: { EditHomeownerAccountGate },
} = editHomeownerPhoneNumberService;

export const EditHomeownerPhoneNumberContainer: FC<
  EditHomeownerPhoneNumberContainerProps
> = ({ accId }) => {
  const { data: homeowner } = useUnit(homeownerAccountQuery);

  const phoneNumbers = homeowner?.phoneNumbers || [];

  return (
    <>
      <EditHomeownerAccountGate id={accId} />
      <FormItem label="Телефон">
        <PhoneNumberFormField
          phoneNumbers={phoneNumbers}
          addPhoneNumber={(phone) => {}}
          deletePhoneNumber={(oldPhoneNumber) => {}}
        />
      </FormItem>
    </>
  );
};
