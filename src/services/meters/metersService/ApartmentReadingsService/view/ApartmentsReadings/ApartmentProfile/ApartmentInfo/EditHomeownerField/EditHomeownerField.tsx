import React, { FC, useEffect, useState } from 'react';
import {
  InputSC,
  FieldName,
  Footer,
  Header,
  ValueWrapper,
  PencilIconSC,
} from './EditHomeownerField.styled';
import { EditHomeownerFieldProps } from './EditHomeownerField.types';
import { Button } from 'ui-kit/Button';

export const EditHomeownerField: FC<EditHomeownerFieldProps> = ({
  handleUpdate,
  isUpdateHomeownerLoading,
  title,
  value: initialValue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldCurrentValue, setFieldCurrentValue] = useState<string | null>(
    initialValue,
  );

  const isEditable = Boolean(handleUpdate);

  useEffect(() => {
    setFieldCurrentValue(initialValue);

    setIsEditing(false);
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

    if (handleUpdate && fieldCurrentValue) {
      handleUpdate(fieldCurrentValue);
    }
  };

  return (
    <div>
      <Header>
        <FieldName>{title}</FieldName>
        {isEditable && (
          <PencilIconSC onClick={isEditing ? handleCancelEdit : handleEdit} />
        )}
      </Header>

      {!isEditing && (
        <ValueWrapper
          onClick={() => {
            if (isEditable) {
              handleEdit();
            }
          }}
        >
          {fieldCurrentValue}
        </ValueWrapper>
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
            size="s"
            onClick={handleCancelEdit}
            disabled={isUpdateHomeownerLoading}
          >
            Отмена
          </Button>
          <Button
            size="s"
            onClick={handleSave}
            isLoading={isUpdateHomeownerLoading}
            disabled={!fieldCurrentValue}
          >
            Сохранить
          </Button>
        </Footer>
      )}
    </div>
  );
};
