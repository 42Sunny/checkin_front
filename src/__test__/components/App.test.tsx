import React from "react";
import App from "../../App";
import { createWithWrapper } from "../test-utils";

describe("src/App.tsx", () => {
  it("to match snapshot", () => {
    const component = createWithWrapper(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
