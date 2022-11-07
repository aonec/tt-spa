/* eslint-disable */

import React from 'react';

import { Icon } from '01/components/Icon';
import { Loader } from '01/components';

export const SelectList = ({
  styles,
  onCheck = () => {},
  checkList = [],
  list = [],
  loading = true,
  show,
  setShow,
  ...props
}) => {
  const [focus, setFocus] = React.useState(-1);
  const selectList = React.useRef();

  if (loading)
    return (
      <select_list {...use({ show })} tabIndex="0" {...props}>
        <Loader show={loading} size="32" />
      </select_list>
    );

  const len = list?.length === 0 ? 1 : list.length;

  const hendleKeyDown = (e) => {
    if (e.keyCode === 40) {
      setFocus(focus + 1 === len ? 0 : focus + 1);
    }
    if (e.keyCode === 38) {
      setFocus(focus - 1 < 0 ? len - 1 : focus - 1);
    }

    if (e.keyCode === 32) {
      addCheckedId(focus);
      selectList.current.blur();
    }
  };

  const addCheckedId = (index) => {
    const id = list[index].id;
    onCheck([id]);
  };

  const listProps = {
    tabIndex: 0,
    ref: selectList,
    onKeyDown: hendleKeyDown,
    ...props,
  };

  return (
    <select_list {...use({ show })} {...listProps}>
      {!list?.length && <empty>Нет данных</empty>}
      {list?.map(({ name, icon, id }, i) => (
        <select_item
          key={id ?? name}
          {...use({
            focus: i === focus,
            checked: checkList.includes(id),
          })}
          onClick={() => {
            addCheckedId(i);
            setFocus(i);
            selectList.current.blur();
          }}
        >
          {icon && <Icon icon={icon} />}
          <span>{name}</span>
        </select_item>
      ))}
    </select_list>
  );
};

SelectList.defaultProps = {
  styles: {},
};
