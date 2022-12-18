import { Edge } from "../../types/edge";
import { Graph } from "../../types/graph";
import { Result } from "../../types/result";
import { Tree } from "../../types/subgraph";
import { createTree } from "../tree";

import { dijkstra } from "./shortestPath";

export const minSpanningTree = (
    graph: Graph,
    source: number,
    distanceFunction: (e: Edge) => number = (e) => e.weight
): Result<Tree> => {
    if (!graph.getVertices().has(source)) {
        throw new Error("Source vertex doesn't exist in graph data structure");
    }

    const start = Date.now();

    const { previousEdges } = dijkstra(graph, source, distanceFunction);

    const tree: Map<number, Map<number, Edge>> = new Map();

    for (const edge of previousEdges.values()) {
        if (edge) {
            if (!tree.has(edge.source.id)) {
                tree.set(edge.source.id, new Map());
            }

            if (!tree.has(edge.target.id)) {
                tree.set(edge.target.id, new Map());
            }

            tree.get(edge.source.id).set(edge.target.id, edge);
        }
    }

    return {
        duration: Date.now() - start,
        result: createTree(graph, graph.getVertex(source), tree),
        method: "Min Spanning Tree",
    };
};
