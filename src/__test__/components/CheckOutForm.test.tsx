import { fireEvent } from "@testing-library/react";
import CheckOutForm from "../../components/CheckOutForm";
import { initialState as userInitState } from "../../redux/modules/user";
import { createWithWrapper, makeCustomStore, render, screen } from "../test-utils";

describe("src/components/CheckOutForm.tsx", () => {
  let handleCheckOut: any;
  beforeEach(() => {
    handleCheckOut = jest.fn((e) => e.preventDefault());
  });
  it("matches snapshot", () => {
    const component = createWithWrapper(<CheckOutForm handleCheckOut={handleCheckOut} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders card number", () => {
    render(
      <CheckOutForm handleCheckOut={handleCheckOut} />,
      makeCustomStore({ user: { ...userInitState, cardNum: "1" } }),
    );
    const cardNumberEl = screen.queryByText("1");
    expect(cardNumberEl).toBeInTheDocument();
  });
  it("when user slide button to end handleSubmit gets called", () => {
    render(
      <CheckOutForm handleCheckOut={handleCheckOut} />,
      makeCustomStore({ user: { ...userInitState, cardNum: "1" } }),
    );
    const slideBtnEl = screen.getByRole("slider");

    fireEvent.input(slideBtnEl, { target: { value: "80" } });
    jest.resetAllMocks();
    fireEvent.touchEnd(slideBtnEl, { target: { value: "80" } });

    expect(handleCheckOut).toBeCalledTimes(1);
  });
});
