import React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib';

export const FormItem: React.FC<
  { children: React.ReactNode } & FormItemProps
> = ({ children, ...attrs }) => {
  return (
    <Form.Item colon={false} {...attrs}>
      {children}
    </Form.Item>
  );
};
