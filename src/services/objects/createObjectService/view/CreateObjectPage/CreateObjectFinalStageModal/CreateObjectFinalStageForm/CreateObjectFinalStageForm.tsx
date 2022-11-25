import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React, { FC } from 'react';
import {
  Field,
  FieldDescrition,
  GridContainer,
  PageTitle,
  Wrapper,
} from './CreateObjectFinalStageForm.styled';
import { CreateObjectFinalStageFormProps } from './CreateObjectFinalStageForm.types';

export const CreateObjectFinalStageForm: FC<CreateObjectFinalStageFormProps> = ({}) => {
  return (
    <Wrapper>
      <PageTitle>1. Адрес объекта</PageTitle>

      <GridContainer>
        <FieldDescrition>Основной адрес</FieldDescrition>
        <Field>Некрасова 9</Field>
      </GridContainer>
      <SpaceLine />
      <GridContainer>
        <FieldDescrition>Адреса, под которыми известен объект</FieldDescrition>
        <Field>Некрасова 11</Field>
      </GridContainer>
      <SpaceLine />

      <PageTitle>2. Основная информация </PageTitle>

      <GridContainer>
        <FieldDescrition>Домоуправление</FieldDescrition>
        <Field>«Умный дом»</Field>
      </GridContainer>
      <SpaceLine />
      <GridContainer>
        <FieldDescrition>Категория объекта</FieldDescrition>
        <Field>Жилое</Field>
      </GridContainer>
      <SpaceLine />
      <GridContainer>
        <FieldDescrition>Тип объекта</FieldDescrition>
        <Field>Многоквартирный дом</Field>
      </GridContainer>
      <SpaceLine />
      <GridContainer>
        <FieldDescrition>Тепловой пункт</FieldDescrition>
        <Field>ЦТП 1 (12763781)</Field>
      </GridContainer>
      <SpaceLine />

      <PageTitle>3. Дополнительная информация </PageTitle>

      <GridContainer>
        <FieldDescrition>Число этажей</FieldDescrition>
        <Field>10</Field>
      </GridContainer>
      <SpaceLine />
      <GridContainer>
        <FieldDescrition>Число подъездов</FieldDescrition>
        <Field>-</Field>
      </GridContainer>
      <SpaceLine />
      <GridContainer>
        <FieldDescrition>Лифт</FieldDescrition>
        <Field>Есть</Field>
      </GridContainer>
      <SpaceLine />
    </Wrapper>
  );
};
