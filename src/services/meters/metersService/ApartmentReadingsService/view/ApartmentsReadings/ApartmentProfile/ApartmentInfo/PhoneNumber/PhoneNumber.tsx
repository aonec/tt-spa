import React, { FC, useEffect, useState } from 'react';
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
  isUpdateHomeownerLoading,
  handleHomeownerUpdated,
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
    if (currentPhoneNumber === phoneNumber) return;

    console.log(currentPhoneNumber, phoneNumber);

    homeownerId &&
      handleUpdate &&
      handleUpdate({
        id: homeownerId,
        data: { phoneNumber: currentPhoneNumber },
      });
  };

  useEffect(() => {
    handleHomeownerUpdated?.watch((updatedData) => {
      setCurrentPhoneNumber(updatedData.phoneNumber);
      setIsEditing(false);
    });
    return;
  }, [handleHomeownerUpdated, setCurrentPhoneNumber]);

  return (
    <Wrapper>
      <PhoneNumberHeader>
        <InfoPanelLabel>Телефон</InfoPanelLabel>
        <PencilIconSC onClick={isEditing ? handleCancelEdit : handleEdit} />
      </PhoneNumberHeader>

      {!isEditing && (
        <PhoneNumberWrapper onClick={handleEdit}>
          {currentPhoneNumber}
        </PhoneNumberWrapper>
      )}

      {isEditing && (
        <Input
          small
          value={currentPhoneNumber || ''}
          onChange={(value) => setCurrentPhoneNumber(value.target.value)}
        />
      )}
      {isEditing &&  (
        <PhoneNumberFooter>
          <Button
            type="ghost"
            size="small"
            onClick={handleCancelEdit}
            disabled={isUpdateHomeownerLoading}
          >
            Отмена
          </Button>
          <Button
            size="small"
            onClick={handleSave}
            isLoading={isUpdateHomeownerLoading}
          >
            Сохранить
          </Button>
        </PhoneNumberFooter>
      )}
    </Wrapper>
  );
};
