import React, { FC, useEffect, useMemo, useState } from 'react';
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
  PersonalNumberHeader,
  PersonalNumberHeaderWrapper,
  PersonalNumberPanel,
  PersonalNumbersWrapper,
  TextareaSC,
} from './ApartmentInfo.styled';
import { ApartmentInfoProps } from './ApartmentInfo.types';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { BriefcaseIcon, CrownIcon, HouseIcon, InfoIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';
import moment from 'moment';
import { apartmentInfoService } from './ApartmentInfo.model';
import { PrintApartmentDevicesCertificateContainer } from 'services/apartments/printApartmentDevicesCertificateService';
import { EditHomeownerField } from './EditHomeownerField';
import { FieldType } from './EditHomeownerField/EditHomeownerField.types';

const { inputs, outputs } = apartmentInfoService;

export const ApartmentInfo: FC<ApartmentInfoProps> = ({
  apartment,
  handleUpdateApartment,
  setSelectedHomeownerName,
  menuButtons,
  additionalHeaderInfo,
  handleUpdatePhoneNumber,
  isUpdateHomeownerLoading,
  handleHomeownerUpdated,
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

  const houseManagement = housingStock?.houseManagement;

  const houseManagementName = `Домоуправление «${houseManagement?.name}»`;

  const houseManagementInfo = useMemo(() => {
    const phoneNumber = houseManagement?.phone
      ? `${houseManagement?.phone};`
      : '';
    const information = houseManagement?.comment
      ? `${houseManagement?.comment}`
      : '';

    return `${phoneNumber} ${information}`;
  }, [houseManagement]);

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
              <EditHomeownerField
                fieldType={FieldType.Name}
                name={selectedHomeowner?.name}
                phoneNumber={selectedHomeowner?.phoneNumber}
                homeownerId={activeHomeowner}
                handleUpdate={handleUpdatePhoneNumber}
                isUpdateHomeownerLoading={isUpdateHomeownerLoading}
                handleHomeownerUpdated={handleHomeownerUpdated}
              />
              <div>
                <PersonalNumberHeaderWrapper>
                  <PersonalNumberHeader>Лицевой счет</PersonalNumberHeader>
                  <InfoIcon />
                </PersonalNumberHeaderWrapper>
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
              <EditHomeownerField
                fieldType={FieldType.PhoneNumber}
                phoneNumber={selectedHomeowner?.phoneNumber || null}
                homeownerId={activeHomeowner}
                handleUpdate={handleUpdatePhoneNumber}
                isUpdateHomeownerLoading={isUpdateHomeownerLoading}
                handleHomeownerUpdated={handleHomeownerUpdated}
              />
            </ExtraInfoWrapper>
          )}
        </InfoPanel>
      </div>
    </>
  );
};
