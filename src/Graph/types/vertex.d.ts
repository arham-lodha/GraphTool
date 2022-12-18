import { Edge } from './edge';

export type Vertex = {
  readonly id: number;
  readonly setID: (id: number) => void;
  readonly getName: () => string;
  readonly getNumEdges: () => number;
  readonly getSumWeight: () => number;
  readonly addEdge: (edge: Edge) => number;
  readonly removeEdge: (source: number) => number;
  readonly getAllData: () => Map<string, any>;
  readonly getData: (key: string) => any;
  readonly addData: (key: string, value: any) => void;
  readonly clearData: () => void;
  readonly removeAllEdges: () => void;
  readonly getEdges: () => Map<number, Edge>;
  readonly getEdge: (target: number) => Edge | undefined;
  readonly hasEdge: (target: number) => boolean;
};
