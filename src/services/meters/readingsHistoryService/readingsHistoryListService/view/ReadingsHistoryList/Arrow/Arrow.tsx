import React, { FC } from 'react';
import { ArrowBottom, ArrowIconTop } from 'ui-kit/icons';
import { ArrowProps } from './Arrow.types';

export const Arrow: FC<ArrowProps> = ({ open }) =>
  open ? <ArrowIconTop /> : <ArrowBottom />;
