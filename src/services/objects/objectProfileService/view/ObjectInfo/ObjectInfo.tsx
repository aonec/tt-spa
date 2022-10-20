import React, { FC, useCallback, useMemo } from 'react';
import { RowWrapper, Wrapper } from './ObjectInfo.styled';
import { ObjectInfoProps } from './ObjectInfo.types';
import { getObjectInfoFields, ObjectInfoRowTitle } from './ObjectInfo.utils';

export const ObjectInfo: FC<ObjectInfoProps> = ({ housingStock }) => {
  const requiredFields = getObjectInfoFields(housingStock);

  const fields = useMemo(() => {}, [requiredFields]);

  return (
    <Wrapper>
      <RowWrapper>
        <div>Город</div>
        <div></div>
      </RowWrapper>
    </Wrapper>
  );
};
