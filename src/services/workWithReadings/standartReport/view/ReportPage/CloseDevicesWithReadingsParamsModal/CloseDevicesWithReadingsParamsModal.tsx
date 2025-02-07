import { FC, useState } from 'react';
import { Wrapper } from './CloseDevicesWithReadingsParamsModal.styled';
import { Props } from './CloseDevicesWithReadingsParamsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Radio } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SelectMultiple } from 'ui-kit/SelectMultiple';

export const CloseDevicesWithReadingsParamsModal: FC<Props> = ({
  isOpen,
  handleClose,
  houseManagements,
  organizations,
}) => {
  const [view, setView] = useState<'houseManagement' | 'managementFirm'>(
    'houseManagement',
  );

  return (
    <FormModal
      title="Закрыть приборы без показаний"
      formId="checkingDatePoll"
      visible={isOpen}
      submitButtonType="danger"
      submitBtnText="Закрыть приборы"
      disabled
      form={
        <Wrapper>
          <Radio.Group
            value={view}
            onChange={(e) => setView(e.target.value)}
            options={[
              { value: 'houseManagement', label: 'По домоуправлению' },
              { value: 'managementFirm', label: 'По УК' },
            ]}
          />

          {view === 'houseManagement' && (
            <>
              <FormItem label="Домоуправления">
                <SelectMultiple mode="multiple" placeholder="Выберите">
                  {houseManagements?.map((elem) => (
                    <Select.Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>
            </>
          )}

          {view === 'managementFirm' && (
            <>
              <FormItem label="УК">
                <SelectMultiple mode="multiple" placeholder="Выберите">
                  {organizations?.items?.map((elem) => (
                    <Select.Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>

              <FormItem label="Исключить домоуправления">
                <SelectMultiple mode="multiple" placeholder="Выберите">
                  {houseManagements?.map((elem) => (
                    <Select.Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>
            </>
          )}
        </Wrapper>
      }
      onCancel={handleClose}
    />
  );
};
