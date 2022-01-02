import userEvent from "@testing-library/user-event";
import CheckInUi from "../../components/CheckInUi";
import { createWithWrapper, render, screen } from "../test-utils";

describe("src/components/CheckInUi.tsx", () => {
  let handleCheckIn: any;
  beforeEach(() => {
    handleCheckIn = jest.fn();
  });
  it("matches snapshot", () => {
    const component = createWithWrapper(<CheckInUi handleCheckIn={handleCheckIn} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("when 자세히 button is clicked modal shows up", () => {
    render(<CheckInUi handleCheckIn={handleCheckIn} />);
    const infoBtn = screen.getByText("자세히");
    userEvent.click(infoBtn);
    const modal = screen.queryByRole("presentation");

    expect(modal).toBeInTheDocument();
  });
});
