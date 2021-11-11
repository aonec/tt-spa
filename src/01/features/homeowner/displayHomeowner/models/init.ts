import {
  $currentPersonalNumberIndex,
  fetchHomeownerFx,
  HomeownerGate,
  setCurrentPersonalNumberIndex,
} from './index';
import { $homeowner } from '.';
import { sample } from 'effector';
import { getHomeownerAccount } from '01/_api/homeowners';

fetchHomeownerFx.use(getHomeownerAccount);

$homeowner.on(fetchHomeownerFx.doneData, (_, homeowner) => homeowner);

sample({
  source: HomeownerGate.state.map(({ id }) => id),
  clock: [HomeownerGate.state, HomeownerGate.open],
  target: fetchHomeownerFx,
});

$currentPersonalNumberIndex.on(
  setCurrentPersonalNumberIndex,
  (_, value) => value
);
