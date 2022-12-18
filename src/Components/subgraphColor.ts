import { Graph } from "../Graph/types/graph";
import { Subgraph } from "../Graph/types/subgraph";
import { Vertex } from "../Graph/types/vertex";

export const subgraphColor = (graph: Graph, subgraph: Subgraph) => {
    const nodes: Map<number, string> = new Map();
    const edges: Map<number, Map<number, string>> = new Map();

    for (const vertex of graph.getVertices().values()) {
        nodes.set(vertex.id, "#808080");
        edges.set(vertex.id, new Map());

        for (const e of vertex.getEdges().values()) {
            edges.get(e.source.id)?.set(e.target.id, "#808080");
        }
    }

    for (const vertex of subgraph.getVertices().values()) {
        nodes.set(vertex, "#FF0000");
    }

    for (const edge of subgraph.getEdges()) {
        if (edge) {
            edges.get(edge.source.id)?.set(edge.target.id, "#FFFF00");
        }
    }

    return {
        nodes,
        edges,
    };
};

export const subgraphArrayColor = (graph: Graph, array: Subgraph[]) => {
    const nodes: Map<number, string> = new Map();
    const edges: Map<number, Map<number, string>> = new Map();

    for (const vertex of graph.getVertices().values()) {
        nodes.set(vertex.id, "#808080");
        edges.set(vertex.id, new Map());

        for (const e of vertex.getEdges().values()) {
            edges.get(e.source.id)?.set(e.target.id, "#808080");
        }
    }

    for (const subgraph of array) {
        for (const vertex of subgraph.getVertices().values()) {
            nodes.set(vertex, "#FF0000");
        }

        for (const edge of subgraph.getEdges()) {
            if (edge) {
                edges.get(edge.source.id)?.set(edge.target.id, "#FFFF00");
            }
        }
    }

    return {
        nodes,
        edges,
    };
};
