import React, { FC, useState } from 'react';
import {
  Address,
  AddressWrapper,
  ChevronIconSC,
  ChevronWraper,
  Header,
  PersonalNumberPanel,
  PersonalNumbersWrapper,
  Wrapper,
} from './ApartmentInfo.styled';
import { ApartmentInfoProps } from './ApartmentInfo.types';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

export const ApartmentInfo: FC<ApartmentInfoProps> = ({ apartment }) => {
  const initialHomeownerId = apartment.homeownerAccounts?.[0]?.id;

  const [isOpen, setIsOpen] = useState(false);
  const [activeHomeowner, setActiveHomeowner] = useState(initialHomeownerId);

  const addressString = getApartmentAddressString(apartment);

  return (
    <Wrapper>
      <Header>
        <AddressWrapper>
          <ChevronWraper>
            <ChevronIconSC
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </ChevronWraper>
          <Address>{addressString}</Address>
          <PersonalNumbersWrapper>
            {apartment.homeownerAccounts?.map((homeowner) => (
              <PersonalNumberPanel
                isActive={activeHomeowner === homeowner.id}
                onClick={() => setActiveHomeowner(homeowner.id)}
              >
                {homeowner.personalAccountNumber}
              </PersonalNumberPanel>
            ))}
          </PersonalNumbersWrapper>
        </AddressWrapper>
        <ContextMenuButton size="small" />
      </Header>
    </Wrapper>
  );
};
