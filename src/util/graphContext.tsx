import {
    Accessor,
    createContext,
    createSignal,
    JSX,
    Setter,
    useContext,
} from "solid-js";
import { createGraph } from "../Graph/lib/graph";
import { Graph } from "../Graph/types/graph";
import { stableStateColor } from "./stableStateColor";

const GraphContext = createContext();

const defaultGraph = createGraph();

defaultGraph.addVertex();
defaultGraph.addVertex();
defaultGraph.addVertex();
defaultGraph.addVertex();
defaultGraph.addVertex();
defaultGraph.addVertex();
defaultGraph.addEdge(0, 1);
defaultGraph.addEdge(1, 2);
defaultGraph.addEdge(0, 3);
defaultGraph.addEdge(3, 1);
defaultGraph.addEdge(3, 5);
defaultGraph.addEdge(5, 4);
defaultGraph.addEdge(4, 5);

export const GraphProvider = (props: any) => {
    const [graph, setGraph]: [
        Accessor<{ graph: Graph }>,
        Setter<{ graph: Graph }>
    ] = createSignal({
        graph: props.graph || defaultGraph,
    });

    const [render, setRender]: [
        Accessor<{
            color: {
                nodes: Map<number, string>;
                edges: Map<number, Map<number, string>>;
            };
            layout: string;
        }>,
        Setter<{
            color: {
                nodes: Map<number, string>;
                edges: Map<number, Map<number, string>>;
            };
            layout: string;
        }>
    ] = createSignal({
        color: stableStateColor(graph().graph),
        layout: "dot",
    });

    const object = [
        { render, graph },
        {
            addVertex: (name = null): void => {
                setGraph((graph) => {
                    if (name) graph.graph.addVertex(name);
                    else graph.graph.addVertex();

                    graph.graph.clearData();

                    return { graph: graph.graph };
                });
                setRender((render) => ({
                    ...render,
                    color: stableStateColor(graph().graph),
                }));
            },
            removeVertex: (id: number): void => {
                setGraph((graph) => {
                    graph.graph.removeVertex(id);
                    graph.graph.clearData();

                    return { graph: graph.graph };
                });

                setRender((render) => ({
                    ...render,
                    color: stableStateColor(graph().graph),
                }));
            },
            addEdge: (sourceID: number, targetID: number): void => {
                setGraph((graph) => {
                    graph.graph.addEdge(sourceID, targetID);
                    graph.graph.clearData();

                    return { graph: graph.graph };
                });

                setRender((render) => ({
                    ...render,
                    color: stableStateColor(graph().graph),
                }));
            },
            removeEdge: (sourceID: number, targetID: number): void => {
                setGraph((graph) => {
                    graph.graph.removeEdge(sourceID, targetID);
                    graph.graph.clearData();

                    return { graph: graph.graph };
                });

                setRender((render) => ({
                    ...render,
                    color: stableStateColor(graph().graph),
                }));
            },
            addData: (key: string, value: any): void => {
                setGraph((graph) => {
                    graph.graph.addData(key, value);
                    graph.graph.clearData();

                    return { graph: graph.graph };
                });
            },
            clearData: (): void => {
                setGraph((graph) => {
                    graph.graph.clearData();
                    return { graph: graph.graph };
                });
            },
            setColor: (c: {
                nodes: Map<number, string>;
                edges: Map<number, Map<number, string>>;
            }): void => {
                setRender((render) => ({ ...render, color: c }));
            },
            resetRender: () => {
                setRender({
                    color: stableStateColor(graph().graph),
                    layout: "dot",
                });
            },
        },
    ];

    return (
        <GraphContext.Provider value={object}>
            {props.children}
        </GraphContext.Provider>
    );
};

export const useGraph = () => useContext(GraphContext);
