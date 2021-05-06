import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

const styles = {
  width: 48,
};

interface SwitchInterface {
  onChange: (checked: boolean) => void;
  title?: string;
  checked?: boolean;
}

export const SwitchTT = ({
  onChange,
  title,
  ...props
}: SwitchInterface & SwitchProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Switch style={styles} defaultChecked onChange={onChange} {...props} />
      <span
        style={{
          fontSize: '16px',
          lineHeight: '32px',
          marginLeft: '16px',
          color: 'rgba(39, 47, 90, 0.9)',
        }}
      >
        {title}
      </span>
    </div>
  );
};
export default SwitchTT;
