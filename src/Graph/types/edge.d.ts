import { Vertex } from './vertex';

export type Edge = {
  readonly source: Vertex;
  readonly target: Vertex;
  readonly weight: number;
  readonly setWeight: (weight: number) => number;
  readonly data: { readonly [key: string]: any };
  readonly getData: (key: string) => any;
  readonly setData: (data: { readonly [key: string]: any }) => {
    readonly [key: string]: any;
  };
  readonly addData: (
    key: string,
    value: any
  ) => {
    readonly [key: string]: any;
  };
  readonly getAdjustedWeight: () => number;
};
