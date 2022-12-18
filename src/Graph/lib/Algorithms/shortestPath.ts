import { PriorityQueue } from "typescript-collections";

import { Edge } from "../../types/edge";
import { Graph } from "../../types/graph";
import { Path } from "../../types/subgraph";
import { createPath } from "../path";

/**
Dijkstra's algorithm for finding the shortest path in a graph.
@param {Graph} graph - The graph to search.
@param {number} source - The id of the source vertex.
@param {function} [distanceFunction=(e) => e.weight] - A function that
returns the distance/weight of an edge. Defaults to the edge's weight.
@returns {Object} An object with two maps, previousEdges and distances.
previousEdges is a map of vertices and their previous edges on the
shortest path from the source to that vertex. distances is a map of vertices
and their distances from the source.
*/
export const dijkstra = (
    graph: Graph,
    source: number,
    distanceFunction: (e: Edge) => number = (e) => e.weight
): { previousEdges: Map<number, Edge>; distances: Map<number, number> } => {
    const distances: Map<number, number> = new Map();

    const previousEdges: Map<number, Edge> = new Map();
    distances.set(source, 0);
    previousEdges.set(source, null);

    const queue: PriorityQueue<number> = new PriorityQueue(
        (a, b) => distances.get(b) - distances.get(a)
    );

    queue.enqueue(source);

    while (!queue.isEmpty()) {
        const id = queue.dequeue();
        const vertex = graph.getVertex(id);

        for (const edge of vertex.getEdges().values()) {
            const alt = distances.get(id) + distanceFunction(edge);

            if (
                !distances.has(edge.target.id) ||
                alt < distances.get(edge.target.id)
            ) {
                distances.set(edge.target.id, alt);
                previousEdges.set(edge.target.id, edge);
                queue.enqueue(edge.target.id);
            }
        }
    }
    return {
        previousEdges,
        distances,
    };
};

/**
Finds the shortest path between two vertices in a graph using Dijkstra's
algorithm.
@param {Graph} graph - The graph to search.
@param {number} source - The id of the source vertex.
@param {number} target - The id of the target vertex.
@param {function} [distanceFunction=(e) => e.weight] - A function that
returns the distance/weight of an edge. Defaults to the edge's weight.
@returns {Result<Path>} An object representing the shortest path between the source
and target vertices.
@throws {Error} If either of the source or target vertices do not exist in
the graph or if there is no path between the source and target vertices.
*/
export const shortestPath = (
    graph: Graph,
    source: number,
    target: number,
    distanceFunction: (e: Edge) => number = (e) => e.weight
): Result<Path> => {
    if (!graph.getVertices().has(source) || !graph.getVertices().has(target)) {
        throw new Error("Vertices do not exist in graph");
    }

    const method = `Shortest Path from ${graph
        .getVertex(source)
        .getName()}→${graph.getVertex(target).getName()}`;

    let start = Date.now();

    const { previousEdges } = dijkstra(graph, source, distanceFunction);
    const pathEdges = [];

    while (target !== source) {
        pathEdges.unshift(previousEdges.get(target));
        target = previousEdges.get(target).source.id;

        if (!previousEdges.has(target)) {
            throw new Error("No Path Between source and target");
        }
    }

    return {
        duration: Date.now() - start,
        result: createPath(graph, pathEdges),
        method,
    };
};
