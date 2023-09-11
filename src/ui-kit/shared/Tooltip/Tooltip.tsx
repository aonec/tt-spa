import { Tooltip as AntdTooltip } from 'antd';
import React, { FC } from 'react';
import { TooltipProps } from 'antd/lib';

export const Tooltip: FC<TooltipProps> = (params) => (
  <AntdTooltip {...params} color="#272f5a">
    {params.children}
  </AntdTooltip>
);
