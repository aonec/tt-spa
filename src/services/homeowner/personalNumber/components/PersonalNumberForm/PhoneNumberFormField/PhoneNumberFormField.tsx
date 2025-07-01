import React, { FC, useState } from 'react';
import { PhoneNumberFormFieldProps } from './PhoneNumberFormField.types';
import { Select } from 'ui-kit/Select';
import {
  ButtonsWrapper,
  TextWrapper,
  TrashIconSC,
  ValueWrapper,
} from './PhoneNumberFormField.styled';
import { Button } from 'ui-kit/Button';
import { Input } from 'ui-kit/Input';
import { Popconfirm } from 'antd';
const { Option } = Select;

const addNewPhone = 'ADD_NEW_PHONE';

export const PhoneNumberFormField: FC<PhoneNumberFormFieldProps> = ({
  deletePhoneNumber,
  phoneNumbers,
  addPhoneNumber,
  isConfirmDeleting,
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
          {phoneNumbers.map((phone) => {
            const trashIcon = (
              <TrashIconSC onClick={(e) => e.stopPropagation()} />
            );

            return (
              <Option value={phone} key={phone}>
                <ValueWrapper>
                  <TextWrapper>{phone}</TextWrapper>
                  {isConfirmDeleting && (
                    <Popconfirm
                      cancelText="Отмена"
                      okText="Удалить"
                      title="Удаление номера телефона"
                      description="Вы уверены, что хотите удалить этот номер телефона?"
                      onConfirm={() => {
                        deletePhoneNumber(phone);
                        setValue(null);
                      }}
                    >
                      {trashIcon}
                    </Popconfirm>
                  )}
                  {!isConfirmDeleting && trashIcon}
                </ValueWrapper>
              </Option>
            );
          })}
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
              size="s"
              type="ghost"
              onClick={() => {
                setIsAdd(false);
                setNewPhone(null);
              }}
            >
              Отмена
            </Button>
            <Button
              size="s"
              onClick={() => {
                addPhoneNumber(newPhone || '');
                setNewPhone(null);
                setIsAdd(false);
              }}
            >
              Добавить
            </Button>
          </ButtonsWrapper>
        </div>
      )}
    </>
  );
};
