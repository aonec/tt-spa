import { useEvent } from 'effector-react';
import React, { FC } from 'react';
import { List } from 'ui-kit/List';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import {
  CreateHomeownerContainer,
  createHomeownerService,
} from './createHomeownerService';
import {
  EditHomeownerContainer,
  editHomeownerService,
} from './editHomeownerService';
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
import { EditHomeownerPayload } from './EditHomeownerForm/EditHomeownerForm.types';
import moment from 'moment';
import { PersonType } from 'myApi';
import { EditHomeownerFormPayload } from './editHomeownerService/editHomeownerService.types';

const {
  inputs: { openCreateHomeownerModal },
} = createHomeownerService;

const {
  inputs: { openEditHomeownerModal },
} = editHomeownerService;

export const EditHomeownersList: FC<EditHomeownersListProps> = ({
  homeowners,
}) => {
  const handleAddHomeowner = useEvent(openCreateHomeownerModal);

  return (
    <>
      <CreateHomeownerContainer />
      <EditHomeownerContainer />
      <Wrapper>
        <List gridTemp="1fr 0.35fr 0.25fr 0.25fr">
          {homeowners.map((homeowner) => {
            const payload: EditHomeownerFormPayload = {
              id: homeowner.id,
              personalAccountNumber: homeowner.personalAccountNumber || '',
              name: homeowner.name || '',
              phoneNumber: homeowner.phoneNumber || '',
              paymentCode: homeowner.paymentCode || '',
              personType: String(homeowner.personType) as PersonType,
              openAt: moment(homeowner.openAt),
              isMainOnApartment: homeowner.isMainPersonalAccountNumber,
            };

            return {
              key: homeowner.id,
              nodes: [
                <Name>{homeowner.name}</Name>,
                <PersonalAccountNumber>
                  {homeowner.personalAccountNumber}
                  {homeowner.isMainPersonalAccountNumber && <CrownIconSC />}
                </PersonalAccountNumber>,
                <PaymentCode>{homeowner.paymentCode}</PaymentCode>,
                <IconsWrapper>
                  <PencilIconSC
                    onClick={() => openEditHomeownerModal(payload)}
                  />
                  <TrashIconSC />
                </IconsWrapper>,
              ],
            };
          })}
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
