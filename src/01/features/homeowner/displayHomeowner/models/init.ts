import { fetchHomeowner, HomeownerGate } from './index';
import { $homeowner } from '.';
import { sample } from 'effector';
import { getHomeownerAccount } from '01/_api/homeowners';

fetchHomeowner.use(getHomeownerAccount);

$homeowner.on(fetchHomeowner.doneData, (_, homeowner) => homeowner);

sample({
  source: HomeownerGate.state.map(({ id }) => id),
  clock: [HomeownerGate.state, HomeownerGate.open],
  target: fetchHomeowner,
});
