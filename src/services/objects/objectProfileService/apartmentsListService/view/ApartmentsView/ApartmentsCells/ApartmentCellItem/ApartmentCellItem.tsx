import React, { FC } from 'react';
import { Popover } from 'antd';
import {
  AdditionalInfoTextWrapper,
  BottomContent,
  CellWrapper,
  HomeownerName,
  PopoverLink,
  PopoverLinkChevron,
  PopoverTitle,
} from './ApartmentCellItem.styled';
import { ApartmentCellItemProps } from './ApartmentCellItem.types';
import { EApartmentStatus } from 'myApi';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
  PauseIconWrapper,
  WarningIconWrapper,
} from '../../ApartmentsList/ApartmentItem/ApartmentItem.styled';
import { PauseIcon, WarningIcon } from 'ui-kit/icons';

export const ApartmentCellItem: FC<ApartmentCellItemProps> = ({
  apartment,
  hosuingStockId,
}) => {
  const isApartmentOnPause = apartment.status === EApartmentStatus.Pause;
  const isTasksOnApartmentExist = Boolean(apartment.numberOfTasks);

  const additionalHomeownersCount = (apartment?.homeownersCount || 1) - 1;

  const apartmentLink = `/objects/${hosuingStockId}/apartments/${apartment.id}`;

  return (
    <Popover
      placement="topLeft"
      title={
        <PopoverTitle>
          Квартира №{apartment.apartmentNumber}
          {isTasksOnApartmentExist && (
            <WarningIconWrapper>
              <WarningIcon />
            </WarningIconWrapper>
          )}
          {isApartmentOnPause && (
            <PauseIconWrapper>
              <PauseIcon />
            </PauseIconWrapper>
          )}
        </PopoverTitle>
      }
      content={
        <div>
          <HomeownerName>
            {apartment.homeownerName}{' '}
            {Boolean(additionalHomeownersCount) && (
              <AdditionalHomeownersCountWrapper filled>
                <AdditionalHomeownersCountTextWrapper>
                  +{additionalHomeownersCount}
                </AdditionalHomeownersCountTextWrapper>
              </AdditionalHomeownersCountWrapper>
            )}
          </HomeownerName>
          <AdditionalInfoTextWrapper>
            {apartment.personalAccountNumber}
          </AdditionalInfoTextWrapper>
          <BottomContent>
            <AdditionalInfoTextWrapper>
              {apartment.square && `${apartment.square} м²`}
            </AdditionalInfoTextWrapper>
            <PopoverLink to={apartmentLink}>
              Перейти <PopoverLinkChevron />
            </PopoverLink>
          </BottomContent>
        </div>
      }
      trigger="hover"
      mouseEnterDelay={0.5}
    >
      <CellWrapper to={apartmentLink}>{apartment.apartmentNumber}</CellWrapper>
    </Popover>
  );
};
