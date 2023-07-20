import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  EditingField,
  FieldName,
  Footer,
  Header,
  ValueWrapper,
} from './EditHomeownerField.styled';
import { EditHomeownerFieldProps, FieldType } from './EditHomeownerField.types';
import { PencilIconSC } from '../ApartmentInfo.styled';
import { Button } from 'ui-kit/Button';
import { FieldTypeDictionary } from './EditHomeownerField.constants';

export const EditHomeownerField: FC<EditHomeownerFieldProps> = ({
  phoneNumber,
  handleUpdate,
  homeownerId,
  isUpdateHomeownerLoading,
  handleHomeownerUpdated,
  fieldType,
  name,
}) => {
  const initialValue = useMemo(() => {
    if (fieldType === FieldType.Name) {
      return name || null;
    }
    if (fieldType === FieldType.PhoneNumber) {
      return phoneNumber || null;
    }
    return null;
  }, [fieldType, name, phoneNumber]);

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
    if ((fieldType === FieldType.Name)) {
      handleHomeownerUpdated?.watch((updatedData) => {
        setFieldCurrentValue(updatedData.name);
        setIsEditing(false);
      });
    }
    if ((fieldType === FieldType.PhoneNumber)) {
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
        {fieldType === FieldType.PhoneNumber && <FieldName>Телефон</FieldName>}
        {fieldType === FieldType.Name && <FieldName>Собственник</FieldName>}
        <PencilIconSC onClick={isEditing ? handleCancelEdit : handleEdit} />
      </Header>

      {!isEditing && (
        <ValueWrapper onClick={handleEdit}>{fieldCurrentValue}</ValueWrapper>
      )}

      {isEditing && (
        <EditingField
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
