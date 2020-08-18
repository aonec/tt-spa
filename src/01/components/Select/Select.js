import React from "react"
import styled, { use } from "reshadow/macro"
import { SelectField } from "./SelectField"
import { SelectList } from "./SelectList"
import t from "prop-types"

export const Select = ({
  big = false,
  loading = false,
  list = [],
  placeholder = "",
  labelText = "hello",
  getSelectData = () => {},
  ...props
}) => {
  const [checked, setChecked] = React.useState([])
  const [showList, setShowList] = React.useState(false)
  React.useEffect(() => {
    if (!loading) getSelectData(checked)
    // eslint-disable-next-line 
  }, [checked])
  return styled`
    select_wraper {
      --active: var(--primary-100);
      --h: var(--h-norm);
      --pdng: 8px;
      position: relative;
      color: var(--main-80);
      cursor: pointer;
      &[|big] {
        font-size: 16px;
        line-height: 2em;
        --h: var(--h-big);
      }
    }

    label {
      color: var(--main-60);
      font-weight: 500;
      margin-bottom: 8px;
      display: inline-block;
      line-height: 16px;
    }
  `(
    <select_wraper {...use({ big })} {...props}>
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
        show={showList}
        setShow={setShowList}
      />
    </select_wraper>
  )
}

Select.propTypes = {
  big: t.bool,
  loading: t.bool,
  list: t.array,
  placeholder: t.string,
  labelText: t.string,
  getSelectData: t.func,
}
