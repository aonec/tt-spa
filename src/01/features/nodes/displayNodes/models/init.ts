import { $nodes, fetchNodes, resetNodes } from '.';

$nodes.on(fetchNodes.doneData, (_, nodes) => nodes).reset(resetNodes);
