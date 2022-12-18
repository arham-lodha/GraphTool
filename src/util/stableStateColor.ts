import chroma from "chroma-js";
import { getStableState } from "../Graph/lib/Algorithms/stableState";
import { Graph } from "../Graph/types/graph";

export const stableStateColor = (
    graph: Graph,
    vcolor1 = "pink",
    vcolor2 = "cyan",
    ecolor1 = "red",
    ecolor2 = "yellow"
) => {
    let stableState: Map<number, number>;

    console.log("Graph has stableState", graph.getAllData().has("stableState"));

    if (graph.getAllData().has("stableState")) {
        stableState = graph.getData("stableState");
    } else {
        stableState = getStableState(graph).result;
        graph.addData("stableState", stableState);
    }

    console.log("Stable State", stableState);

    const maxState = Math.max(...stableState.values()) || 1;

    const nodes: Map<number, string> = new Map();
    const edges: Map<number, Map<number, string>> = new Map();

    const nodeScale = chroma.scale([vcolor1, vcolor2]).mode("lch");
    const edgesScale = chroma.scale([ecolor1, ecolor2]).mode("lch");

    for (const vertex of graph.getVertices().values()) {
        nodes.set(
            vertex.id,
            nodeScale((stableState.get(vertex.id) || 0) / maxState).hex()
        );
        edges.set(vertex.id, new Map());

        for (const edge of vertex.getEdges().values()) {
            edges
                .get(vertex.id)
                ?.set(
                    edge.target.id,
                    edgesScale(edge.getAdjustedWeight()).hex()
                );
        }
    }

    console.log({ nodes, edges });

    return {
        nodes,
        edges,
    };
};
