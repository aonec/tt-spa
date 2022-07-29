import React, { FC } from 'react';
import styles from './DeviceSearchForm.module.scss';
import { Form, Select } from 'antd';
import _ from 'lodash';
import {
  CustomGrid,
  FlexCenterRow,
  StyledForm,
  StyledGrid,
  StyledLabel,
  StyledLabelSimple,
  SCSlider,
  Wrapper,
  Grid,
  StyledExpirationDate,
} from './SearchDevices.styled';
import { SearchDevicesProps } from './SearchDevices.types';
import { FormItem } from '../../../../tasks/tasksProfileService/view/SearchTasks/SearchTasks.styled';
import { Icon } from '../../../../../01/components';
import { InputSC, SelectSC } from '../../../../../01/shared/ui/Fields';

const { Option } = Select;

export const SearchDevices: FC<SearchDevicesProps> = ({
  children,
  isExtendedSearchOpen,
  submitForm,
  setFieldValue,
  values,
}) => {
  const marks = {
    0: '0',
    255: '255',
  };

  const debouncedFilterChange = _.debounce(() => submitForm(), 1000);

  return (
    <Wrapper>
      {!isExtendedSearchOpen ? (
        <StyledForm
          id="searchForm"
          initialValues={{ remember: true }}
          onChange={() => submitForm()}
        >
          <StyledGrid isExtendedSearchOpen={isExtendedSearchOpen}>
            {children}
            <FormItem>
              <InputSC
                onChange={(value) =>
                  setFieldValue('Question', value.target.value)
                }
                className={styles.input}
                value={values?.Question}
                placeholder="Введите серийный номер прибора"
                prefix={<Icon icon="search" />}
              />
            </FormItem>

            <FormItem>
              <FlexCenterRow>
                <StyledLabelSimple htmlFor="sortBy">
                  Сортировать по:
                </StyledLabelSimple>
                <SelectSC
                  style={{ width: '65%' }}
                  id="sortBy"
                  value={values?.OrderBy}
                  placeholder="Дате проверки"
                  onChange={(value) => setFieldValue('OrderBy', value)}
                  onSelect={() => submitForm()}
                >
                  <Option value="Descending">Улице (уб.)</Option>
                  <Option value="Ascending">Улице (возр.)</Option>
                </SelectSC>
              </FlexCenterRow>
            </FormItem>
          </StyledGrid>

          <Grid>
            <FormItem>
              <StyledExpirationDate>
                <StyledLabelSimple htmlFor="expirationDate">
                  Истекает дата поверки:{' '}
                </StyledLabelSimple>
                <SelectSC
                  id="expirationDate"
                  style={{ width: '65%' }}
                  value={values['Filter.ExpiresCheckingDateAt']}
                  onChange={(value) =>
                    setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
                  }
                  onSelect={() => submitForm()}
                >
                  <Option value="NextMonth">Ближайший месяц</Option>
                  <Option value="NextTwoMonth">В следующие два месяца</Option>
                  <Option value="Past">Истекла</Option>
                </SelectSC>
              </StyledExpirationDate>
            </FormItem>

            <FormItem>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Диаметр прибора, мм </StyledLabel>

                <SCSlider
                  getTooltipPopupContainer={(triggerNode) =>
                    triggerNode.parentNode as HTMLElement
                  }
                  defaultValue={[0, 255]}
                  max={255}
                  range
                  value={[
                    values['Filter.DiameterRange.From']
                      ? values['Filter.DiameterRange.From']
                      : 0,
                    values['Filter.DiameterRange.To']
                      ? values['Filter.DiameterRange.To']
                      : 255,
                  ]}
                  marks={marks}
                  onChange={(value: [number, number]) => {
                    setFieldValue("['Filter.DiameterRange.From']", value[0]);
                    setFieldValue("['Filter.DiameterRange.To']", value[1]);
                    debouncedFilterChange();
                  }}
                />
              </div>
            </FormItem>
          </Grid>
        </StyledForm>
      ) : (
        <CustomGrid>
          <Form.Item name="advancedButton">{children}</Form.Item>
        </CustomGrid>
      )}
    </Wrapper>
  );
};
