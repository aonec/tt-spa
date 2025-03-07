import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  DevicesAmount,
  DownloadIconSC,
  InfoWrapper,
  LoadingBlueIconSC,
  RighContentWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from './DevicesPanel.styled';
import { Props } from './DevicesPanel.types';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';
import { CalculatorInfo } from './CalculatorDevices';
import { getDevicesCountText } from 'services/nodes/createNodeService/view/CreateNodePage/ConnectedDevices/CommunicationPipeListItem/CommunicationPipeListItem.utils';
import {
  CheckGreenIcon,
  MagnifierIcon,
  StopOrangeIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { PanelTitleDictionary } from '../Statistics.constants';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { ECalculatorConnectionGroupType } from 'api/types';

export const DevicesPanel: FC<Props> = ({
  panelTitle,
  calculators,
  handleDownload,
  isDownloading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const devicesCount = calculators?.items?.length || 0;

  const devicesCountText = getDevicesCountText(devicesCount);

  const panelIcon = useMemo(() => {
    if (panelTitle === ECalculatorConnectionGroupType.Success) {
      return <CheckGreenIcon />;
    }
    if (panelTitle === ECalculatorConnectionGroupType.NotPolling) {
      return <StopOrangeIcon />;
    }
    if (panelTitle === ECalculatorConnectionGroupType.Error) {
      return <WarningIcon />;
    }
    if (panelTitle === ECalculatorConnectionGroupType.NoArchives) {
      return <MagnifierIcon />;
    }
  }, [panelTitle]);

  const [downloadType, setType] =
    useState<ECalculatorConnectionGroupType | null>(null);

  useEffect(() => {
    if (!isDownloading) {
      setType(null);
    }
  }, [isDownloading]);

  return (
    <Wrapper onClick={() => setIsOpen((prev) => !prev)}>
      <InfoWrapper>
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
      {isOpen &&
        calculators?.items?.map((device) => (
          <CalculatorInfo device={device} key={device.id} />
        ))}
    </Wrapper>
  );
};
