import { fireEvent } from "@testing-library/react";
import SlideButton from "../../components/SlideButton";
import { createWithWrapper, render, screen } from "../test-utils";

describe("src/components/SlideButton.tsx", () => {
  const slideButtonProps = {
    value: 0,
    setValue: () => {},
  };
  beforeEach(() => {
    slideButtonProps.setValue = jest.fn();
    slideButtonProps.value = 0;
  });
  it("matches snapshot", () => {
    const component = createWithWrapper(<SlideButton {...slideButtonProps} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("user drags slide button to end", () => {
    render(<SlideButton {...slideButtonProps} />);
    const slideBtnEl = screen.getByRole("slider");

    // slide이벤트가 jsdom에 따로 없어서 input으로 대체함
    fireEvent.input(slideBtnEl, { target: { value: 99 } });
    expect(slideButtonProps.setValue).toBeCalledWith(99);
    jest.resetAllMocks();
    fireEvent.touchEnd(slideBtnEl, { target: { value: 99 } });
    expect(slideButtonProps.setValue).toBeCalledWith(100);
  });

  it("user drags slide button to 80", () => {
    render(<SlideButton {...slideButtonProps} />);
    const slideBtnEl = screen.getByRole("slider");

    fireEvent.input(slideBtnEl, { target: { value: "80" } });
    expect(slideButtonProps.setValue).toBeCalledWith(80);
    jest.resetAllMocks();
    fireEvent.touchEnd(slideBtnEl, { target: { value: "80" } });
    expect(slideButtonProps.setValue).toBeCalledWith(100);
  });

  it("user drags slide button to 50 and slide button resets its value", () => {
    render(<SlideButton {...slideButtonProps} />);
    const slideBtnEl = screen.getByRole("slider");

    fireEvent.input(slideBtnEl, { target: { value: 50 } });
    expect(slideButtonProps.setValue).toBeCalledWith(50);
    jest.resetAllMocks();
    fireEvent.touchEnd(slideBtnEl, { target: { value: 50 } });
    expect(slideButtonProps.setValue).toBeCalledWith(0);
  });

  it("user drags slide button to 20 and slide button resets its value)", () => {
    render(<SlideButton {...slideButtonProps} />);
    const slideBtnEl = screen.getByRole("slider");

    fireEvent.input(slideBtnEl, { target: { value: 20 } });
    expect(slideButtonProps.setValue).toBeCalledWith(20);
    jest.resetAllMocks();
    fireEvent.touchEnd(slideBtnEl, { target: { value: 20 } });
    expect(slideButtonProps.setValue).toBeCalledWith(0);
  });

  it("slide button does render text when value is 0", () => {
    render(<SlideButton {...slideButtonProps} value={0} />);

    const slideTextEl = screen.queryByText(/밀어서 체크아웃/i);

    expect(slideTextEl).toBeInTheDocument();
  });

  it("slide button does render text when value is above 0", () => {
    render(<SlideButton {...slideButtonProps} value={1} />);

    const slideTextEl = screen.queryByText(/밀어서 체크아웃/i);

    expect(slideTextEl).not.toBeInTheDocument();
  });

  it("slide button doesn't have background black when value is under 80", () => {
    render(<SlideButton {...slideButtonProps} value={0} />);

    const slideBtnEl = screen.getByRole("slider");

    expect(slideBtnEl.style.backgroundColor).not.toBe("black");
  });

  it("slide button has background black when value is above 80", () => {
    render(<SlideButton {...slideButtonProps} value={81} />);

    const slideBtnEl = screen.getByRole("slider");

    expect(slideBtnEl.style.backgroundColor).toBe("black");
  });
});
