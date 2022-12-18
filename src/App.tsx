import { Suspense, createEffect, createSignal, lazy } from "solid-js";
import { createGraph } from "./Graph/lib/graph";
import { useGraph } from "./util/graphContext";
import { Toolbar } from "./Components/Toolbar";

const Render2D = lazy(() => import("./Components/render2D"));

export default function App() {
    let render2D;
    return (
        <div class="w-screen h-screen flex justify-center items-center bg-black">
            <div class="basis-3/5 w-full h-full">
                <Suspense fallback={<div class=" text-white">loading...</div>}>
                    <Render2D ref={render2D}></Render2D>
                </Suspense>
            </div>
            <div class="h-full w-full basis-2/5 rounded-md text-gray-200 overscroll-contain p-4 bg-slate-800 scroll-smooth overflow-y-scroll">
                <Toolbar></Toolbar>
            </div>
        </div>
    );
}
