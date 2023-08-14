import React, { FC, useCallback, useMemo, useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { groupBy } from 'lodash';
import {
  AddressHousesCount,
  AddressNumber,
  AddressWrapper,
  ColorCircle,
  DistrictAddressesList,
  DistrictListItem,
  DistrictListItemHeader,
  DistrictListItemInfo,
  Line,
  StreetWrapper,
  Wrapper,
} from './ManageDistrictsList.styled';
import { Props } from './ManageDistrictsList.types';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { getDistrictColor } from 'utils/getDistrictColor';

export const ManageDistrictsList: FC<Props> = ({ existingDistricts }) => {
  const [openedDistrict, setOpenedDistrict] = useState<string | null>(null);
  const [openedStreets, setOpenedStreets] = useState<string[]>([]);

  const clickStreet = useCallback((street: string) => {
    setOpenedStreets((prev) =>
      prev?.includes(street)
        ? prev.filter((elem) => elem !== street)
        : [...prev, street],
    );
  }, []);

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

        return (
          <DistrictListItem key={elem.id}>
            <DistrictListItemHeader
              onClick={() =>
                setOpenedDistrict((prev) => (prev === elem.id ? null : elem.id))
              }
            >
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
            {openedDistrict === elem.id && Boolean(elem.houses?.length) && (
              <DistrictAddressesList>
                {Object.entries(groupedAddresses).map(([key, value]) => {
                  const isOpen = openedStreets.includes(key);

                  return (
                    <React.Fragment key={key}>
                      <AddressWrapper onClick={() => clickStreet(key)}>
                        <StreetWrapper isOpen={isOpen}>{key}</StreetWrapper>
                        <AddressHousesCount>
                          {value.length} объектов
                          <ChevronDown />
                        </AddressHousesCount>
                      </AddressWrapper>
                      {isOpen &&
                        value.map((elem) => {
                          const arr = elem.address?.split(' ');
                          const number = arr && arr[arr?.length - 2];
                          return <AddressNumber>{number}</AddressNumber>;
                        })}
                      <Line />
                    </React.Fragment>
                  );
                })}
              </DistrictAddressesList>
            )}
          </DistrictListItem>
        );
      })}
    </Wrapper>
  );
};
