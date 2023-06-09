import React, { FC } from 'react';
import {
  AddressItem,
  ColorCircle,
  Footer,
  FormWrapper,
  Header,
  ListWrapper,
  SelectColorOptionWrapper,
  Title,
  Wrapper,
} from './CreateDistrictFormPanel.styled';
import { CreateDistrictFormPanelProps } from './CreateDistrictFormPanel.types';
import { Checkbox, Empty } from 'antd';
import { Button } from 'ui-kit/Button';
import { sortBy } from 'lodash';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { DistrictColorsList } from '../CreateDistrictBorderMapPage.constants';
import { DistrictColor } from '../CreateDistrictBorderMapPage.types';

export const CreateDistrictFormPanel: FC<CreateDistrictFormPanelProps> = ({
  housingStocksInDistrict,
  selectedHousingStocks,
  handleClickHousingStock,
  handleCancel,
  districtColor,
  setDistrictColor,
  formSection,
  setFormSection,
}) => {
  const housingStocksListSection = (
    <>
      <Header>
        <Title>Выбранные адреса</Title>
      </Header>
      <ListWrapper>
        {sortBy(housingStocksInDistrict, (elem) => {
          const address = elem.address?.mainAddress;
          return `${address?.street}${address?.number}${address?.corpus || ''}`;
        }).map((elem) => (
          <AddressItem>
            <Checkbox
              onChange={() => handleClickHousingStock(elem.id)}
              checked={selectedHousingStocks.includes(elem.id)}
            >
              {elem.address?.mainAddress?.street}
              {', '}
              {elem.address?.mainAddress?.number}
            </Checkbox>
          </AddressItem>
        ))}
        {!housingStocksInDistrict.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </ListWrapper>
      <Footer>
        <Button size="small" type="ghost" onClick={handleCancel}>
          Отмена
        </Button>
        <Button size="small" onClick={() => setFormSection(formSection + 1)}>
          Продолжить
        </Button>
      </Footer>
    </>
  );

  const settingsSection = (
    <>
      <FormWrapper>
        <FormItem label="Название района">
          <Input small placeholder="Введите название" />
        </FormItem>
        <FormItem label="Цвет">
          <Select
            small
            placeholder="Выберите цвет"
            value={districtColor}
            onChange={(value) => setDistrictColor(value as DistrictColor)}
          >
            {DistrictColorsList.map(({ type, color, strokeColor, name }) => (
              <Select.Option key={type} value={type}>
                <SelectColorOptionWrapper>
                  <ColorCircle color={color} strokeColor={strokeColor} />
                  {name}
                </SelectColorOptionWrapper>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </FormWrapper>
      <Footer>
        <Button
          size="small"
          type="ghost"
          onClick={() => setFormSection(formSection - 1)}
        >
          Назад
        </Button>
        <Button size="small">Сохранить</Button>
      </Footer>
    </>
  );

  return (
    <Wrapper>
      {formSection === 0 && housingStocksListSection}
      {formSection === 1 && settingsSection}
    </Wrapper>
  );
};
