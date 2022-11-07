import React from 'react';
import Icon from '../Icon';

export const Loader = ({ styles, size, center, ...props }) => {
  return (
    <div {...props} {...use({ center })}>
      <Icon icon="replacement" size={size} />
    </div>
  );
};

Loader.defaultProps = {
  styles: css`
    div {
      display: grid;
      place-content: center;

      &[|center] {
        height: 100vh;
      }
    }
    @keyframes spin {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    Icon {
      animation: spin 1000ms linear infinite;
    }
  `,
};

export default Loader;
