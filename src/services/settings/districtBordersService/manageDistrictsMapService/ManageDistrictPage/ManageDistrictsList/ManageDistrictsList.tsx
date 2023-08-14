import React, { FC, useMemo, useState } from 'react';
import {
  ColorCircle,
  DistrictListItem,
  DistrictListItemHeader,
  DistrictListItemInfo,
  Wrapper,
} from './ManageDistrictsList.styled';
import { Props } from './ManageDistrictsList.types';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { getDistrictColor } from 'utils/getDistrictColor';
import { groupBy } from 'lodash';

export const ManageDistrictsList: FC<Props> = ({ existingDistricts }) => {
  const [openedDistrict, setOpenedDistrict] = useState<string | null>(null);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts);
  }, [existingDistricts]);

  return (
    <Wrapper>
      {preparedExistingDistricts.map((elem) => {
        const color = getDistrictColor(elem.type);

        const groupedAddresses = groupBy(elem.houses || [], (house) => {
          const arr = house.address?.split(' ');

          return arr?.slice(1, arr.length - 2).join(' ');
        });

        console.log(elem);

        return (
          <DistrictListItem
            key={elem.id}
            onClick={() => setOpenedDistrict(elem.id)}
          >
            <DistrictListItemHeader>
              <DistrictListItemInfo>
                {color && (
                  <ColorCircle
                    strokeColor={color.strokeColor}
                    fillColor={color.color}
                  />
                )}
                {`${elem.name} (${elem.houses?.length})`}
              </DistrictListItemInfo>
              <ContextMenuButton size="small" />
            </DistrictListItemHeader>
            {openedDistrict === elem.id &&
              Object.entries(groupedAddresses).map(([key, value]) => (
                <div>
                  <b>{key}</b>
                  {value.map((elem) => (
                    <div>{elem.address}</div>
                  ))}
                </div>
              ))}
          </DistrictListItem>
        );
      })}
    </Wrapper>
  );
};
