import React, { FC, useState } from 'react';
import { PhoneNumberFormFieldProps } from './PhoneNumberFormField.types';
import { Select } from 'ui-kit/Select';
import {
  ButtonsWrapper,
  TextWrapper,
  ValueWrapper,
} from './PhoneNumberFormField.styled';
import { Button } from 'ui-kit/Button';
import { Input } from 'ui-kit/Input';
import { TrashIcon } from 'ui-kit/icons';
const { Option } = Select;

const addNewPhone = 'ADD_NEW_PHONE';

export const PhoneNumberFormField: FC<PhoneNumberFormFieldProps> = ({
  deletePhoneNumber,
  phoneNumbers,
  addPhoneNumber,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [newPhone, setNewPhone] = useState<null | string>(null);
  const [value, setValue] = useState<null | string>(null);

  return (
    <>
      {!isAdd && (
        <Select
          placeholder="Введите номер телефона"
          value={value || undefined}
          onSelect={(value) => {
            if (value === addNewPhone) {
              return setIsAdd(true);
            }
            setValue(value as string);
          }}
        >
          <Option value={addNewPhone} style={{ color: '#189EE9' }}>
            Добавить новый номер телефона
          </Option>
          {phoneNumbers.map((phone) => (
            <Option value={phone} key={phone}>
              <ValueWrapper>
                <TextWrapper>{phone}</TextWrapper>
                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePhoneNumber(phone);
                    setValue(null);
                  }}
                />
              </ValueWrapper>
            </Option>
          ))}
        </Select>
      )}
      {isAdd && (
        <div>
          <Input
            placeholder="Введите номер телефона"
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <ButtonsWrapper>
            <Button
              size="small"
              type="ghost"
              onClick={() => {
                setIsAdd(false);
                setNewPhone(null);
              }}
            >
              Отмена
            </Button>
            <Button
              size="small"
              onClick={() => {
                addPhoneNumber(newPhone || '');
                setNewPhone(null);
                setIsAdd(false);
              }}
            >
              Сохранить
            </Button>
          </ButtonsWrapper>
        </div>
      )}
    </>
  );
};
