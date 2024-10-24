import { createMutation, createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { HomeownerAccountResponse } from 'api/types';
import { AddPhoneNumberRequestPayload } from './editHomeownerPhoneNumberService.types';
import { EffectFailDataAxiosError } from 'types';
import { createEffect } from 'effector';

export const homeownerAccountQuery = createQuery<
  [string],
  HomeownerAccountResponse
>({
  handler: (id) => axios.get(`/HomeownerAccounts/${id}`),
});

export const addPhoneNumberMutation = createMutation({
  effect: createEffect<
    AddPhoneNumberRequestPayload,
    void,
    EffectFailDataAxiosError
  >(({ id, data }) => axios.post(`/HomeownerAccounts/${id}/AddPhone`, data)),
});

export const removePhoneNumberMutation = createMutation({
  effect: createEffect<
    AddPhoneNumberRequestPayload,
    void,
    EffectFailDataAxiosError
  >(({ id, data }) => axios.post(`/HomeownerAccounts/${id}/RemovePhone`, data)),
});
