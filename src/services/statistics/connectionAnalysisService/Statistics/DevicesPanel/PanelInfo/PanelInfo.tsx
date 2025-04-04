import { FC } from 'react';
import { Props } from './PanelInfo.types';
import {
  DevicesAmount,
  DownloadIconSC,
  InfoWrapper,
  LoadingBlueIconSC,
  RighContentWrapper,
  Title,
  TitleWrapper,
} from '../DevicesPanel.styled';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';
import { PanelTitleDictionary } from '../../Statistics.constants';

export const PanelInfo: FC<Props> = ({
  devicesCountText,
  downloadType,
  handleDownload,
  setIsOpen,
  devicesCount,
  panelIcon,
  panelTitle,
  isOpen,
  setType,
}) => {
  return (
    <InfoWrapper onClick={() => setIsOpen((prev) => !prev)}>
      <TitleWrapper>
        {panelIcon} <Title>{PanelTitleDictionary[panelTitle]}</Title>
      </TitleWrapper>
      <RighContentWrapper>
        <DevicesAmount>
          {devicesCount} {devicesCountText}
        </DevicesAmount>

        {downloadType !== panelTitle && (
          <Tooltip title="Выгрузить список приборов">
            <DownloadIconSC
              onClick={(event) => {
                event.stopPropagation();
                handleDownload({
                  name: PanelTitleDictionary[panelTitle],
                  filterConnectionGroupType: panelTitle,
                });
                setType(panelTitle);
              }}
            />
          </Tooltip>
        )}
        {downloadType === panelTitle && <LoadingBlueIconSC />}

        <ListOpeningChevron isOpen={isOpen} />
      </RighContentWrapper>
    </InfoWrapper>
  );
};
