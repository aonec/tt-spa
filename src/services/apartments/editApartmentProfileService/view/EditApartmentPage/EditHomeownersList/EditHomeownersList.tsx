import React, { FC } from 'react';
import { PencilIcon, TrashIcon } from 'ui-kit/icons';
import { List } from 'ui-kit/List';
import {
  CrownIconSC,
  IconsWrapper,
  Name,
  PaymentCode,
  PersonalAccountNumber,
  Wrapper,
} from './EditHomeownersList.styled';
import { EditHomeownersListProps } from './EditHomeownersList.types';

export const EditHomeownersList: FC<EditHomeownersListProps> = ({
  homeowners,
}) => {
  return (
    <Wrapper>
      <List gridTemp="1fr 0.35fr 0.25fr 0.25fr">
        {homeowners.map((homeowner) => ({
          key: homeowner.id,
          nodes: [
            <Name>{homeowner.name}</Name>,
            <PersonalAccountNumber>
              {homeowner.personalAccountNumber}
              {homeowner.isMainPersonalAccountNumber && <CrownIconSC />}
            </PersonalAccountNumber>,
            <PaymentCode>{homeowner.paymentCode}</PaymentCode>,
            <IconsWrapper>
              <PencilIcon />
              <TrashIcon />
            </IconsWrapper>,
          ],
        }))}
      </List>
    </Wrapper>
  );
};
