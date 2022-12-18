import { Edge } from '../types/edge';
import { Vertex } from '../types/vertex';

export const createEdge = (
  source: Vertex,
  target: Vertex,
  weight = 1,
  data: { [key: string]: any } = {}
): Edge => {
  return {
    source,
    target,
    weight,
    data,
    getData: (key: string) => data[key],
    setWeight: (weight: number) => weight,
    setData: (data: { [key: string]: any }) => data,
    addData: (key: string, value: any) => {
      data[key] = value;
      return data;
    },
    getAdjustedWeight: () => weight / source.getSumWeight(),
  };
};
