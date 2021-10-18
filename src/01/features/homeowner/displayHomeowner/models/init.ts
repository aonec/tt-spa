import { fetchHomeowner, HomeownerGate } from './index';
import { $homeowner } from '.';
import { forward } from 'effector';
import { getHomeownerAccount } from '01/_api/homeowners';

fetchHomeowner.use(getHomeownerAccount);

$homeowner.on(fetchHomeowner.doneData, (_, homeowner) => homeowner);

forward({
  from: HomeownerGate.state.map(({ id }) => id),
  to: fetchHomeowner,
});
