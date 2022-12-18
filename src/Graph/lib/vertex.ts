import { Edge } from "../types/edge.js";
import { Vertex } from "../types/vertex.js";

export const createVertex = (id: number, name = `Vertex ${id}`): Vertex => {
    let edges: Map<number, Edge> = new Map();
    let sumWeight = 0;

    const getEdge = (target: number): Edge => {
        if (!edges.has(target))
            throw new Error("Vertex doesn't contain an edge to this target");
        return edges.get(target);
    };

    const removeEdge = (target: number): number => {
        if (!edges.has(target)) {
            throw new Error("Vertex doesn't contain an edge to this target");
        }

        edges.delete(target);
        return edges.size;
    };

    const getEdges = (): Map<number, Edge> => edges;

    const data = new Map<string, any>();

    return {
        id,
        setID: (n: number) => {
            id = n;
        },
        getName: () => name,
        getNumEdges: () => edges.size,
        getEdges,
        removeAllEdges: () => {
            edges = new Map();
        },
        addEdge: (edge: Edge) => {
            edges.set(edge.target.id, edge);
            sumWeight += edge.weight;
            return edges.size;
        },
        hasEdge: (target: number) => edges.has(target),
        getEdge,
        removeEdge,
        getData: (key: string) => data.get(key),
        getAllData: () => data,
        addData: (key: string, value: any) => {
            data.set(key, value);
        },
        getSumWeight: () => sumWeight,
        clearData: () => {
            data.clear();
        },
    };
};
