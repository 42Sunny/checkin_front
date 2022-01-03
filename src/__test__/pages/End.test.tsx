import { findByRole, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import End from "../../pages/End";
import { act, render, screen, createWithWrapper } from "../test-utils";

describe("src/pages/End.tsx", () => {
  it("matches snapshot", () => {
    const component = createWithWrapper(<End />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders checkinPage after 1 second", async () => {
    // TODO:
    // const history = createMemoryHistory();
    // render(<End />, undefined, undefined, history);
    // await waitFor(() => expect(history.length).toBe(2));
    // console.log(history);
    // screen.debug();
  });
});
