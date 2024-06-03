import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.css";
import "./style/layout/layout.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Suspense } from "react";
import LoadingLazy from "./components/Loading/LoadingLazy";
import { BrowserRouter } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<LoadingLazy />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
