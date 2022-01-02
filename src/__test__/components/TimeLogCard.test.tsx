import TimeLogCard from "../../components/TimeLogCard";
import { screen, createWithWrapper, render } from "../test-utils";

describe("src/components/TimeLogCard.tsx", () => {
  const timeLogCardProps: { handleFlip: any; logs: any } = { handleFlip: "", logs: "" };
  beforeEach(() => {
    timeLogCardProps.handleFlip = jest.fn();
    timeLogCardProps.logs = [];
  });
  it("matches snapshot", () => {
    const component = createWithWrapper(<TimeLogCard {...timeLogCardProps} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
