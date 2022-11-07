/* eslint-disable */

import React from 'react';
import { SelectField } from './SelectField';
import { SelectList } from './SelectList';
import t from 'prop-types';

export const Select = ({
  big = false,
  loading = false,
  list = [],
  placeholder = '',
  labelText = 'hello',
  getSelectData = () => {},
  ...props
}) => {
  const [checked, setChecked] = React.useState([]);
  const [showList, setShowList] = React.useState(false);
  React.useEffect(() => {
    if (!loading) getSelectData(checked);
  }, [checked]);
  return (
    <select_wraper {...props}>
      {labelText && <label>{labelText}</label>}
      <SelectList
        onCheck={setChecked}
        checkList={checked}
        list={list}
        loading={loading}
        show={showList}
        onFocus={() => setShowList(true)}
        onBlur={() => !loading && setShowList(false)}
      ></SelectList>
      <SelectField
        show={showList}
        setShow={setShowList}
        list={list}
        checkList={checked}
        placeholder={placeholder}
        setShow={setShowList}
      />
    </select_wraper>
  );
};

Select.propTypes = {
  big: t.bool,
  loading: t.bool,
  list: t.array,
  placeholder: t.string,
  labelText: t.string,
  getSelectData: t.func,
};
