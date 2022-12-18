import { For, Show, createSignal } from "solid-js";
import { useGraph } from "../util/graphContext";
import { Vertex } from "../Graph/types/vertex";

const AddVertex = (props: {}) => {
    const [{}, { addVertex }] = useGraph();
    let input;

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Add Vertex</summary>
            <div class="m-4 flex-col">
                <input
                    placeholder="Vertex Name"
                    ref={input}
                    class="text-black rounded-md p-2 mx-2"
                />{" "}
                <button
                    class="bg-slate-700 rounded-md p-2 m-1"
                    onClick={(e) => {
                        if (!input.value.trim()) addVertex();
                        else addVertex(input.value.trim());
                        input.value = "";
                    }}
                >
                    Add Vertex
                </button>
            </div>
        </details>
    );
};

const AddEdge = (props: {}) => {
    const [{ graph }, { addEdge }] = useGraph();
    let e1;
    let e2;
    let input;

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Add Edge</summary>
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
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                <div class="flex flex-row w-full justify-center">
                    <label for="weightEditor">Weight: </label>
                    <input
                        id="weightEditor"
                        placeholder="1"
                        class="text-black rounded-md p-2 mx-2"
                        type="number"
                        min="1"
                        max="5"
                        ref={input}
                    />
                </div>
                <button
                    class="bg-slate-700 rounded-md p-2 mx-2"
                    onClick={(e) => {
                        addEdge(
                            parseInt(e1.value),
                            parseInt(e2.value),
                            parseFloat(input.value)
                        );
                    }}
                >
                    Add Edge
                </button>
            </div>
        </details>
    );
};

const RemoveVertex = (props: {}) => {
    const [{ graph }, { removeVertex }] = useGraph();
    let input;

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Remove Vertex</summary>
            <div class="m-4 flex flex-col gap-3">
                <select
                    ref={input}
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
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                    <For
                        each={Array.from(graph().graph.getVertices().values())}
                    >
                        {(vertex: Vertex) => (
                            <option value={vertex.id}>
                                {vertex.getName()}
                            </option>
                        )}
                    </For>
                </select>
                <button
                    class="bg-slate-700 rounded-md p-2 m-1"
                    onClick={() => {
                        removeVertex(parseInt(input.value));
                    }}
                >
                    Remove Vertex
                </button>
            </div>
        </details>
    );
};

const RemoveEdge = (props: {}) => {
    const [{ graph }, { removeEdge }] = useGraph();
    let e1;
    let e2;

    return (
        <details class="open:bg-slate-800 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Remove Edge</summary>
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
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                        <For
                            each={Array.from(
                                graph().graph.getVertices().values()
                            )}
                        >
                            {(vertex: Vertex) => (
                                <For
                                    each={Array.from(
                                        vertex.getEdges().values()
                                    )}
                                >
                                    {(edge) => (
                                        <option
                                            value={`${edge.source.id}→${edge.target.id}`}
                                        >
                                            {`${edge.source.getName()}→${edge.target.getName()}`}
                                        </option>
                                    )}
                                </For>
                            )}
                        </For>
                    </select>
                </div>
                <button
                    class="bg-slate-700 rounded-md p-2 mx-2"
                    onClick={(e) => {
                        const arr = e1.value.split("→");
                        removeEdge(parseInt(arr[0]), parseInt(arr[1]));
                        e1.remove(e1.selectedIndex);
                    }}
                >
                    Remove Edge
                </button>
            </div>
        </details>
    );
};

export const GraphEditor = (props: {}) => {
    const [{ graph }] = useGraph();
    return (
        <details class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Graph Editor</summary>
            <div class="m-4">
                <AddVertex></AddVertex>
                <Show when={graph().graph.getNumVertices() !== 0}>
                    <AddEdge></AddEdge>
                </Show>
                <Show when={graph().graph.getNumVertices !== 0}>
                    <RemoveVertex></RemoveVertex>
                </Show>
                <Show when={graph().graph.getNumEdges() !== 0}>
                    <RemoveEdge></RemoveEdge>
                </Show>
            </div>
        </details>
    );
};
