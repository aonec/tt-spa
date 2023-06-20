import React, { FC, useEffect, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import { Tooltip } from 'antd';
import {
  AccountOpeningDate,
  AdditionalHeaderInfoWrapper,
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
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { BriefcaseIcon, CrownIcon, HouseIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';
import moment from 'moment';
import { apartmentInfoService } from './ApartmentInfo.model';
import { PrintApartmentDevicesCertificateContainer } from 'services/apartments/printApartmentDevicesCertificateService';

const { inputs, outputs } = apartmentInfoService;

export const ApartmentInfo: FC<ApartmentInfoProps> = ({
  apartment,
  handleUpdateApartment,
  setSelectedHomeownerName,
  menuButtons,
  additionalHeaderInfo,
}) => {
  const filteredHomeowners = apartment.homeownerAccounts
    ?.filter((homeowner) => !homeowner.closedAt)
    .sort((a, b) => {
      if (b.isMainPersonalAccountNumber) return 1;

      if (a.isMainPersonalAccountNumber) return -1;

      return 0;
    });

  const initialHomeownerId = filteredHomeowners?.[0]?.id;

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
    (homeowner) => homeowner.id === activeHomeowner,
  );

  useEffect(() => {
    selectedHomeowner?.name &&
      setSelectedHomeownerName(selectedHomeowner?.name);
  }, [selectedHomeowner, setSelectedHomeownerName]);

  const houseManagement = housingStock?.managementFirm;

  const houseManagementName = `Домоуправление «${houseManagement?.name}»`;

  const houseManagementInfo =
    !houseManagement?.phoneNumber && !houseManagement?.information
      ? ''
      : `${houseManagement?.phoneNumber || ''}; ${
          houseManagement?.information || ''
        }`;

  const accountingOpeningDate = `открыт с ${moment(
    selectedHomeowner?.openAt,
  ).format('DD.MM.YYYY')}`;

  return (
    <>
      {activeHomeowner && (
        <PrintApartmentDevicesCertificateContainer
          apartment={apartment}
          homeownerId={activeHomeowner}
        />
      )}
      <div>
        <Header>
          <AddressWrapper>
            <ChevronWraper>
              <ChevronIconSC
                opened={isPanelOpen}
                onClick={() => togglePanel()}
              />
            </ChevronWraper>
            <Address onClick={() => togglePanel()}>{addressString}</Address>
            <PersonalNumbersWrapper>
              {filteredHomeowners?.map((homeowner) => (
                <PersonalNumberPanel
                  isActive={activeHomeowner === homeowner.id}
                  onClick={() => setActiveHomeowner(homeowner.id)}
                  key={homeowner.id}
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
          <AdditionalHeaderInfoWrapper>
            {additionalHeaderInfo}
            <ContextMenuButton size="small" menuButtons={menuButtons} />
          </AdditionalHeaderInfoWrapper>
        </Header>
        <InfoPanel>
          <BaseInfoWrapper>
            <div>
              <InfoPanelLabel>Oбслуживающая организация</InfoPanelLabel>
              <FirmWrapper>
                <HouseIcon />
                <div>{houseManagementName}</div>
              </FirmWrapper>
              <FirmsLine>
                <ManagementFirmInfo>{houseManagementInfo}</ManagementFirmInfo>
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
                    {accountingOpeningDate}
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
    </>
  );
};
