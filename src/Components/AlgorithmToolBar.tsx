import {
    Accessor,
    For,
    Setter,
    Show,
    createEffect,
    createSignal,
} from "solid-js";
import { minSpanningTree } from "../Graph/lib/Algorithms/minSpanningTree";
import { shortestPath } from "../Graph/lib/Algorithms/shortestPath";
import { useGraph } from "../util/graphContext";
import { subgraphArrayColor, subgraphColor } from "./subgraphColor";
import { countPaths, enumeratePaths } from "../Graph/lib/Algorithms/paths";
import { Path } from "../Graph/types/subgraph";

export const ShortestPath = (props: {}) => {
    const [{ graph }, { setColor }] = useGraph();
    const [pastResults, setPastResults]: [
        Accessor<{ method: string; result: any; duration: number }[]>,
        Setter<{ method: string; result: any; duration: number }[]>
    ] = createSignal([]);
    let e1;
    let e2;

    const onClick = () => {
        let s = parseInt(e1.value);
        let t = parseInt(e2.value);
        try {
            let { method, result, duration } = shortestPath(
                graph().graph,
                s,
                t
            );
            setColor(subgraphColor(graph().graph, result));
            setPastResults([...pastResults(), { method, result, duration }]);
        } catch (error) {
            setPastResults([
                ...pastResults(),
                {
                    method: `Shortest Path from ${graph()
                        .graph.getVertex(s)
                        .getName()}→${graph().graph.getVertex(t).getName()}`,
                    result: "No Paths Exist",
                    duration: 0,
                },
            ]);
        }
    };

    createEffect(() => {
        graph();
        setPastResults([]);
    });

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Shortest Path</summary>
            <div class="m-4 flex flex-col gap-3">
                <div class="flex flex-row justify-center gap-2">
                    <select
                        ref={e1}
                        class="form-select appearance-none
                            block
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700
                            focus:bg-white 
                            focus:border-blue-600 
                            focus:outline-none"
                    >
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <option value={vertex.id}>
                                    {vertex.getName()}
                                </option>
                            )}
                        </For>
                    </select>
                    <p>→</p>
                    <select
                        ref={e2}
                        class="form-select appearance-none
                                block
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700
                                focus:bg-white 
                                focus:border-blue-600 
                                focus:outline-none"
                        aria-label="Default select example"
                    >
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <option value={vertex.id}>
                                    {vertex.getName()}
                                </option>
                            )}
                        </For>
                    </select>
                </div>

                <button
                    class="bg-slate-700 rounded-md p-2 mx-2"
                    onClick={onClick}
                >
                    Find Shortest Path
                </button>
                <Show when={pastResults().length !== 0}>
                    <details class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
                        <div class="m-4">
                            <For each={pastResults()}>
                                {(data: {
                                    method: string;
                                    result: any;
                                    duration: number;
                                }) => (
                                    <div>
                                        <p>{data.method}</p>
                                        <div class="m-3">
                                            <p>
                                                Result: {data.result.toString()}
                                            </p>
                                            <p>Duration: {data.duration}</p>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </details>
                </Show>
            </div>
        </details>
    );
};

export const MinSpanningTree = (props: {}) => {
    const [{ graph }, { setColor }] = useGraph();
    let e1;

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">
                Minimum Spanning Tree
            </summary>
            <div class="m-4 flex flex-col gap-3">
                <div class="flex flex-row justify-center gap-2">
                    <select
                        ref={e1}
                        class="form-select appearance-none
                            block
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700
                            focus:bg-white 
                            focus:border-blue-600 
                            focus:outline-none"
                    >
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <option value={vertex.id}>
                                    {vertex.getName()}
                                </option>
                            )}
                        </For>
                    </select>
                </div>

                <button
                    class="bg-slate-700 rounded-md p-2 mx-2"
                    onClick={(e) => {
                        try {
                            let s = parseInt(e1.value);
                            const tree = minSpanningTree(
                                graph().graph,
                                s
                            ).result;
                            setColor(subgraphColor(graph().graph, tree));
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    Create Minimum Spanning Tree
                </button>
            </div>
        </details>
    );
};

export const CountPathsToTarget = (props: {}) => {
    const [{ graph }, { setColor }] = useGraph();
    const [pastResults, setPastResults]: [
        Accessor<{ method: string; result: any; duration: number }[]>,
        Setter<{ method: string; result: any; duration: number }[]>
    ] = createSignal([]);
    let e1;
    let e2;

    const onClick = (e) => {
        let source = parseInt(e1.value);
        let target = parseInt(e2.value);
        const { result, method, duration } = enumeratePaths(
            graph().graph,
            source,
            target
        );
        setPastResults([...pastResults(), { result, method, duration }]);
        setColor(subgraphArrayColor(graph().graph, result));
    };

    createEffect(() => {
        graph();
        setPastResults([]);
    });

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Paths</summary>
            <div class="m-4 flex flex-col gap-3">
                <div class="flex flex-row justify-center gap-2">
                    <select
                        ref={e1}
                        class="form-select appearance-none
                            block
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700
                            focus:bg-white 
                            focus:border-blue-600 
                            focus:outline-none"
                    >
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <option value={vertex.id}>
                                    {vertex.getName()}
                                </option>
                            )}
                        </For>
                    </select>
                    <p>→</p>
                    <select
                        ref={e2}
                        class="form-select appearance-none
                                block
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700
                                focus:bg-white 
                                focus:border-blue-600 
                                focus:outline-none"
                        aria-label="Default select example"
                    >
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <option value={vertex.id}>
                                    {vertex.getName()}
                                </option>
                            )}
                        </For>
                    </select>
                </div>

                <button
                    class="bg-slate-700 rounded-md p-2 mx-2"
                    onClick={onClick}
                >
                    Count Paths
                </button>
                <Show when={pastResults().length !== 0}>
                    <details class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-{12/13}">
                        <For each={pastResults()}>
                            {(data: {
                                method: string;
                                result: any;
                                duration: number;
                            }) => (
                                <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12 ">
                                    <summary>{data.method}</summary>
                                    <div class="m-3">
                                        <p>
                                            Result:
                                            <Show
                                                when={
                                                    typeof data.result !==
                                                    "string"
                                                }
                                                fallback={
                                                    <p>
                                                        {data.result.toString()}
                                                    </p>
                                                }
                                            >
                                                <div class="m-2 p-2">
                                                    <For each={data.result}>
                                                        {(r: Path) => (
                                                            <p class="overflow-x-scroll whitespace-nowrap">
                                                                {r.toString()}
                                                            </p>
                                                        )}
                                                    </For>
                                                </div>
                                            </Show>
                                        </p>
                                        <p>Duration: {data.duration}</p>
                                    </div>
                                </details>
                            )}
                        </For>
                    </details>
                </Show>
            </div>
        </details>
    );
};

export const AlgorithmToolbar = (props: {}) => {
    return (
        <details class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Algorithm Toolbar</summary>
            <div class="m-4">
                <ShortestPath></ShortestPath>
                <MinSpanningTree></MinSpanningTree>
                <CountPathsToTarget></CountPathsToTarget>
            </div>
        </details>
    );
};
