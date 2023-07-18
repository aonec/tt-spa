import React, { FC, useState } from 'react';
import {
  InfoPanelLabel,
  PhoneNumberFooter,
  PhoneNumberHeader,
  PhoneNumberWrapper,
  Wrapper,
} from './PhoneNumber.styled';
import { PhoneNumberProps } from './PhoneNumber.types';
import { PencilIconSC } from '../ApartmentInfo.styled';
import { Button } from 'ui-kit/Button';
import { Input } from 'ui-kit/Input';

export const PhoneNumber: FC<PhoneNumberProps> = ({
  phoneNumber,
  handleUpdate,
  homeownerId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string | null>(
    phoneNumber,
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setCurrentPhoneNumber(phoneNumber);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);

    if (currentPhoneNumber === phoneNumber) return;

    homeownerId &&
      handleUpdate &&
      handleUpdate({
        id: homeownerId,
        data: { phoneNumber: currentPhoneNumber },
      });
  };

  return (
    <Wrapper>
      <PhoneNumberHeader>
        <InfoPanelLabel>Телефон</InfoPanelLabel>
        <PencilIconSC onClick={isEditing ? handleCancelEdit : handleEdit} />
      </PhoneNumberHeader>

      {!isEditing && (
        <PhoneNumberWrapper onClick={handleEdit}>
          {phoneNumber}
        </PhoneNumberWrapper>
      )}

      {isEditing && (
        <Input
          value={currentPhoneNumber || ''}
          onChange={(value) => setCurrentPhoneNumber(value.target.value)}
        />
      )}
      {isEditing && (
        <PhoneNumberFooter>
          <Button type="ghost" size="small" onClick={handleCancelEdit}>
            Отмена
          </Button>
          <Button size="small" onClick={handleSave}>
            Сохранить
          </Button>
        </PhoneNumberFooter>
      )}
    </Wrapper>
  );
};
