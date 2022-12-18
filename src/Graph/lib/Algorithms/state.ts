import { Graph } from '../../types/graph';
import { Result } from '../../types/result';

export const getNextState = (
  state: Map<number, number>,
  graph: Graph,
  alpha = 0
): Result<Map<number, number>> => {
  const newState: Map<number, number> = new Map();
  const start = Date.now();

  for (const key of graph.getVertices().keys()) {
    newState.set(key, 0);
  }

  for (const [key, value] of state.entries()) {
    for (const edge of graph.getVertex(key).getEdges().values()) {
      newState.set(
        edge.target.id,
        newState.get(edge.target.id) +
          (1 - alpha) * (edge.getAdjustedWeight() * value) +
          alpha / graph.getNumVertices()
      );
    }
  }

  return {
    method: 'Next State',
    result: newState,
    duration: Date.now() - start,
  };
};
