/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { GraphProvider } from "./util/graphContext";
import { RenderContextProvider } from "./util/renderContext";

render(
    () => (
        <GraphProvider>
            <App />
        </GraphProvider>
    ),
    document.getElementById("root") as HTMLElement
);
