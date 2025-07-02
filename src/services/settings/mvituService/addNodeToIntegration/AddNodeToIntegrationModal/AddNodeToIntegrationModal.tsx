import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, message, Radio, Skeleton, Space, Button } from 'antd';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import {
  BaseInfoTitle,
  BaseInfoWrapper,
  NodeAddress,
  NodeInfo,
  NodeNumber,
  NodePanel,
  Wrapper,
} from './AddNodeToIntegrationModal.styled';
import { Props } from './AddNodeToIntegrationModal.types';
import { useDebounce } from 'use-debounce';
import { NodeListResponse, StatusType } from 'api/mvitu.types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { CalculatorIcon } from 'ui-kit/icons';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { validationSchema } from './AddNodeToIntegrationModal.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Alert } from 'ui-kit/Alert';

type SearchType = 'AddressTerm' | 'CalculatorSerialNumber';

// test

export const AddNodeToIntegrationModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  handleSearchNodes,
  nodesSearchList,
  isNodesSearchLoading,
  handleSelectNode,
  selectedNode,
  isSelectedNodeLoading,
  handleAddNodeToIntegration,
  isAddNodeLoading,
  integrationData,
  resetSelectedNode,
  resetNodesSearchingList,
}) => {
  const [searchType, setSearchType] = useState<SearchType>('AddressTerm');
  const [searchString, setSearchString] = useState('');

  const [debouncedSearch] = useDebounce(searchString, 500);

  const building = selectedNode?.building;

  const { values, handleChange, resetForm, errors, handleSubmit } = useFormik({
    initialValues: {
      addressSrt: building?.addressSrt || '',
      fias: building?.fias || '',
      point: { latitude: '', longitude: '' },
      buildingType: '',
      buildingCode: '',
      buildingInputNum: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const nodeId = selectedNode?.id;

      const isPointCorrect =
        Boolean(values.point.latitude) === Boolean(values.point.longitude);

      if (!isPointCorrect) {
        message.error('Введите координаты');

        return;
      }

      if (!nodeId) return;

      handleAddNodeToIntegration({
        nodeId,
        ...values,
        point: {
          latitude: Number(values.point.latitude),
          longitude: Number(values.point.longitude),
        },
        buildingInputNum: Number(values.buildingInputNum),
      });
    },
  });

  useEffect(() => {
    if (isModalOpen) return;

    resetForm();
  }, [resetForm, isModalOpen]);

  useEffect(() => {
    resetSelectedNode();
    resetNodesSearchingList();
    setSearchString('');
  }, [resetNodesSearchingList, resetSelectedNode, searchType]);

  const runSeaschNodes = useCallback(
    (loadAll: boolean) => {
      if (!debouncedSearch) return;

      handleSearchNodes({
        [searchType]: debouncedSearch,
        LoadAll: loadAll,
      });
    },
    [debouncedSearch, handleSearchNodes, searchType],
  );

  useEffect(() => {
    runSeaschNodes(false);
  }, [handleSearchNodes, debouncedSearch, searchType, runSeaschNodes]);

  const searchPlaceholder = useMemo(() => {
    const placeholders = {
      AddressTerm: 'Введите адрес...',
      CalculatorSerialNumber: 'Введите серийный номер вычислителя...',
    };

    return placeholders[searchType];
  }, [searchType]);

  const isIntegrationPaused = integrationData?.status !== StatusType.Active;

  return (
    <FormModal
      formId="add-node-to-integration-modal"
      title="Добавить узел в интеграцию"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      onSubmit={handleSubmit}
      loading={isAddNodeLoading}
      disabled={isIntegrationPaused || !building}
      form={
        <Wrapper>
          {isIntegrationPaused && (
            <Alert icon="stop">
              Возможность добавления узлов приостановлена, включите интеграцию
              для продолжения
            </Alert>
          )}
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
              value={selectedNode?.id}
              onChange={(id) => handleSelectNode(id as number)}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  {nodesSearchList?.hasMore && (
                    <>
                      <Divider style={{ margin: '8px 0 4px' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Button
                          type="link"
                          onClick={() => runSeaschNodes(true)}
                        >
                          Показать все ({nodesSearchList.totalCount})
                        </Button>
                      </Space>
                    </>
                  )}
                </>
              )}
            >
              {nodesSearchList?.nodes?.map((node) => (
                <Select.Option key={node.id} value={node.id}>
                  <NodeOptionItem node={node} />
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          {isSelectedNodeLoading && <Skeleton active />}
          {selectedNode && !isSelectedNodeLoading && (
            <>
              <SpaceLine noPadding />
              <BaseInfoTitle>Основная информация по объекту</BaseInfoTitle>
              <FormItem label="Адрес">
                <Input
                  value={values.addressSrt}
                  name="addressSrt"
                  placeholder="Введите адрес"
                  onChange={handleChange}
                  status={errors.addressSrt && 'error'}
                />
                <ErrorMessage>{errors.addressSrt}</ErrorMessage>
              </FormItem>
              <BaseInfoWrapper>
                <FormItem label="Код объекта из системы ФИАС">
                  <Input
                    value={values.fias}
                    name="buildingCode"
                    placeholder="Введите код"
                    onChange={handleChange}
                    status={errors.buildingCode && 'error'}
                  />
                  <ErrorMessage>{errors.buildingCode}</ErrorMessage>
                </FormItem>
                <FormItem label="Координаты">
                  <Space.Compact>
                    <Input
                      placeholder="Широта"
                      value={values.point.latitude}
                      name="point.latitude"
                      onChange={handleChange}
                      status={errors.point?.latitude && 'error'}
                    />
                    <ErrorMessage>{errors.point?.latitude}</ErrorMessage>
                    <Input
                      placeholder="Долгота"
                      value={values.point.longitude}
                      name="point.longitude"
                      onChange={handleChange}
                      status={errors.point?.longitude && 'error'}
                    />
                    <ErrorMessage>{errors.point?.longitude}</ErrorMessage>
                  </Space.Compact>
                </FormItem>
                <FormItem label="Тип объекта">
                  <Input
                    placeholder="Введите тип"
                    value={values.buildingType}
                    name="buildingType"
                    onChange={handleChange}
                    status={errors.buildingType && 'error'}
                  />
                  <ErrorMessage>{errors.buildingType}</ErrorMessage>
                </FormItem>
                <FormItem label="Код объекта">
                  <Input
                    placeholder="Введите код"
                    value={values.buildingCode}
                    name="buildingCode"
                    onChange={handleChange}
                  />
                </FormItem>
              </BaseInfoWrapper>
              <SpaceLine noPadding />
              <BaseInfoTitle>Основная информация по узлу</BaseInfoTitle>
              <FormItem label="№ ввода в здание" style={{ width: 250 }}>
                <Input
                  placeholder="Введите"
                  value={values.buildingInputNum}
                  type="number"
                  name="buildingInputNum"
                  onChange={handleChange}
                  status={errors.buildingInputNum && 'error'}
                />
                <ErrorMessage>{errors.buildingInputNum}</ErrorMessage>
              </FormItem>
            </>
          )}
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
