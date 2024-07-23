import { FC, useEffect, useMemo, useState } from 'react';
import { Radio } from 'antd';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import {
  NodeAddress,
  NodeInfo,
  NodeNumber,
  NodePanel,
  Wrapper,
} from './AddNodeToIntegrationModal.styled';
import { Props } from './AddNodeToIntegrationModal.types';
import { useDebounce } from 'use-debounce';
import { NodeListResponse } from 'api/mvitu.types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { CalculatorIcon } from 'ui-kit/icons';

type SearchType = 'AddressTerm' | 'CalculatorSerialNumber';

export const AddNodeToIntegrationModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  handleSearchNodes,
  nodesSearchList,
  isNodesSearchLoading,
}) => {
  const [searchType, setSearchType] = useState<SearchType>('AddressTerm');
  const [searchString, setSearchString] = useState('');

  const [debouncedSearch] = useDebounce(searchString, 500);

  useEffect(() => {
    if (!debouncedSearch) return;

    handleSearchNodes({
      [searchType]: debouncedSearch,
    });
  }, [handleSearchNodes, debouncedSearch, searchType]);

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
            <Select
              searchValue={searchString}
              onSearch={(value) => setSearchString(value)}
              placeholder={searchPlaceholder}
              showSearch
              filterOption={false}
              loading={isNodesSearchLoading}
            >
              {nodesSearchList?.nodes?.map((node) => (
                <Select.Option key={node.id} value={node.id}>
                  <NodeOptionItem node={node} />
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Wrapper>
      }
    />
  );
};

const NodeOptionItem: FC<{ node: NodeListResponse }> = ({ node }) => {
  return (
    <NodePanel>
      <NodeInfo>
        <ResourceIconLookup resource={node.resource} />
        <NodeNumber>Узел {node.title}</NodeNumber>
      </NodeInfo>
      <NodeInfo>
        <CalculatorIcon />
        {node.calculator?.model} ({node.calculator?.serialNumber})
      </NodeInfo>
      <NodeAddress>{node.address?.address}</NodeAddress>
    </NodePanel>
  );
};
