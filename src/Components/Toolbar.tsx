import { useGraph } from "../util/graphContext";
import { AlgorithmToolbar } from "./AlgorithmToolBar";
import { GraphDetails } from "./GraphDetails";
import { GraphEditor } from "./GraphEditor";
import { LayoutEditor } from "./LayoutEditor";

export const Toolbar = (props: any) => {
    const [
        { graph },
        { addVertex, addEdge, removeVertex, removeEdge, addData },
    ] = useGraph();

    return (
        <div>
            <h1 class="text-2xl font-extrabold">Graph Toolkit</h1>
            <GraphDetails></GraphDetails>
            <GraphEditor></GraphEditor>
            <AlgorithmToolbar></AlgorithmToolbar>
            <LayoutEditor></LayoutEditor>
        </div>
    );
};
