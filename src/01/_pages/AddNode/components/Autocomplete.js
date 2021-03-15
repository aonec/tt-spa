import React, { useState } from 'react'
import { AutoComplete } from 'antd'

const Autocomplete = ({ dataSource, onSelectValue }) => {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState([])

    const onSearch = (searchText) => {
        const filtered = dataSource.filter(
            (obj) => obj.key !== 0 && obj.value.includes(searchText)
        )
        setOptions(filtered)
    }

    const onSelect = (data, option) => {
        console.log('onSelect', data)
        console.log('onSelect', option)
        onSelectValue(option.key)
    }

    const onChange = (data) => {
        setValue(data)
    }

    return (
        <AutoComplete
            value={value}
            options={options}
            style={{
                width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder="control mode"
        />
    )
}

export default Autocomplete

const someArray = [
    { key: 2538492, value: 'ТЭМ-106 140141' },
    { key: 2538494, value: 'ВКТ-7 153961' },
    { key: 2538493, value: 'ВКТ-7 72372' },
    { key: 2538495, value: 'ВКТ-7 142743' },
    { key: 25384954, value: 'ВКТ-7 1427434' },
]
