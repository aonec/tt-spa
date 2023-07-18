import React, { FC, useState } from 'react';
import {
  ExtraInfoText,
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
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(phoneNumber);

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
    // <ExtraInfoText>{phoneNumber}</ExtraInfoText>
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
          value={phoneNumber || ''}
          onChange={(e) => setCurrentPhoneNumber(e.target.value)}
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
