import React, { FC, useEffect, useState } from 'react';
import {
  InputSC,
  FieldName,
  Footer,
  Header,
  ValueWrapper,
  PencilIconSC,
} from './EditHomeownerField.styled';
import { EditHomeownerFieldProps, FieldType } from './EditHomeownerField.types';
import { Button } from 'ui-kit/Button';
import { FieldTypeDictionary } from './EditHomeownerField.constants';

export const EditHomeownerField: FC<EditHomeownerFieldProps> = ({
  handleUpdate,
  homeownerId,
  isUpdateHomeownerLoading,
  handleHomeownerUpdated,
  fieldType,
  title,
  value: initialValue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldCurrentValue, setFieldCurrentValue] = useState<string | null>(
    initialValue,
  );

  useEffect(() => {
    setFieldCurrentValue(initialValue);
  }, [initialValue]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFieldCurrentValue(initialValue);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (fieldCurrentValue === initialValue) {
      setIsEditing(false);
      return;
    }

    if (homeownerId && handleUpdate) {
      const editedField = FieldTypeDictionary[fieldType];

      handleUpdate({
        id: homeownerId,
        data: { [editedField]: fieldCurrentValue },
      });
    }
  };

  useEffect(() => {
    if (fieldType === FieldType.Name) {
      handleHomeownerUpdated?.watch((updatedData) => {
        setFieldCurrentValue(updatedData.name);
        setIsEditing(false);
      });
    }
    if (fieldType === FieldType.PhoneNumber) {
      handleHomeownerUpdated?.watch((updatedData) => {
        setFieldCurrentValue(updatedData.phoneNumber);
        setIsEditing(false);
      });
    }
    return;
  }, [handleHomeownerUpdated, setFieldCurrentValue, fieldType]);

  return (
    <div>
      <Header>
        <FieldName>{title}</FieldName>
        <PencilIconSC onClick={isEditing ? handleCancelEdit : handleEdit} />
      </Header>

      {!isEditing && (
        <ValueWrapper onClick={handleEdit}>{fieldCurrentValue}</ValueWrapper>
      )}

      {isEditing && (
        <InputSC
          small
          value={fieldCurrentValue || ''}
          onChange={(value) => setFieldCurrentValue(value.target.value)}
        />
      )}
      {isEditing && (
        <Footer>
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
            disabled={!Boolean(fieldCurrentValue)}
          >
            Сохранить
          </Button>
        </Footer>
      )}
    </div>
  );
};
