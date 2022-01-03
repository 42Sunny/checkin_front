import CheckIn from "../../pages/CheckIn";
import { render, screen, createWithWrapper } from "../test-utils";

describe("src/pages/CheckIn.tsx", () => {
  it("matches snapshot", () => {
    const component = createWithWrapper(<CheckIn />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
