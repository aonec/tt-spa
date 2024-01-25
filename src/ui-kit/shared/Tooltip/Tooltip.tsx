import { Tooltip as AntdTooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
import React, { FC } from 'react';

export const Tooltip: FC<TooltipProps> = (params) => (
  <AntdTooltip {...params} color="#272f5a">
    {params.children}
  </AntdTooltip>
);
