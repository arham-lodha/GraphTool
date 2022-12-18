import { Accessor, For, Show, createEffect } from "solid-js";
import { useGraph } from "../util/graphContext";
import { Graph } from "../Graph/types/graph";
import { Vertex } from "../Graph/types/vertex";
import { getStableState } from "../Graph/lib/Algorithms/stableState";

const VertexDetails = (props: { vertex: Vertex }) => {
    const [{ graph }, { addData }] = useGraph();

    let stableState = 0;

    if (graph().graph.getAllData().has("stableState")) {
        stableState = graph().graph.getData("stableState").get(props.vertex.id);
    } else {
        const state = getStableState(graph().graph);
        addData("stableState", state.result);
        stableState = state.result.get(props.vertex.id) || 0;
    }

    return (
        <div>
            <details
                id={`n${props.vertex.id}-details`}
                class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-3 py-3 overflow-x-scroll my-1  w-11/12"
            >
                <summary>{props.vertex.getName()}</summary>
                <div class="m-4">
                    <p>
                        Number of Edges:{" "}
                        {graph().graph.getVertex(props.vertex.id).getNumEdges()}
                    </p>
                    <p>
                        Stable State Probability:{" "}
                        {Math.round(stableState * 100) / 100}
                    </p>
                    <Show
                        when={
                            graph()
                                .graph.getVertex(props.vertex.id)
                                .getNumEdges() !== 0
                        }
                    >
                        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-3 py-3 overflow-x-scroll my-1 w-11/12">
                            <summary>Edges</summary>
                            <div class="m-4 grid grid-cols-1 gap-2 w-11/12">
                                <For
                                    each={Array.from(
                                        props.vertex.getEdges().values()
                                    )}
                                >
                                    {(edge) => {
                                        const onClick = () => {
                                            //@ts-ignore
                                            document.getElementById(
                                                "edgesDetails"
                                            ).open = true;
                                            //@ts-ignore
                                            document.getElementById(
                                                `n${edge.source.id}-n${edge.target.id}-details`
                                            ).open = true;

                                            document
                                                .getElementById(
                                                    `n${edge.source.id}-n${edge.target.id}-details`
                                                )
                                                ?.scrollIntoView();
                                        };
                                        return (
                                            <button
                                                onClick={onClick}
                                                class="bg-slate-700 rounded-md p-2"
                                            >
                                                {edge.source.getName()}→
                                                {edge.target.getName()}
                                            </button>
                                        );
                                    }}
                                </For>
                            </div>
                        </details>
                    </Show>
                    <Show
                        when={
                            graph()
                                .graph.getVertex(props.vertex.id)
                                .getAllData().size !== 0
                        }
                    >
                        <details
                            id={`n${props.vertex.id}-data`}
                            class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-3 py-3 overflow-x-scroll my-1  w-11/12"
                        >
                            <summary>Data</summary>
                            <div class="m-4">
                                <For
                                    each={Array.from(
                                        graph()
                                            .graph.getVertex(props.vertex.id)
                                            .getAllData()
                                            .entries()
                                    )}
                                >
                                    {([key, data]) => (
                                        <p>
                                            {key}: {data.toString()}
                                        </p>
                                    )}
                                </For>
                            </div>
                        </details>
                    </Show>
                </div>
            </details>
        </div>
    );
};

const VertexEdgeDetail = (props: { vertex: Vertex }) => {
    return (
        <For each={Array.from(props.vertex.getEdges().values())}>
            {(edge) => {
                const source = () => {
                    //@ts-ignore
                    document.getElementById("verticesDetails").open = true;
                    //@ts-ignore
                    document.getElementById(`n${edge.source.id}-details`).open =
                        true;
                    //@ts-ignore
                    document
                        .getElementById(`n${edge.source.id}-details`)
                        .scrollIntoView();
                };

                const target = () => {
                    //@ts-ignore
                    document.getElementById("verticesDetails").open = true;
                    //@ts-ignore
                    document.getElementById(`n${edge.target.id}-details`).open =
                        true;
                    //@ts-ignore
                    document
                        .getElementById(`n${edge.target.id}-details`)
                        .scrollIntoView();
                };

                return (
                    <details
                        id={`n${edge.source.id}-n${edge.target.id}-details`}
                        class="open:bg-slate-700 
                        open:ring-1 
                        open:ring-black
                        open:shadow-lg 
                        open:rounded-sm 
                        pl-3 
                        py-3 
                        overflow-x-scroll 
                        my-1
                        w-11/12"
                    >
                        <summary>
                            {edge.source.getName()} → {edge.target.getName()}
                        </summary>
                        <p>Weight: {edge.weight}</p>
                        <p>Adjusted Weight: {edge.getAdjustedWeight()}</p>
                        <p>
                            Source:
                            <button
                                class="bg-slate-800 rounded-md p-2 m-1"
                                onClick={source}
                            >
                                {edge.source.getName()}
                            </button>
                        </p>
                        <p>
                            Target:
                            <button
                                class="bg-slate-800 rounded-md p-2 m-1"
                                onClick={target}
                            >
                                {edge.target.getName()}
                            </button>
                        </p>
                    </details>
                );
            }}
        </For>
    );
};

export const GraphDetails = (props: any) => {
    const [{ graph }]: [Accessor<{ graph: Graph }>] = useGraph();

    return (
        <details class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3">
            <summary class="text-lg font-bold pb-3">Graph Details</summary>
            <p>Number of Vertices: {graph().graph.getNumVertices()}</p>
            <p>Number of Edges: {graph().graph.getNumEdges()}</p>
            <Show when={graph().graph.getNumVertices() !== 0}>
                <details
                    id="verticesDetails"
                    class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-3 py-3 w-11/12 max-w-[11/12] overflow-x-scroll my-3"
                >
                    <summary class="font-bold">Vertices</summary>
                    <div class="mx-4">
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <VertexDetails vertex={vertex}></VertexDetails>
                            )}
                        </For>
                    </div>
                </details>
                <details
                    id="edgesDetails"
                    class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-3 py-3 w-11/12 max-w-[11/12] overflow-x-scroll my-3"
                >
                    <summary class="font-bold">Edges</summary>
                    <div class="mx-4">
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <VertexEdgeDetail
                                    vertex={vertex}
                                ></VertexEdgeDetail>
                            )}
                        </For>
                    </div>
                </details>
            </Show>
        </details>
    );
};
