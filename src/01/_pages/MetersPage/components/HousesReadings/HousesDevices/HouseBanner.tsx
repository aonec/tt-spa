import React, { useState } from 'react';
import styled from 'styled-components';
import { HouseType } from '../../../../../_api/houses_readings_page';
import { Icon } from '../../../../../components/Icon';

const HouseBanner: React.FC<HouseBannerProps> = ({ house }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <AddressHeader>
        {house.city}, {house.street}, {house.number}
        {house.corpus ? `,${house.corpus}` : ''}
      </AddressHeader>
      <InfoSticker>
        <InfoHeader onClick={() => setIsVisible((prevState) => !prevState)}>
          <IconContainer show={isVisible}>
            <Icon icon="down" />
          </IconContainer>
          Информация о доме
        </InfoHeader>
        <InfoContent show={isVisible}>
          <InfoColumn>
            <InfoRow>
              <InfoItemHeader>Район</InfoItemHeader>
              <InfoItem>{house.district ?? 'Нет данных'}</InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItemHeader>Тип дома</InfoItemHeader>
              <InfoItem>{house.houseCategory ?? 'Нет данных'}</InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItemHeader>Год постройки</InfoItemHeader>
              <InfoItem>{house.constructionDate ?? 'Нет данных'}</InfoItem>
            </InfoRow>
          </InfoColumn>
          <InfoColumn>
            <InfoRow>
              <InfoItemHeader>Управляющая компания</InfoItemHeader>
              <InfoCompany>Нет данных</InfoCompany>
            </InfoRow>
            <InfoRow>
              <InfoItemHeader>Информация об УК</InfoItemHeader>
              <InfoItem>Нет данных</InfoItem>
            </InfoRow>
          </InfoColumn>
        </InfoContent>
      </InfoSticker>
    </div>
  );
};

const AddressHeader = styled.h2`
  margin-left: 8px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
`;

const InfoSticker = styled.div`
  height: auto;
  padding: 16px;
  box-shadow: var(--shadow);
  margin-bottom: 16px;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 32px;
`;

const IconContainer = styled.div<ShowProps>`
  display: flex;
  align-items: center;
  margin-right: 8px;
  transform: ${(props) => (props.show ? 'scale(1, -1)' : 'none')};
`;

const InfoContent = styled.div<ShowProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  margin-top: 16px;
  gap: 16px;
`;

const InfoColumn = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const InfoRow = styled.div`
  display: flex;
  padding: 16px 8px 16px;
  border-bottom: 1px solid var(--frame);
`;

const InfoItem = styled.div`
  width: 50%;
`;

const InfoCompany = styled.div`
  width: 50%;
  font-weight: 500;
`;

const InfoItemHeader = styled.div`
  width: 50%;
  font-size: 14px;
  line-height: 16px;
  color: var(--main-70);
`;

interface HouseBannerProps {
  house: HouseType;
}

interface ShowProps {
  show: boolean;
}

export default HouseBanner;
