import React, { FC, useEffect, useMemo, useState } from 'react';
import { useUnit } from 'effector-react';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import {
  AccountOpeningDate,
  AdditionalHeaderInfoWrapper,
  Address,
  AddressWrapper,
  BaseInfoWrapper,
  ChevronIconSC,
  ChevronWraper,
  ExtraInfoText,
  ExtraInfoWrapper,
  FirmWrapper,
  FirmsLine,
  Header,
  HomeownerNumber,
  InfoPanel,
  InfoPanelLabel,
  MainText,
  ManagementFirmInfo,
  PersonalNumberHeader,
  PersonalNumberHeaderWrapper,
  PersonalNumberPanel,
  PersonalNumbersWrapper,
  SubText,
} from './ApartmentInfo.styled';
import { ApartmentInfoProps } from './ApartmentInfo.types';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { BriefcaseIcon, CrownIcon, HouseIcon, InfoIcon } from 'ui-kit/icons';
import dayjs from 'api/dayjs';
import { apartmentInfoService } from './ApartmentInfo.model';
import { PrintApartmentDevicesCertificateContainer } from 'services/apartments/printApartmentDevicesCertificateService';
import { EditHomeownerField } from './EditHomeownerField';
import { CommentField } from './CommentField';
import { PhoneNumberField } from './PhoneNumberField';

const { inputs, outputs } = apartmentInfoService;

export const ApartmentInfo: FC<ApartmentInfoProps> = ({
  apartment,
  handleUpdateApartment,
  setSelectedHomeownerName,
  menuButtons,
  additionalHeaderInfo,
  isUpdateHomeownerLoading,
  handleUpdateHomeowner,
  addPhoneNumber,
  deletePhoneNumber,
}) => {
  const filteredHomeowners = apartment.homeownerAccounts
    ?.filter((homeowner) => !homeowner.closedAt)
    .sort((a, b) => {
      if (b.isMainPersonalAccountNumber) return 1;

      if (a.isMainPersonalAccountNumber) return -1;

      return 0;
    });

  const initialHomeownerId = filteredHomeowners?.[0]?.id;

  const [activeHomeowner, setActiveHomeowner] = useState(initialHomeownerId);

  const { isPanelOpen, togglePanel } = useUnit({
    togglePanel: inputs.togglePanel,
    isPanelOpen: outputs.$isPanelOpen,
  });

  const addressString = getApartmentAddressString(apartment);

  const housingStock = apartment.housingStock;

  const selectedHomeowner = apartment.homeownerAccounts?.find(
    (homeowner) => homeowner.id === activeHomeowner,
  );

  useEffect(() => {
    setSelectedHomeownerName(selectedHomeowner?.name || null);
  }, [selectedHomeowner, setSelectedHomeownerName]);

  const houseManagement = housingStock?.houseManagement;

  const houseManagementName = houseManagement?.name
    ? `Домоуправление «${houseManagement?.name}»`
    : '';

  const houseManagementInfo = useMemo(() => {
    const phoneNumber = houseManagement?.phone
      ? `${houseManagement?.phone};`
      : '';
    const information = houseManagement?.comment
      ? `${houseManagement?.comment}`
      : '';

    return `${phoneNumber} ${information}`;
  }, [houseManagement]);

  const accountingOpeningDate = ` открыт с ${dayjs(
    selectedHomeowner?.openAt,
  ).format('DD.MM.YYYY')}`;

  const updateHomeowner = useMemo(() => {
    if (!activeHomeowner || !handleUpdateHomeowner) {
      return;
    }
    return (value: string, fieldName: string) =>
      handleUpdateHomeowner({
        id: activeHomeowner,
        data: { [fieldName]: value },
      });
  }, [activeHomeowner, handleUpdateHomeowner]);

  const handleRemovePhoneNumber = useMemo(() => {
    if (!activeHomeowner || !deletePhoneNumber) {
      return;
    }
    return (phoneNumber: string) =>
      deletePhoneNumber({ id: activeHomeowner, phoneNumber });
  }, [deletePhoneNumber, activeHomeowner]);

  const handleAddPhoneNumber = useMemo(() => {
    if (!activeHomeowner || !addPhoneNumber) {
      return;
    }
    return ({
      phoneNumber,
      oldPhoneNumber,
    }: {
      phoneNumber: string;
      oldPhoneNumber: string | null;
    }) => addPhoneNumber({ id: activeHomeowner, phoneNumber, oldPhoneNumber });
  }, [addPhoneNumber, activeHomeowner]);

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
            {menuButtons?.length && (
              <ContextMenuButton size="small" menuButtons={menuButtons} />
            )}
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

            <CommentField
              apartmentId={apartment.id}
              comment={apartment.comment}
              handleUpdateApartment={handleUpdateApartment}
            />
          </BaseInfoWrapper>
          {isPanelOpen && (
            <ExtraInfoWrapper>
              <EditHomeownerField
                title="Собственник"
                value={selectedHomeowner?.name || null}
                handleUpdate={
                  updateHomeowner && ((value) => updateHomeowner(value, 'name'))
                }
                isUpdateHomeownerLoading={isUpdateHomeownerLoading}
              />
              <div>
                <PersonalNumberHeaderWrapper>
                  <PersonalNumberHeader>Лицевой счет</PersonalNumberHeader>
                  {Boolean(selectedHomeowner?.editedAt) && (
                    <Tooltip
                      title={
                        <div>
                          <MainText>
                            {selectedHomeowner?.isMainPersonalAccountNumber
                              ? ' Основной лицевой счёт '
                              : 'Лицевой счёт '}
                            <HomeownerNumber>
                              {selectedHomeowner?.personalAccountNumber}
                            </HomeownerNumber>
                            ({selectedHomeowner?.name}) был отредактирован.
                          </MainText>

                          <SubText>
                            Дата изменения:{' '}
                            {dayjs(
                              selectedHomeowner?.editedAt || undefined,
                            ).format('DD.MM.YYYY')}
                          </SubText>
                        </div>
                      }
                    >
                      <InfoIcon />
                    </Tooltip>
                  )}
                </PersonalNumberHeaderWrapper>
                <ExtraInfoText>
                  {selectedHomeowner?.personalAccountNumber}
                  <AccountOpeningDate>
                    {accountingOpeningDate}
                  </AccountOpeningDate>
                </ExtraInfoText>
              </div>
              <div>
                <InfoPanelLabel>Платежный код</InfoPanelLabel>
                <ExtraInfoText>{selectedHomeowner?.paymentCode}</ExtraInfoText>
              </div>
              <PhoneNumberField
                phoneNumbers={selectedHomeowner?.phoneNumbers || []}
                addPhoneNumber={handleAddPhoneNumber}
                deletePhoneNumber={handleRemovePhoneNumber}
              />
            </ExtraInfoWrapper>
          )}
        </InfoPanel>
      </div>
    </>
  );
};
