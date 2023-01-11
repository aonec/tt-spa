import { fetchHomeownerFx } from './index';
import { $homeowner } from '.';
import { getHomeownerAccount } from '01/_api/homeowners';

fetchHomeownerFx.use(getHomeownerAccount);

$homeowner.on(fetchHomeownerFx.doneData, (_, homeowner) => homeowner);
