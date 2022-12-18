import { Edge } from "../types/edge";
import { Graph } from "../types/graph";
import { Tree } from "../types/subgraph";
import { Vertex } from "../types/vertex";

/**

This function creates a tree subgraph based on the provided Graph.
@param {Graph} graph - The original graph to create the tree from.
@param {Vertex} head - The starting vertex of the tree.
@param {Map<number, Map<number, Edge>>} tree - The tree represented as a map of vertex IDs to maps of target vertex IDs to edges.
@throws {Error} - If the given map does not contain the head vertex, if the source vertex of an edge in the map does not match the key of the outer map, or if the target vertex of an edge does not exist in the tree.
@throws {Error} - If there are any unconnected vertices or if the tree is cyclic
@return {Tree} - The created tree.
*/
export const createTree = (
    graph: Graph,
    head: Vertex,
    tree: Map<number, Map<number, Edge>>
): Tree => {
    if (!tree.has(head.id)) {
        throw new Error("Given Map must contain head");
    }

    let num_vertices = tree.size;
    let num_edges = 0;
    const headID = head.id;

    const vertices: Set<number> = new Set(tree.keys());

    for (const entries of tree.entries()) {
        for (const edge of entries[1].values()) {
            console.log(edge);
            num_edges++;
            if (edge.source.id !== entries[0]) {
                throw new Error("Source Vertex mismatch");
            } else if (!vertices.has(edge.target.id)) {
                throw new Error("Target Vertex doesn't exist in tree");
            }
        }
    }

    const isCyclic = () => {
        const stack = [headID];
        const seen: Set<number> = new Set();

        while (stack.length !== 0) {
            const id = stack.shift();
            seen.add(id);

            const edges = tree.get(id).values();
            for (const edge of edges) {
                if (seen.has(edge.target.id)) {
                    return true;
                }
            }
        }

        return false;
    };

    const checkConnected = () => {
        const seen: Set<number> = new Set();

        for (const edgeMap of tree.values()) {
            for (const edge of edgeMap.values()) {
                if (!seen.has(edge.target.id)) seen.add(edge.target.id);
            }
        }

        return seen.size === num_vertices - 1;
    };

    if (isCyclic()) {
        throw new Error(
            "Tree is cyclic. Please form a subgraph data structure instead.Please form a subgraph data structure instead."
        );
    } else if (!checkConnected()) {
        throw new Error(
            "Tree is not connected. Please form a subgraph data structure instead."
        );
    }

    return {
        num_vertices: () => num_vertices,
        num_edges: () => num_edges,
        getGraph: () => graph,
        getVertices: () => vertices,
        hasVertex: (id: number) => vertices.has(id),
        hasEdge: (sourceID: number, targetID: number) =>
            vertices.has(sourceID) && tree.get(sourceID).has(targetID),
        getVertex: (id: number) => {
            if (!vertices.has(id)) {
                throw new Error(
                    "Subgraph doesn't include a source vertex with that ID."
                );
            }

            return graph.getVertex(id);
        },
        getEdge: (sourceID: number, targetID: number) => {
            if (!vertices.has(sourceID)) {
                throw new Error(
                    "Subgraph doesn't include a source vertex with that ID."
                );
            } else if (!vertices.has(targetID)) {
                throw new Error(
                    "Subgraph doesn't include a target vertex with that ID."
                );
            }

            return tree.get(sourceID).get(targetID);
        },
        addVertex: (vertex: Vertex) => {
            for (const entry of tree.entries()) {
                if (
                    entry[1].size === 0 &&
                    graph.getVertex(entry[0]).hasEdge(vertex.id)
                ) {
                    tree.get(entry[0]).set(
                        vertex.id,
                        graph.getVertex(entry[0]).getEdge(vertex.id)
                    );
                    vertices.add(vertex.id);
                    tree.set(vertex.id, new Map());
                    num_vertices++;
                    if (isCyclic()) {
                        throw new Error(
                            "Tree is cyclic. Please form a subgraph data structure instead.Please form a subgraph data structure instead."
                        );
                    } else if (!checkConnected()) {
                        throw new Error(
                            "Tree is not connected. Please form a subgraph data structure instead."
                        );
                    }
                    return;
                }
            }

            throw new Error("No leaf has a outgoing edge to the given vertex");
        },
        addEdge: (edge: Edge) => {
            if (!vertices.has(edge.source.id)) {
                throw new Error(
                    "Subgraph doesn't include a source vertex with that ID."
                );
            } else if (!vertices.has(edge.target.id)) {
                vertices.add(edge.target.id);
            }

            num_edges++;
            tree.get(edge.source.id).set(edge.target.id, edge);

            if (isCyclic()) {
                throw new Error(
                    "Tree is cyclic. Please form a subgraph data structure instead.Please form a subgraph data structure instead."
                );
            } else if (!checkConnected()) {
                throw new Error(
                    "Tree is not connected. Please form a subgraph data structure instead."
                );
            }
        },
        getHead: () => graph.getVertex(headID),
        getEdges: () => {
            let result: Edge[] = [];
            for (const e of tree.values()) {
                if (e) {
                    result.push(...Array.from(e.values()));
                }
            }
            return result;
        },
    };
};
