import { Edge } from "../types/edge";
import { Graph } from "../types/graph";
import { Subgraph } from "../types/subgraph";
import { Vertex } from "../types/vertex";

export const createSubgraph = (
    graph: Graph,
    vertices: Set<number> = new Set()
): Subgraph => {
    let num_edges = 0;
    let num_vertices = vertices.size;

    const edges: Map<number, Map<number, Edge>> = new Map();

    for (const [id, vertex] of graph.getVertices().entries()) {
        if (vertices.has(id)) {
            edges.set(id, new Map());

            for (const [tID, edge] of vertex.getEdges().entries()) {
                if (vertices.has(tID)) edges.get(id).set(tID, edge);
            }
        }
    }

    return {
        num_vertices: () => num_vertices,
        num_edges: () => num_edges,
        getGraph: () => graph,
        getVertices: () => vertices,
        hasVertex: (id: number) => vertices.has(id),
        hasEdge: (sourceID: number, targetID: number) =>
            vertices.has(sourceID) && edges.get(sourceID).has(targetID),
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

            return edges.get(sourceID).get(targetID);
        },
        addVertex: (vertex: Vertex) => {
            vertices.add(vertex.id);
            edges.set(vertex.id, new Map());
            num_vertices++;
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
            edges.get(edge.source.id).set(edge.target.id, edge);
        },
        getEdges: () => {
            let result: Edge[] = [];
            for (const e of edges.values()) {
                result.push(...Array.from(e.values()));
            }
            return result;
        },
    };
};
