import { FC } from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';

export const Tooltip: FC<TooltipProps> = (params) => (
  <AntdTooltip color="#272f5a" {...params}>
    {params.children}
  </AntdTooltip>
);
