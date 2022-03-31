import { createDomain } from 'effector';
import { NodeCheckResponse } from 'myApi';
import { GetNodeChecksRequest } from './types';

const displayNodeChecksDomain = createDomain('displayNodeChecksDomain');

const $nodeChecks = displayNodeChecksDomain.createStore<
  NodeCheckResponse[] | null
>(null);

const fetchNodeChecksFx = displayNodeChecksDomain.createEffect<
  GetNodeChecksRequest,
  NodeCheckResponse[] | null
>();
