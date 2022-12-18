import { Edge } from "../../types/edge";
import { Graph } from "../../types/graph";
import { Result } from "../../types/result";
import { Path } from "../../types/subgraph";
import { Vertex } from "../../types/vertex";
import { createPath } from "../path";

export const enumeratePaths = (
    graph: Graph,
    sourceID: number,
    targetID: number
): Result<Path[]> => {
    if (!graph.getVertices().has(sourceID)) {
        throw new Error("Source Vertex not found");
    } else if (!graph.getVertices().has(targetID)) {
        throw new Error("Target Vertex not found");
    }

    const start = Date.now();

    const vertexStack: Vertex[] = [graph.getVertex(sourceID)];
    const edgeStack: Edge[] = [];
    let back = false;
    const memo: Map<number, Edge[][]> = new Map();
    let val: Edge[][] = [];

    const inPath: Set<number> = new Set();
    const edges: Map<number, number[]> = new Map();
    for (const vertex of graph.getVertices().values()) {
        const e: number[] = [];

        for (const n of vertex.getEdges().keys()) {
            e.push(n);
        }

        edges.set(vertex.id, e);
    }

    while (vertexStack.length > 0) {
        const vertex = vertexStack.pop();
        const index = vertex.id;

        if (back) {
            if (memo.has(index)) {
                memo.get(index).push(...val);
            } else memo.set(index, [...val]);

            if (edges.get(index).length !== 0) {
                back = false;
                val = [];
            } else {
                if (edgeStack.length > 0) {
                    const edge = edgeStack.pop();
                    val = memo.get(index).map((edges) => [edge, ...edges]);
                    vertexStack.push(edge.source);
                } else val = memo.get(index);
                inPath.delete(index);
            }
        } else {
            inPath.add(index);

            if (
                memo.has(index) ||
                (index === targetID && inPath.size !== 1) ||
                graph.getVertex(index).getNumEdges() === 0
            ) {
                back = true;
                inPath.delete(index);

                if (index === targetID) {
                    if (edgeStack.length > 0) {
                        const edge = edgeStack.pop();
                        val = [[edge]];
                        vertexStack.push(edge.source);
                    } else val = [];
                } else if (memo.has(index)) {
                    memo.get(index).push(...val);
                    if (edgeStack.length > 0) {
                        const edge = edgeStack.pop();
                        val = memo.get(index).map((edges) => [edge, ...edges]);
                        vertexStack.push(edge.source);
                    } else val = memo.get(index);
                } else {
                    if (edgeStack.length > 0) {
                        const edge = edgeStack.pop();
                        vertexStack.push(edge.source);
                    }
                    memo.set(index, []);
                    val = [];
                }
            }
        }

        if (!back) {
            let edgeAdded = false;

            for (let i = 0; i < edges.get(index).length; i++) {
                const edge = graph.getEdge(index, edges.get(index)[i]);

                if (
                    !inPath.has(edge.target.id) ||
                    (sourceID === targetID && sourceID === edge.target.id)
                ) {
                    edgeAdded = true;
                    edges.get(index).splice(i, 1);
                    vertexStack.push(edge.target);
                    edgeStack.push(edge);
                    break;
                }
            }

            if (!edgeAdded) {
                back = true;
                if (!memo.has(index)) memo.set(index, []);
                if (edgeStack.length !== 0) {
                    const edge = edgeStack.pop();
                    val = memo.get(index).map((edges) => [edge, ...edges]);
                    vertexStack.push(edge.source);
                } else val = memo.get(index);
                inPath.delete(index);
            }
        }
    }

    const paths: Path[] = [];

    for (let i = 0; i < memo.get(sourceID).length; i++) {
        paths.push(createPath(graph, memo.get(sourceID)[i]));
    }

    return {
        duration: Date.now() - start,
        method: `Paths from ${graph.getVertex(sourceID).getName()}→${graph
            .getVertex(targetID)
            .getName()}`,
        result: paths,
    };
};

export const countPaths = (
    graph: Graph,
    sourceID: number,
    targetID: number
): Result<number> => {
    const enumerate = enumeratePaths(graph, sourceID, targetID);

    return {
        method: `Count paths from ${graph.getVertex(sourceID).getName()}→${graph
            .getVertex(targetID)
            .getName()}`,
        duration: enumerate.duration,
        result: enumerate.result.length,
    };
};
