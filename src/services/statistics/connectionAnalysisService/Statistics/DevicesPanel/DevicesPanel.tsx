import React, { FC, useEffect, useMemo, useState } from 'react';
import { PaginationSC, Wrapper } from './DevicesPanel.styled';
import { Props } from './DevicesPanel.types';
import { CalculatorInfo } from './CalculatorDevices';
import { getDevicesCountText } from 'services/nodes/createNodeService/view/CreateNodePage/ConnectedDevices/CommunicationPipeListItem/CommunicationPipeListItem.utils';
import {
  CheckGreenIcon,
  MagnifierIcon,
  StopOrangeIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { ECalculatorConnectionGroupType } from 'api/types';
import { PanelInfo } from './PanelInfo';

export const DevicesPanel: FC<Props> = ({
  panelTitle,
  calculators,
  handlePing,
  handleDownload,
  isDownloading,
  pageNumbers,
  setPageNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const devicesCount = calculators?.totalItems || 0;

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
    <Wrapper>
      <PanelInfo
        handleDownload={handleDownload}
        setIsOpen={setIsOpen}
        devicesCountText={devicesCountText}
        devicesCount={devicesCount}
        downloadType={downloadType}
        panelIcon={panelIcon}
        panelTitle={panelTitle}
        setType={setType}
        isOpen={isOpen}
      />

      {isOpen &&
        calculators?.items?.map((device) => (
          <CalculatorInfo
            device={device}
            key={device.id}
            handlePing={handlePing}
          />
        ))}
      {isOpen && (
        <PaginationSC
          pageSize={30}
          total={devicesCount}
          current={pageNumbers[panelTitle]}
          onChange={(pageNumber) => {
            setPageNumber({ [panelTitle]: pageNumber } as Record<
              ECalculatorConnectionGroupType,
              number
            >);
          }}
          showSizeChanger={false}
        />
      )}
    </Wrapper>
  );
};
