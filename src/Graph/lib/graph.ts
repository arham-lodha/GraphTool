import { Edge } from "../types/edge.js";
import { Graph } from "../types/graph.js";
import { Vertex } from "../types/vertex.js";

import { createEdge } from "./edge.js";
import { createVertex } from "./vertex.js";

/**
Creates a graph data structure.
@returns {Graph} An object representing the graph, with functions for
adding and removing vertices and edges, and querying information about the
graph.
*/
export const createGraph = (): Graph => {
    let num_edges = 0;
    let num_vertices = 0;

    let cVertexID = 0;

    const vertices: Map<number, Vertex> = new Map();

    const data = new Map<string, Vertex>();

    const addVertex = (name = `Vertex ${cVertexID}`): Map<number, Vertex> => {
        vertices.set(cVertexID, createVertex(cVertexID, name));
        cVertexID++;
        num_vertices++;
        return vertices;
    };

    const removeVertex = (id: number): Map<number, Vertex> => {
        num_edges -= vertices.get(id)?.getNumEdges() || 0;
        vertices.delete(id);

        for (const vertex of vertices.values()) {
            if (vertex.hasEdge(id)) {
                vertex.removeEdge(id);
                num_edges--;
            }
        }

        num_vertices--;

        return vertices;
    };

    const addEdge = (source: number, target: number, weight = 1): number => {
        const edge = createEdge(
            vertices.get(source),
            vertices.get(target),
            weight
        );

        vertices.get(source).addEdge(edge);
        num_edges++;
        return num_edges;
    };

    const removeEdge = (source: number, target: number): number => {
        vertices.get(source).removeEdge(target);
        num_edges--;
        return num_edges;
    };

    return {
        getNumEdges: () => num_edges,
        getNumVertices: () => num_vertices,
        getVertex: (id: number): Vertex => vertices.get(id),
        getVertices: () => vertices,
        addVertex,
        removeVertex,
        getEdge: (source, target): Edge => vertices.get(source).getEdge(target),
        addEdge,
        removeEdge,
        getData: (key: string) => data.get(key),
        addData: (key: string, value: any) => {
            data.set(key, value);
            return data;
        },
        clearData: () => {
            data.clear();
            for (const vertex of vertices.values()) {
                vertex.clearData();
            }
        },
        getAllData: () => data,
        isDirected: () => true,
    };
};

/**

Creates a directed graph data structure.
@returns {Graph} An object representing the graph, with functions for
adding and removing vertices and edges, and querying information about the
graph. Edges in a directed graph have a direction and can only be traversed
in that direction.
*/
export const createDirectedGraph = (): Graph => {
    return createGraph();
};

/**

Creates an undirected graph data structure.
@returns {Graph} An object representing the graph, with functions for
adding and removing vertices and edges, and querying information about the
graph. Edges in an undirected graph do not have a direction and can be
traversed in either direction.
*/
export const createUndirectedGraph = (): Graph => {
    let num_edges = 0;
    let num_vertices = 0;

    let cVertexID = 0;

    const vertices: Map<number, Vertex> = new Map();

    const data = new Map<string, Vertex>();

    const addVertex = (name = `Vertex ${cVertexID}`): Map<number, Vertex> => {
        vertices.set(cVertexID, createVertex(cVertexID, name));
        cVertexID++;
        num_vertices++;
        return vertices;
    };

    const removeVertex = (id: number): Map<number, Vertex> => {
        vertices.delete(id);
        num_vertices--;

        return vertices;
    };

    const addEdge = (vertexA: number, vertexB: number, weight = 1): number => {
        const edge = createEdge(
            vertices.get(vertexA),
            vertices.get(vertexB),
            weight
        );
        vertices.get(vertexA).addEdge(edge);
        vertices.get(vertexB).addEdge(edge);
        num_edges += 2;
        return num_edges;
    };

    const removeEdge = (vertexA: number, vertexB: number): number => {
        vertices.get(vertexA).removeEdge(vertexB);
        vertices.get(vertexB).removeEdge(vertexA);
        num_edges--;
        return num_edges;
    };

    return {
        getNumEdges: () => num_edges,
        getNumVertices: () => num_vertices,
        getVertex: (id: number): Vertex => vertices.get(id),
        getVertices: () => vertices,
        addVertex,
        removeVertex,
        getEdge: (source, target): Edge => vertices.get(source).getEdge(target),
        addEdge,
        removeEdge,
        getData: (key: string) => data.get(key),
        addData: (key: string, value: any) => {
            data.set(key, value);
            return data;
        },
        clearData: () => {
            data.clear();
        },
        getAllData: () => data,
        isDirected: () => false,
    };
};
