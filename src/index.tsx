import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import moment from "moment";
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";
import App from "./App";
import configureStore from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";

const history = createBrowserHistory();

async function prepare() {
  moment.tz.setDefault("Asia/Seoul");
  if (process.env.NODE_ENV === "production") {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        }),
      ],
      release: process.env.REACT_APP_SENTRY_RELEASE,
      tracesSampleRate: 0.2,
    });
  }

  // handlers 잘되는지 확인
  // if (process.env.NODE_ENV === "development") {
  //   const worker = await import("./__tests__/mocks/browser");
  //   return worker.default.start();
  // }
  return Promise.resolve();
}
prepare().then(() => {
  ReactDOM.render(
    <Provider store={configureStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById("root"),
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
