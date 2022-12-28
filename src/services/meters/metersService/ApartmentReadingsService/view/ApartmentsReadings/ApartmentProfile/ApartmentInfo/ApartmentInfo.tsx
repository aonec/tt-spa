import React, { FC, useEffect, useState } from 'react';
import {
  Address,
  AddressWrapper,
  BaseInfoWrapper,
  ChevronIconSC,
  ChevronWraper,
  Comment,
  CommentFooter,
  CommentHeader,
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
  Wrapper,
} from './ApartmentInfo.styled';
import { ApartmentInfoProps } from './ApartmentInfo.types';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { BriefcaseIcon, HouseIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';

export const ApartmentInfo: FC<ApartmentInfoProps> = ({
  apartment,
  handleUpdateApartment,
}) => {
  const initialHomeownerId = apartment.homeownerAccounts?.[0]?.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeHomeowner, setActiveHomeowner] = useState(initialHomeownerId);
  const [comment, setComment] = useState(apartment.comment);

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
    handleUpdateApartment({ apartmentId: apartment.id, comment });
    setIsEditing(false);
  };

  useEffect(() => {
    setComment(apartment.comment);
  }, [apartment.comment]);

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
              <Comment onClick={handleEditComment}>{apartment.comment}</Comment>
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
      </InfoPanel>
    </Wrapper>
  );
};
