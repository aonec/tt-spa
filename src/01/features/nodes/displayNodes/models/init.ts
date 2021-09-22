import { $nodes, fetchNodes, resetNodes } from '.';
import { getNodes } from '01/_api/nodes';

fetchNodes.use(getNodes);

$nodes.on(fetchNodes.doneData, (_, nodes) => nodes).reset(resetNodes);
