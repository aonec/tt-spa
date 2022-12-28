import React, { FC, useEffect, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import {
  AccountOpeningDate,
  Address,
  AddressWrapper,
  BaseInfoWrapper,
  ChevronIconSC,
  ChevronWraper,
  Comment,
  CommentFooter,
  CommentHeader,
  ExtraInfoText,
  ExtraInfoWrapper,
  FirmWrapper,
  FirmsLine,
  Header,
  InfoPanel,
  InfoPanelLabel,
  ManagementFirmInfo,
  PencilIconSC,
  PersonalNumberPanel,
  PersonalNumbersWrapper,
  TextareaSC,
} from './ApartmentInfo.styled';
import { ApartmentInfoProps } from './ApartmentInfo.types';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { BriefcaseIcon, CrownIcon, HouseIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';
import moment from 'moment';
import { apartmentInfoService } from './ApartmentInfo.model';
import { Tooltip } from 'antd';

const { inputs, outputs } = apartmentInfoService;

export const ApartmentInfo: FC<ApartmentInfoProps> = ({
  apartment,
  handleUpdateApartment,
}) => {
  const initialHomeownerId = apartment.homeownerAccounts?.[0]?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [activeHomeowner, setActiveHomeowner] = useState(initialHomeownerId);
  const [comment, setComment] = useState(apartment.comment);

  const togglePanel = useEvent(inputs.togglePanel);

  const isPanelOpen = useStore(outputs.$isPanelOpen);

  const addressString = getApartmentAddressString(apartment);

  const housingStock = apartment.housingStock;

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleCancelEditComment = () => {
    setComment(apartment.comment);
    setIsEditing(false);
  };

  const handleSaveComment = () => {
    setIsEditing(false);

    if (comment === apartment.comment) return;

    handleUpdateApartment({ apartmentId: apartment.id, comment });
  };

  useEffect(() => {
    setComment(apartment.comment);
  }, [apartment.comment]);

  const selectedHomeowner = apartment.homeownerAccounts?.find(
    (homeowner) => homeowner.id === activeHomeowner
  );

  return (
    <div>
      <Header>
        <AddressWrapper>
          <ChevronWraper>
            <ChevronIconSC isOpen={isPanelOpen} onClick={() => togglePanel()} />
          </ChevronWraper>
          <Address onClick={() => togglePanel()}>{addressString}</Address>
          <PersonalNumbersWrapper>
            {apartment.homeownerAccounts?.map((homeowner) => (
              <PersonalNumberPanel
                isActive={activeHomeowner === homeowner.id}
                onClick={() => setActiveHomeowner(homeowner.id)}
              >
                <div>{homeowner.personalAccountNumber}</div>
                {homeowner.isMainPersonalAccountNumber && (
                  <Tooltip title="Основной собственник">
                    <CrownIcon />
                  </Tooltip>
                )}
              </PersonalNumberPanel>
            ))}
          </PersonalNumbersWrapper>
        </AddressWrapper>
        <ContextMenuButton size="small" />
      </Header>
      <InfoPanel>
        <BaseInfoWrapper>
          <div>
            <InfoPanelLabel>Oбслуживающая организация</InfoPanelLabel>
            <FirmWrapper>
              <HouseIcon />
              <div>Домоуправление «{housingStock?.houseManagement?.name}»</div>
            </FirmWrapper>
            <FirmsLine>
              <ManagementFirmInfo>
                {housingStock?.houseManagement?.phone}
                {'; '}
                {housingStock?.houseManagement?.comment}
              </ManagementFirmInfo>
            </FirmsLine>
            <FirmWrapper>
              <BriefcaseIcon />
              <div>{housingStock?.managementFirm?.name}</div>
            </FirmWrapper>
          </div>
          <div>
            <CommentHeader>
              <InfoPanelLabel>Комментарий</InfoPanelLabel>
              <PencilIconSC
                onClick={
                  isEditing ? handleCancelEditComment : handleEditComment
                }
              />
            </CommentHeader>
            {!isEditing && (
              <Comment onClick={handleEditComment}>
                {apartment.comment || 'Нет комментария'}
              </Comment>
            )}
            {isEditing && (
              <TextareaSC
                value={comment || ''}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введите комментарий"
              />
            )}
            {isEditing && (
              <CommentFooter>
                <Button
                  type="ghost"
                  size="small"
                  onClick={handleCancelEditComment}
                >
                  Отмена
                </Button>
                <Button size="small" onClick={handleSaveComment}>
                  Сохранить
                </Button>
              </CommentFooter>
            )}
          </div>
        </BaseInfoWrapper>
        {isPanelOpen && (
          <ExtraInfoWrapper>
            <div>
              <InfoPanelLabel>Собственник</InfoPanelLabel>
              <ExtraInfoText>{selectedHomeowner?.name}</ExtraInfoText>
            </div>
            <div>
              <InfoPanelLabel>Лицевой счет</InfoPanelLabel>
              <ExtraInfoText>
                {selectedHomeowner?.personalAccountNumber}{' '}
                <AccountOpeningDate>
                  (открыт с{' '}
                  {moment(selectedHomeowner?.openAt).format('DD.MM.YYYY')})
                </AccountOpeningDate>
              </ExtraInfoText>
            </div>
            <div>
              <InfoPanelLabel>Платежный код</InfoPanelLabel>
              <ExtraInfoText>{selectedHomeowner?.paymentCode}</ExtraInfoText>
            </div>
            <div>
              <InfoPanelLabel>Телефон</InfoPanelLabel>
              <ExtraInfoText>{selectedHomeowner?.phoneNumber}</ExtraInfoText>
            </div>
          </ExtraInfoWrapper>
        )}
      </InfoPanel>
    </div>
  );
};
