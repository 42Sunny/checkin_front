import React from "react";
import renderer from "react-test-renderer";
import App from "../../App";
import { AllTheProviders } from "../test-utils";

describe("App", () => {
  it("to match snapshot", () => {
    const component = renderer.create(
      <AllTheProviders>
        <App />
      </AllTheProviders>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
