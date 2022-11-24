import React, { FC } from 'react';
import { List } from 'ui-kit/List';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import {
  CrownIconSC,
  IconsWrapper,
  LinkButtonWrapper,
  Name,
  PaymentCode,
  PencilIconSC,
  PersonalAccountNumber,
  TrashIconSC,
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
              <PencilIconSC />
              <TrashIconSC />
            </IconsWrapper>,
          ],
        }))}
      </List>
      <LinkButtonWrapper>
        <LinkButton>+ Добавить собственника</LinkButton>
      </LinkButtonWrapper>
    </Wrapper>
  );
};
