import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  FieldName,
  Header,
  MenuItem,
  ValueWrapper,
  DropdownSC,
  IconsWrapper,
  TextWrapper,
  ButtonsWrapper,
  ChevronSC,
} from './PhoneNumberField.styled';
import { PhoneNumberFieldProps } from './PhoneNumberField.types';
import { Menu } from 'antd';
import _ from 'lodash';
import { PencilIcon, TrashIcon } from 'ui-kit/icons';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { Input } from 'ui-kit/Input';
import { Button } from 'ui-kit/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

const getMenuButtons = ({
  phoneNumbers,
  selectPhoneNumber,
  isEditable,
  editPhoneNumber,
  deletePhoneNumber,
}: {
  phoneNumbers: string[];
  selectPhoneNumber: (phone: string) => void;
  isEditable: boolean;
  editPhoneNumber: (phone: string) => void;
  deletePhoneNumber?: (phone: string) => void;
}) =>
  phoneNumbers.map((phone, index) => {
    return (
      <MenuItem
        onClick={() => {
          selectPhoneNumber(phone);
        }}
        key={index + phone}
      >
        <Tooltip title={phone}>
          <TextWrapper>{phone}</TextWrapper>
        </Tooltip>
        {isEditable && (
          <IconsWrapper>
            <PencilIcon onClick={() => editPhoneNumber(phone)} />
            <TrashIcon
              onClick={(e) => {
                e.stopPropagation();
                if (deletePhoneNumber) deletePhoneNumber(phone);
              }}
            />
          </IconsWrapper>
        )}
      </MenuItem>
    );
  });

export const PhoneNumberField: FC<PhoneNumberFieldProps> = ({
  phoneNumbers,
  addPhoneNumber,
  deletePhoneNumber,
  replacePhoneNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoneNumber, selectPhoneNumber] = useState<string | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  const isEditable = useMemo(
    () => Boolean(deletePhoneNumber && addPhoneNumber),
    [deletePhoneNumber, addPhoneNumber],
  );

  const { values, setFieldValue, submitForm, resetForm, errors } = useFormik({
    initialValues: {
      phoneNumber: '',
      oldPhoneNumber: null,
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.string().test(
        'isNumber',
        'Телефонный номер может содержать только цифры',
        (value) => /^[0-9]*$/.test(value || ''),
      ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: true,
    onSubmit: (values) => {
      setIsEditing(false);

      const { phoneNumber, oldPhoneNumber } = values;

      if (oldPhoneNumber) {
        return (
          replacePhoneNumber &&
          replacePhoneNumber({ oldPhoneNumber, phoneNumber })
        );
      }
      if (addPhoneNumber) addPhoneNumber(phoneNumber);
    },
  });

  useEffect(() => {
    selectPhoneNumber(_.first(phoneNumbers) || null);
  }, [phoneNumbers]);

  const menu = () => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      {[
        ...getMenuButtons({
          phoneNumbers,
          selectPhoneNumber,
          isEditable,
          editPhoneNumber: (phone) => {
            setFieldValue('phoneNumber', phone);
            setFieldValue('oldPhoneNumber', phone);
            setIsEditing(true);
          },
          deletePhoneNumber,
        }),
        ...(isEditable
          ? [
              <MenuItem
                key="add-number"
                color={'#189EE9'}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Добавить номер
              </MenuItem>,
            ]
          : []),
      ]}
    </Menu>
  );

  return (
    <div>
      <Header>
        <FieldName>Номер телефона</FieldName>
      </Header>
      {!isEditing && (
        <DropdownSC
          dropdownRender={menu}
          open={isOpen}
          trigger={['click']}
          onOpenChange={(visible) => setIsOpen(visible)}
        >
          <Tooltip title={selectedPhoneNumber}>
            <ValueWrapper>
              <TextWrapper> {selectedPhoneNumber}</TextWrapper>
              <ChevronSC isOpen={isOpen} />
            </ValueWrapper>
          </Tooltip>
        </DropdownSC>
      )}
      {isEditing && (
        <div>
          <Input
            small
            value={values.phoneNumber}
            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
          />
          <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
          <ButtonsWrapper>
            <Button
              size="s"
              type="ghost"
              onClick={() => {
                setIsEditing(false);
                resetForm();
              }}
            >
              Отмена
            </Button>
            <Button size="s" onClick={submitForm}>
              Сохранить
            </Button>
          </ButtonsWrapper>
        </div>
      )}
    </div>
  );
};
