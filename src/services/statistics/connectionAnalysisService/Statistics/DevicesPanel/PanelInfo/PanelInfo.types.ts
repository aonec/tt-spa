import React from 'react';
import type { JSX } from 'react';
import { ECalculatorConnectionGroupType } from 'api/types';
import { DownloadParams } from 'services/statistics/connectionAnalysisService/connectionAnalysisService.types';

export type Props = {
  handleDownload: (payload: DownloadParams) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  devicesCountText: string | undefined;
  downloadType: ECalculatorConnectionGroupType | null;
  devicesCount: number;
  panelIcon: JSX.Element | undefined;
  panelTitle: ECalculatorConnectionGroupType;
  setType: React.Dispatch<
    React.SetStateAction<ECalculatorConnectionGroupType | null>
  >;
  isOpen: boolean;
};
