import { useGraph } from "../util/graphContext";

export const LayoutEditor = (props: {}) => {
    const [{}, { resetRender }] = useGraph();
    return (
        <details class="open:bg-slate-700 open:ring-1 open:ring-black open:shadow-lg open:rounded-sm pl-4 py-4 mt-3 w-11/12">
            <summary class="text-lg font-bold pb-3">Layout Editor</summary>
            <div class="m-4">
                <button
                    onClick={() => {
                        resetRender();
                    }}
                    class="bg-slate-800 rounded-md p-2"
                >
                    Reset Graph Visualization
                </button>
            </div>
        </details>
    );
};
