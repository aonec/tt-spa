import React, { FC } from 'react';
import { editHomeownerPhoneNumberService } from './editHomeownerPhoneNumberService.models';
import { FormItem } from 'ui-kit/FormItem';
import { PhoneNumberFormField } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PhoneNumberFormField';
import { useUnit } from 'effector-react';
import {
  addPhoneNumberMutation,
  homeownerAccountQuery,
} from './editHomeownerPhoneNumberService.api';
import { EditHomeownerPhoneNumberContainerProps } from './editHomeownerPhoneNumberService.types';

const {
  gates: { EditHomeownerAccountGate },
} = editHomeownerPhoneNumberService;

export const EditHomeownerPhoneNumberContainer: FC<
  EditHomeownerPhoneNumberContainerProps
> = ({ accId }) => {
  const { data: homeowner } = useUnit(homeownerAccountQuery);
  const { start: addPhoneNumber } = useUnit(addPhoneNumberMutation);

  const phoneNumbers = homeowner?.phoneNumbers || [];

  return (
    <>
      <EditHomeownerAccountGate id={accId} />
      <FormItem label="Телефон">
        <PhoneNumberFormField
          phoneNumbers={phoneNumbers}
          addPhoneNumber={(phoneNumber) => {
            addPhoneNumber({ id: accId, data: { phoneNumber } });
          }}
          deletePhoneNumber={(oldPhoneNumber) => {}}
        />
      </FormItem>
    </>
  );
};
