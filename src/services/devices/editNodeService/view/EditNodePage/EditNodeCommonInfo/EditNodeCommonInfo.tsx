import React, { FC } from 'react';
import { Wrapper } from './EditNodeCommonInfo.styled';
import { EditNodeCommonInfoProps } from './EditNodeCommonInfo.types';

export const EditNodeCommonInfo: FC<EditNodeCommonInfoProps> = ({}) => {
  return <Wrapper>
     <Form.Item
            style={styles.w100}
            label="Тип ресурса"
            name={'resource'}
            rules={[{ required: true, message: 'Выберите Тип ресурса' }]}
          >
            <SelectTT
              placeholder="Выберите Тип ресурса"
              options={resources}
              disabled
            />
          </Form.Item>

          <Form.Item
            style={styles.w100}
            label="Номер узла"
            name="number"
            rules={[{ required: true, message: 'Выберите Номер узла' }]}
          >
            <InputTT placeholder="Номер узла" />
          </Form.Item>

          <Zone>
            <label
              htmlFor="serviceZone"
              style={{ color: 'var(--main-70)', fontWeight: 500 }}
            >
              Зона:
            </label>
            <ZoneInner>
              <SelectTT
                id="serviceZone"
                style={styles.w49}
                onChange={(chosenInputId) => {
                  setChosenInput(+chosenInputId);
                }}
                placeholder="Зона"
                options={selectZonesOptions}
                value={chosenInputForSelect?.value}
              />
              <AddZoneText onClick={() => addServiceZoneButtonClicked()}>
                + Добавить новую зону
              </AddZoneText>
            </ZoneInner>
          </Zone>

          <AddNewZonesModal />

          <Form.Item
            style={styles.w100}
            label="Коммерческий учет показателей приборов"
            name="nodeStatus"
            rules={[{ required: true, message: 'Выберите Коммерческий учет' }]}
          >
            <SelectTT
              placeholder="Коммерческий учет показателей приборов"
              options={nodeStatusList}
            />
          </Form.Item>

          <>
            <Form.Item
              style={styles.w100}
              label="Дата начала действия акта-допуска"
              name="lastCommercialAccountingDate"
              rules={[
                {
                  required: true,
                  message: 'Выберите Дата начала действия акта-допуска',
                },
              ]}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                placeholder="Укажите дату..."
                allowClear={false}
                onChange={(value) => {
                  setFieldsValue({
                    futureCommercialAccountingDate: moment(value).add(
                      4,
                      'years'
                    ),
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              style={styles.w100}
              label="Дата окончания действия акта-допуска"
              name="futureCommercialAccountingDate"
              rules={[
                {
                  required: true,
                  message: 'Выберите Дата окончания действия акта-допуска',
                },
              ]}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                placeholder="Укажите дату..."
                allowClear={false}
              />
            </Form.Item>
          </>
        </StyledFormPage>
  </Wrapper>
};
