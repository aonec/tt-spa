import React from 'react';
import { FormItemProps } from 'antd/lib';
import { FormItemSC } from './FormItem.styled';

export const FormItem: React.FC<
  { children: React.ReactNode } & FormItemProps
> = ({ children, ...attrs }) => {
  return (
    <FormItemSC colon={false} {...attrs}>
      {children}
    </FormItemSC>
  );
};
