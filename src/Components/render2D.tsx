import { Graphviz } from "@hpcc-js/wasm";
import {
    Accessor,
    createEffect,
    createResource,
    createSignal,
    lazy,
    onMount,
} from "solid-js";
import { useGraph } from "../util/graphContext";
import * as d3 from "d3";

const fetchGraphViz = async () => await Graphviz.load();

export default function Render2D() {
    const [{ graph, render }] = useGraph();
    const [graphviz] = createResource(fetchGraphViz);
    const [svg, setSVG] = createSignal(<div></div>);
    let svgRef;

    onMount(() => {
        let vertices = "";
        let edges = "";

        for (const [id, vertex] of graph().graph.getVertices().entries()) {
            vertices += `${id} [label= "${vertex.getName()}" id="n${id}" style="filled" shape="circle" color="${render().color.nodes.get(
                vertex.id
            )}"]; \n`;

            for (const edge of vertex.getEdges().values()) {
                edges += `${id} -> ${edge.target.id} [id="n${id}-n${
                    edge.target.id
                }" color="${render()
                    .color.edges.get(id)
                    .get(edge.target.id)}" edgetooltip="${
                    edge.weight
                }" penwidth=3]; \n`;
            }
        }

        const dot = `digraph G{\n
            bgcolor=black;\n
            center = true\n
            viewport =\"500,500\"\n
            ${vertices}\n
            ${edges}
        }`;

        setSVG(
            <div ref={svgRef}>
                <div class="tooltip"></div>
                <div
                    innerHTML={
                        graphviz()?.layout(dot, "svg", "circo") || "<svg><svg>"
                    }
                ></div>
            </div>
        );

        const svgRender = d3
            .select(svgRef)
            .select("svg")
            .style("minheight", "100vh")
            .attr("class", "w-full h-full");

        svgRender.select("#graph0").selectAll("title").remove();

        svgRender.select("#graph0").each(function () {
            console.log(this.parentNode);
            d3.select(this.parentNode)
                .insert("g", () => {
                    return this;
                })
                //insert a new <g> element immediately before this element
                .attr("class", "wrapper") //set anything you want to on the <g>
                .append(() => {
                    return this;
                });
            //move the content element into the group
        });

        function handleZoom(e) {
            svgRender.select("g.wrapper").attr("transform", e.transform);
        }

        const zoom = d3.zoom().on("zoom", handleZoom);
        svgRender.call(zoom);

        const tooltip = d3
            .select(svgRef)
            .select(".tooltip")
            .attr("class", "tooltip")
            .style("display", "none")
            .style("background", "rgba(69,77,93,.9)")
            .style("border-radius", ".2rem")
            .style("color", "#fff")
            .style("padding", ".6rem")
            .style("position", "absolute")
            .style("text-overflow", "ellipsis")
            .style("white-space", "pre")
            .style("line-height", "1em")
            .style("z-index", "300");

        for (const [id, vertex] of graph().graph.getVertices().entries()) {
            for (const edge of vertex.getEdges().values()) {
                const selector = `#n${edge.source.id}-n${edge.target.id}`;
                svgRender
                    .select(selector)
                    .on("pointerenter pointermove", (event) => {
                        const msg = `Weight: ${
                            Math.round(edge.weight * 100) / 100
                        }`;
                        tooltip
                            .style("display", null)
                            .html(msg)
                            .style("top", event.pageY - 10 + "px")
                            .style("left", event.pageX + 10 + "px");
                    })
                    .on("pointerleave", () => {
                        // hide the tooltip when the pointer leaves the target
                        tooltip.style("display", "none");
                    });

                svgRender
                    .select(selector)
                    .select("a")
                    .attr("xlink:title", null);
            }
        }
    });

    createEffect(() => {
        let vertices = "";
        let edges = "";

        for (const [id, vertex] of graph().graph.getVertices().entries()) {
            vertices += `${id} [label= "${vertex.getName()}" id="n${id}" style="filled" shape="circle" color="${render().color.nodes.get(
                vertex.id
            )}"]; \n`;

            for (const edge of vertex.getEdges().values()) {
                edges += `${id} -> ${edge.target.id} [id="n${id}-n${
                    edge.target.id
                }" color="${render()
                    .color.edges.get(id)
                    .get(edge.target.id)}" edgetooltip="${
                    edge.weight
                }" penwidth=3]; \n`;
            }
        }

        const dot = `digraph G{\n
            bgcolor=black;\n
            center = true\n
            ${vertices}\n
            ${edges}
        }`;

        console.log(dot);

        setSVG(
            <div ref={svgRef}>
                <div class="tooltip"></div>
                <div
                    innerHTML={
                        graphviz()?.layout(dot, "svg", render().layout) ||
                        "<svg><svg>"
                    }
                ></div>
            </div>
        );

        const svgRender = d3
            .select(svgRef)
            .select("svg")
            .style("minheight", "100vh")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("class", "w-full h-full");

        console.log(d3.select(svgRef).select("svg").node().getBBox());

        svgRender.select("#graph0").selectAll("title").remove();

        svgRender.select("#graph0").each(function () {
            console.log(this.parentNode);
            d3.select(this.parentNode)
                .insert("g", () => {
                    return this;
                })
                //insert a new <g> element immediately before this element
                .attr("class", "wrapper") //set anything you want to on the <g>
                .append(() => {
                    return this;
                });
            //move the content element into the group
        });

        function handleZoom(e) {
            svgRender.select("g.wrapper").attr("transform", e.transform);
        }

        const zoom = d3.zoom().on("zoom", handleZoom);
        svgRender.call(zoom);

        const tooltip = d3
            .select(svgRef)
            .select(".tooltip")
            .attr("class", "tooltip")
            .style("display", "none")
            .style("background", "rgba(69,77,93,.9)")
            .style("border-radius", ".2rem")
            .style("color", "#fff")
            .style("padding", ".6rem")
            .style("position", "absolute")
            .style("text-overflow", "ellipsis")
            .style("white-space", "pre")
            .style("line-height", "1em")
            .style("z-index", "300");

        for (const [id, vertex] of graph().graph.getVertices().entries()) {
            for (const edge of vertex.getEdges().values()) {
                const selector = `#n${edge.source.id}-n${edge.target.id}`;
                svgRender
                    .select(selector)
                    .on("pointerenter pointermove", (event) => {
                        const msg = `Weight: ${
                            Math.round(edge.weight * 100) / 100
                        }`;
                        tooltip
                            .style("display", null)
                            .html(msg)
                            .style("top", event.pageY - 10 + "px")
                            .style("left", event.pageX + 10 + "px");
                    })
                    .on("pointerleave", () => {
                        // hide the tooltip when the pointer leaves the target
                        tooltip.style("display", "none");
                    });

                svgRender
                    .select(selector)
                    .select("a")
                    .attr("xlink:title", null);
            }
        }
    });

    return <div class="w-full h-full text-white">{svg()}</div>;
}
