import React, { FC, useEffect, useState } from 'react';
import {
  FieldName,
  Header,
  MenuItem,
  ValueWrapper,
  DropdownSC,
  IconsWrapper,
  TextWrapper,
  ButtonsWrapper,
} from './PhoneNumberField.styled';
import { PhoneNumberFieldProps } from './PhoneNumberField.types';
import { Menu } from 'antd';
import _ from 'lodash';
import { PencilIcon, TrashIcon } from 'ui-kit/icons';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { Input } from 'ui-kit/Input';
import { Button } from 'ui-kit/Button';

const getMenuButtons = ({
  phoneNumbers,
  selectPhoneNumber,
}: {
  phoneNumbers: string[];
  selectPhoneNumber: (phone: string) => void;
}) =>
  phoneNumbers.map((phone, index) => {
    return (
      <MenuItem
        onClick={() => {
          selectPhoneNumber(phone);
          // setIsOpen(false);
        }}
        key={index + phone}
      >
        <Tooltip title={phone}>
          <TextWrapper>{phone}</TextWrapper>
        </Tooltip>
        <IconsWrapper>
          <PencilIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <TrashIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </IconsWrapper>
      </MenuItem>
    );
  });

export const PhoneNumberField: FC<PhoneNumberFieldProps> = ({
  phoneNumbers,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoneNumber, selectPhoneNumber] = useState<string | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    selectPhoneNumber(_.first(phoneNumbers) || null);
  }, [phoneNumbers]);

  const menu = () => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      {[
        ...getMenuButtons({ phoneNumbers, selectPhoneNumber }),
        <MenuItem
          color={'#189EE9'}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Добавить номер
        </MenuItem>,
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
            <ValueWrapper>{selectedPhoneNumber || '8t35432489'}</ValueWrapper>
          </Tooltip>
        </DropdownSC>
      )}
      {isEditing && (
        <div>
          <Input small />
          <ButtonsWrapper>
            <Button
              size="small"
              type="ghost"
              onClick={() => setIsEditing(false)}
            >
              Отмена
            </Button>
            <Button size="small">Сохранить</Button>
          </ButtonsWrapper>
        </div>
      )}
    </div>
  );
};
