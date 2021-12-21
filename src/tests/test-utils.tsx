import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureStore from "../redux/configureStore";

const history = createMemoryHistory();
const AllTheProviders: React.FC<any> = ({ children }) => {
  return (
    <Provider store={configureStore}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render, AllTheProviders };
