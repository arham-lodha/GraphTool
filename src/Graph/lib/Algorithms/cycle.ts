import { Graph } from '../../types/graph';
import { Result } from '../../types/result';
import { Path } from '../../types/subgraph';

import { enumeratePaths } from './paths';

export const findCyclesWithVertex = (
  graph: Graph,
  id: number
): Result<Path[]> => {
  return enumeratePaths(graph, id, id);
};
