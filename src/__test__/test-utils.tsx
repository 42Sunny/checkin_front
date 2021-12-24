// test-utils.jsx
import { configureStore } from "@reduxjs/toolkit";
import { Queries, render, RenderResult } from "@testing-library/react";
import { createBrowserHistory } from "history";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
// Import your own reducer
import renderer from "react-test-renderer";
import appStore from "../redux/configureStore";
import rootReducer, { RootState } from "../redux/modules";
import { initialState as clusterInitState } from "../redux/modules/cluster";
import { initialState as userInitState } from "../redux/modules/user";

const makeCustomStore = ({
  cluster,
  user,
}: {
  cluster?: typeof clusterInitState;
  user?: typeof userInitState;
} = {}) => {
  return {
    clusterReducer: { ...clusterInitState, ...cluster },
    userReducer: { ...userInitState, ...user },
  };
};

const customRender = (
  ui: ReactElement,
  preloadedState: RootState = makeCustomStore(),
  { store = configureStore({ reducer: rootReducer, preloadedState }), ...renderOptions } = {},
): RenderResult<Queries, HTMLElement> => {
  const Wrapper: any = ({ children }: { children: ReactElement }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

const createWithWrapper = (children: ReactElement) =>
  renderer.create(
    <Provider store={appStore}>
      <Router history={createBrowserHistory()}>{children}</Router>
    </Provider>,
  );

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render, createWithWrapper, makeCustomStore };
