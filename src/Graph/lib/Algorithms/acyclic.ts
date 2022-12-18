import { Graph } from '../../types/graph';
import { Result } from '../../types/result';

/**
Determines whether a graph is acyclic (i.e. does not contain any cycles) or
not.
@param {Graph} graph - The graph to test.
@returns {Object} An object containing the result of the test, the method
used, the execution time, and whether an error occurred. The result will be
true if the graph is acyclic, and false otherwise.
*/
export function isAcyclic(graph: Graph): Result<boolean> {
  const startTime = Date.now();

  for (const value of graph.getVertices().values()) {
    const stack = [value];
    const seen: Map<number, string> = new Map();

    while (stack.length > 0) {
      const vertex = stack.pop();
      seen.set(vertex.id, 'true');

      const edges = vertex.getEdges().values();

      for (const edge of edges) {
        if (seen.has(edge.target.id)) {
          return {
            method: 'isAcyclic',
            result: false,
            duration: Date.now() - startTime,
          };
        }

        stack.push(edge.target);
      }
    }
  }

  return {
    method: 'isAcyclic',
    result: true,
    duration: Date.now() - startTime,
  };
}
