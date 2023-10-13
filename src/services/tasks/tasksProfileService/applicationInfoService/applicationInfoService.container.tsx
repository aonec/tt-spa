import React from 'react';
import { ApplicationInfoBlock } from './view/ApplicationInfoBlock';
import { applicationInfoService } from './applicationInfoService.models';
import { useUnit } from 'effector-react';

const { inputs, outputs } = applicationInfoService;

export const ApplicationInfoContainer = () => {
  const { applicationInfo } = useUnit({
    applicationInfo: outputs.$applicationInfo,
  });

  return <ApplicationInfoBlock applicationInfo={applicationInfo} />;
};
