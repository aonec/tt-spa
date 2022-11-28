import { useEvent } from 'effector-react';
import React, { FC } from 'react';
import { List } from 'ui-kit/List';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import {
  CreateHomeownerContainer,
  createHomeownerService,
} from './createHomeownerService';
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

const {
  inputs: { openCreateHomeownerModal },
} = createHomeownerService;

export const EditHomeownersList: FC<EditHomeownersListProps> = ({
  homeowners,
}) => {
  const handleAddHomeowner = useEvent(openCreateHomeownerModal);

  return (
    <>
      <CreateHomeownerContainer />
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
          <LinkButton onClick={() => handleAddHomeowner()}>
            + Добавить собственника
          </LinkButton>
        </LinkButtonWrapper>
      </Wrapper>
    </>
  );
};
