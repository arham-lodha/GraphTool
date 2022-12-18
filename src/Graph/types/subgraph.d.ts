import { Edge } from "./edge";
import { Graph } from "./graph";
import { Vertex } from "./vertex";

export type Subgraph = {
    num_vertices: () => number;
    num_edges: () => number;
    getGraph: () => Graph;
    getVertices: () => Set<number>;
    hasVertex: (id: number) => boolean;
    hasEdge: (sourceID: number, targetID: number) => boolean;
    getVertex: (id: number) => Vertex;
    getEdge: (sourceID: number, targetID: number) => Edge;
    addVertex: (vertex: Vertex) => void;
    addEdge: (edge: Edge) => void;
    getEdges: () => Edge[];
};

export type Tree = Subgraph & {
    getHead: () => Vertex;
};

export type Path = Subgraph & {
    getHead: () => number;
    getTail: () => number;
    getLength: () => number;
    getEdgeFromSource: (sourceID: number) => Edge;
    isCyclic: () => boolean;
    toString: () => string;
};
