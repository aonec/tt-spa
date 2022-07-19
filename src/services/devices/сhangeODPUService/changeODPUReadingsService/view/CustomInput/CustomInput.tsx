import React, { FC } from 'react';
import { Input, TitleWrapper } from './CustomInput.styled';
import { CustomInputProps } from './CustomInput.types';

export const CustomInput: FC<CustomInputProps> = ({
  configuration,
  value,
  onChange,
}) => {
  const { title, color, inputType } = configuration;
  return (
    <>
      <>
        {title && <TitleWrapper>{title}</TitleWrapper>}
        <Input
          color={color}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    </>
  );
};
