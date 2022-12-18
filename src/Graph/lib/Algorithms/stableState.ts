import { Graph } from "../../types/graph.js";
import { Result } from "../../types/result.js";

import { getNextState } from "./state.js";

export const getStableState = (
    graph: Graph,
    threshold = 0.001,
    alpha = 0.01,
    maxIterations = 100
): Result<Map<number, number>> => {
    const start = Date.now();
    let state: Map<number, number> = new Map();
    let sum = 0;

    for (const id of graph.getVertices().keys()) {
        const val = Math.random();
        sum += val;
        state.set(id, val);
    }

    if (sum === 0)
        return {
            duration: Date.now() - start,
            result: state,
            method: "Stable State",
        };

    for (const id of graph.getVertices().keys()) {
        state.set(id, (state.get(id) || 0) / sum);
    }

    let error = Infinity;

    for (let i = 0; i < maxIterations && error > threshold; i++) {
        const newState = getNextState(state, graph, alpha).result;
        error = 0;

        for (const id of newState.keys()) {
            sum += newState.get(id);
        }

        if (sum === 0)
            return {
                duration: Date.now() - start,
                result: state,
                method: "Stable State",
            };

        for (const id of newState.keys()) {
            state.set(id, newState.get(id) / sum);
        }

        for (const id of newState.keys()) {
            error += Math.pow(newState.get(id) - state.get(id), 2);
        }

        error = Math.sqrt(error);

        state = newState;

        sum = 0;
    }

    return {
        duration: Date.now() - start,
        result: state,
        method: "Stable State",
    };
};
