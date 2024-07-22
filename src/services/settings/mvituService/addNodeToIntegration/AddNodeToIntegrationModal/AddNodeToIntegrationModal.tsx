import { FC, useMemo, useState } from 'react';
import { Wrapper } from './AddNodeToIntegrationModal.styled';
import { Props } from './AddNodeToIntegrationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Radio } from 'antd';
import { Select } from 'ui-kit/Select';

type SearchType = 'AddressTerm' | 'CalculatorSerialNumber';

export const AddNodeToIntegrationModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const [searchType, setSearchType] = useState<SearchType>('AddressTerm');

  const searchPlaceholder = useMemo(() => {
    const placeholders = {
      AddressTerm: 'Введите адрес...',
      CalculatorSerialNumber: 'Введите серийный номер вычислителя...',
    };

    return placeholders[searchType];
  }, [searchType]);

  return (
    <FormModal
      formId="add-node-to-integration-modal"
      title="Добавить узел в интеграцию"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <Wrapper>
          <FormItem label="Поиск узла">
            <Radio.Group
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as SearchType)}
            >
              <Radio value={'AddressTerm'}>По адресу</Radio>
              <Radio value={'CalculatorSerialNumber'}>По вычислителю</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem label="Узел">
            <Select placeholder={searchPlaceholder} showSearch></Select>
          </FormItem>
        </Wrapper>
      }
    />
  );
};
