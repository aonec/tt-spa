import React, { useContext } from 'react'
import { Form } from 'antd'
import DevicesListDiv from './Tabs'
import { ReportContext } from '../index'
import { InputTT, SelectTT } from '../../../../../../tt-components'

export const Uzel = () => {
    console.log('Uzel')
    const {
        street,
        housingStockNumber,
        SelectReport,
        type,
        selectOptions,
        handleSomeChange,
    } = useContext(ReportContext)

    console.log('selectOptions', selectOptions)
    console.log('type', type)

    const modifiedSelectOptions = selectOptions.filter(
        (option) => option.resource == type
    )
    console.log('modifiedSelectOptions', modifiedSelectOptions)

    {
        return (
            <div>
                <Form.Item label=" Название отчета">
                    <InputTT
                        value={`${street}_${housingStockNumber}.exls`}
                        disabled
                    />
                </Form.Item>

                <Form.Item label="Выбор узла">
                    <SelectTT
                        options={modifiedSelectOptions}
                        placeholder="Выберите узел"
                        onChange={handleSomeChange}
                    />
                </Form.Item>
            </div>
        )
    }
}

export const Top = () => {
    console.log('Top')
    return (
        <>
            <DevicesListDiv />
            <Uzel />
        </>
    )
}

export default Top
