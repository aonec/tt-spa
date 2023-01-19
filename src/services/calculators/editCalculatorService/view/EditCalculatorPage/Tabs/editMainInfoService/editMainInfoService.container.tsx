import React, { FC } from 'react';
import { EditMainInfo } from './view/EditMainInfo';
import { EditMainInfoContainerProps } from './editMainInfoService.types';

export const EditMainInfoContainer: FC<EditMainInfoContainerProps> = ({
  calculator,
  onCancel,
}) => {
  return (
    <>
      <EditMainInfo calculator={calculator} onCancel={onCancel} />
    </>
  );
};
