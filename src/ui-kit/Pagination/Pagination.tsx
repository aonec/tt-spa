import React, { FC } from 'react';
import { Pagination as PaginationAntD } from 'antd';
import { PaginationProps } from 'antd/lib';

export const Pagination: FC<PaginationProps> = ({ ...attrs }) => {
  return <PaginationAntD hideOnSinglePage={true} {...attrs} />;
};
