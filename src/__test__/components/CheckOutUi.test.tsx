import CheckOutUi from "../../components/CheckOutUi";
import { initialState as userInitState } from "../../redux/modules/user";
import { screen, render, createWithWrapper, makeCustomStore } from "../test-utils";

describe("", () => {
  let handleCheckOut: any;
  beforeEach(() => {
    handleCheckOut = jest.fn();
  });
  it("matches snapsot", () => {
    const component = createWithWrapper(<CheckOutUi handleCheckOut={handleCheckOut} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders correct checkinTime", () => {
    render(
      <CheckOutUi handleCheckOut={handleCheckOut} />,
      makeCustomStore({ user: { ...userInitState, checkinAt: "2022-01-02T08:29:06.000Z" } }),
    );
    const pEl = screen.queryByText("체크인 시간: 2022-01-02 17:29");
    expect(pEl).toBeInTheDocument();
  });
});
