import React, { FC, useMemo } from 'react';
import { ObjectInfoRowField, ObjectInfoRowTitle } from './ObjectInfo.constants';
import { RowWrapper, Wrapper } from './ObjectInfo.styled';
import { ObjectInfoProps } from './ObjectInfo.types';
import { getObjectInfoFields } from './ObjectInfo.utils';

export const ObjectInfo: FC<ObjectInfoProps> = ({ housingStock }) => {
  const requiredFields = getObjectInfoFields(housingStock);

  const fields = useMemo(
    () =>
      Object.entries(requiredFields).map(([field, value]) => {
        const key = field as ObjectInfoRowField;
        const title = ObjectInfoRowTitle[key];

        return (
          <>
            {Boolean(value) && (
              <RowWrapper>
                <div>{title}</div>
                <div>{value}</div>
              </RowWrapper>
            )}
          </>
        );
      }),
    [requiredFields]
  );

  return <Wrapper>{fields}</Wrapper>;
};
