/* eslint-disable */

import React from 'react';

import { Icon } from '01/components/Icon';

export const SelectField = ({
  styles,
  list = [],
  checkList = [],
  placeholder = '',
  show,
  setShow,
  ...props
}) => {
  const field = React.useRef();

  const checkedItem = list?.find((item) => item.id === checkList[0]);

  const content = !checkList?.length
    ? styled()`
        ph {
          color: var(--main-32);
        }
      `(<ph>{placeholder}</ph>)
    : styled(styles)(
        <>
          {checkedItem.icon && <Icon icon={checkedItem.icon} />}
          {checkedItem.name}
        </>
      );

  return (
    <field
      {...props}
      ref={field}
      onClick={() => setShow(!show)}
      {...use({ show })}
    >
      <content>{content}</content>
      <Icon icon="down" />
    </field>
  );
};

SelectField.defaultProps = {
  styles: {},
};
