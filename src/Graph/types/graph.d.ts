import { Edge } from "./edge";
import { Vertex } from "./vertex";

export type Graph = {
    readonly getNumVertices: () => number;
    readonly getNumEdges: () => number;
    readonly addVertex: (name?: string) => Map<number, Vertex>;
    readonly removeVertex: (id: number) => Map<number, Vertex>;
    readonly getVertex: (id: number) => Vertex;
    readonly getVertices: () => Map<number, Vertex>;
    readonly getEdge: (source: number, target: number) => Edge;
    readonly addEdge: (
        source: number,
        target: number,
        weight?: number
    ) => number;
    readonly removeEdge: (source: number, target: number) => number;
    readonly getData: (key: string) => any;
    readonly getAllData: () => Map<string, any>;
    readonly addData: (key: string, data: any) => void;
    readonly clearData: () => void;
    readonly isDirected: () => boolean;
};
