import Home from "../../pages/Home";
import { render, screen, createWithWrapper } from "../test-utils";

describe("src/pages/Home.tsx", () => {
  it("matches snapshot", () => {
    const component = createWithWrapper(<Home />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
