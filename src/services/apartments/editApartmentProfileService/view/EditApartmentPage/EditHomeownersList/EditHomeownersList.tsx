import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { List } from 'ui-kit/List';
import { LinkButton } from 'ui-kit/shared/LinkButton';
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
import dayjs from 'api/dayjs';
import { EPersonType } from 'api/types';
import { EditHomeownerFormPayload } from './editHomeownerService/editHomeownerService.types';
import {
  CloseHomeownerAccountContainer,
  closeHomeownerAccountService,
} from './closeHomeownerAccountService';
import { Tooltip } from 'ui-kit/shared/Tooltip';

const {
  inputs: { openCreateHomeownerModal },
} = createHomeownerService;

const {
  inputs: { openEditHomeownerModal },
} = editHomeownerService;

const {
  inputs: { openClosingHomeownerModal },
} = closeHomeownerAccountService;

export const EditHomeownersList: FC<EditHomeownersListProps> = ({
  homeowners,
}) => {
  const { handleAddHomeowner } = useUnit({
    handleAddHomeowner: openCreateHomeownerModal,
  });

  return (
    <>
      <CreateHomeownerContainer />
      <EditHomeownerContainer />
      <CloseHomeownerAccountContainer />
      <Wrapper>
        <List gridTemp="1fr 0.35fr 0.35fr 0.25fr 0.25fr">
          {homeowners.map((homeowner) => {
            const payload: EditHomeownerFormPayload = {
              id: homeowner.id,
              personalAccountNumber: homeowner.personalAccountNumber || '',
              name: homeowner.name || '',
              paymentCode: homeowner.paymentCode || '',
              personType: String(homeowner.personType) as EPersonType,
              openAt: dayjs(homeowner.openAt),
              isMainOnApartment: homeowner.isMainPersonalAccountNumber,
            };

            return {
              key: homeowner.id,
              nodes: [
                <Name key="name">{homeowner.name}</Name>,
                <PersonalAccountNumber key="personal-account-number">
                  {homeowner.personalAccountNumber}
                  {homeowner.isMainPersonalAccountNumber && <CrownIconSC />}
                </PersonalAccountNumber>,
                <PaymentCode key="payment-code">
                  {homeowner.paymentCode}
                </PaymentCode>,
                <Tooltip
                  key="tooltip"
                  title={homeowner.phoneNumbers?.join(', ') || ''}
                >
                  <PaymentCode>{homeowner.phoneNumbers?.[0]}</PaymentCode>
                </Tooltip>,
                <IconsWrapper key="icons-wrapper">
                  <PencilIconSC
                    onClick={() => openEditHomeownerModal(payload)}
                  />
                  <TrashIconSC
                    onClick={() => openClosingHomeownerModal(homeowner.id)}
                  />
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
