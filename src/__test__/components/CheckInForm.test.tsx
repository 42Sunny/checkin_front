import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import CheckInForm from "../../components/CheckInForm";
import { act, screen, createWithWrapper, render } from "../test-utils";

describe("src/components/CheckInForm.tsx", () => {
  const checkInFormProps: {
    handleCheckIn: any;
    handleModalOpen: any;
  } = {
    handleCheckIn: () => {},
    handleModalOpen: () => {},
  };

  beforeEach(() => {
    const curriedCheckIn = jest.fn((e) => e.preventDefault());
    checkInFormProps.handleCheckIn = jest.fn(() => curriedCheckIn);
    checkInFormProps.handleModalOpen = jest.fn();
  });

  it("matches snapshot", () => {
    const component = createWithWrapper(<CheckInForm {...checkInFormProps} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders with button disabled", () => {
    render(<CheckInForm {...checkInFormProps} />);

    const buttonEL = screen.getByText(/check in/i);
    expect(buttonEL).toBeDisabled();
  });

  it("card input's initial value is  '' ", () => {
    render(<CheckInForm {...checkInFormProps} />);
    const cardInputEl = screen.getByPlaceholderText(/카드 번호/i) as HTMLInputElement;

    expect(cardInputEl.value).toBe("");
  });

  it("card input doesn't accept non-numeric value", () => {
    render(<CheckInForm {...checkInFormProps} />);
    const cardInputEl = screen.getByPlaceholderText(/카드 번호/i) as HTMLInputElement;
    userEvent.type(cardInputEl, "a");

    expect(cardInputEl.value).toBe("");
  });

  it("card input accept numeric value", () => {
    render(<CheckInForm {...checkInFormProps} />);

    const cardInputEl = screen.getByPlaceholderText(/카드 번호/i) as HTMLInputElement;
    userEvent.type(cardInputEl, "1241");

    expect(cardInputEl.value).toBe("1241");
  });

  it("checkbox's initial value is not checked", () => {
    render(<CheckInForm {...checkInFormProps} />);

    const checkboxInputEl = screen.getByRole("checkbox") as HTMLInputElement;

    expect(checkboxInputEl.checked).toBe(false);
  });

  it("checkbox is clicked", () => {
    render(<CheckInForm {...checkInFormProps} />);

    const checkboxInputEl = screen.getByRole("checkbox") as HTMLInputElement;
    userEvent.click(checkboxInputEl);

    expect(checkboxInputEl.checked).toBe(true);
  });

  it("when 자세히 button is clicked handleModalOpen gets called", () => {
    render(<CheckInForm {...checkInFormProps} />);

    const 자세히btnEl = screen.getByText(/자세히/i) as HTMLButtonElement;

    userEvent.click(자세히btnEl);

    expect(checkInFormProps.handleModalOpen).toHaveBeenCalledTimes(1);
  });

  it("user types card Input and checks checkbox button gets enabled", () => {
    render(<CheckInForm {...checkInFormProps} />);
    const checkboxInputEl = screen.getByRole("checkbox") as HTMLInputElement;
    const cardInputEl = screen.getByPlaceholderText(/카드 번호/i) as HTMLInputElement;
    const buttonEl = screen.getByText(/check in/i);

    userEvent.click(checkboxInputEl);
    userEvent.type(cardInputEl, "123");

    expect(buttonEl).toBeEnabled();
  });

  it("when submit condition is fulfilled and user clicks submitBtn handleCheckIn gets called", () => {
    render(<CheckInForm {...checkInFormProps} />);
    const checkboxInputEl = screen.getByRole("checkbox") as HTMLInputElement;
    const cardInputEl = screen.getByPlaceholderText(/카드 번호/i) as HTMLInputElement;
    const buttonEl = screen.getByText(/check in/i);

    userEvent.click(checkboxInputEl);
    userEvent.type(cardInputEl, "123");
    userEvent.click(buttonEl);
    expect(checkInFormProps.handleCheckIn()).toBeCalledTimes(1);
  });

  it("when submit condition is not fulfilled and user clicks submitBtn handleCheckIn doesn't gets called", () => {
    render(<CheckInForm {...checkInFormProps} />);
    const buttonEl = screen.getByText(/check in/i);

    userEvent.click(buttonEl);

    expect(checkInFormProps.handleCheckIn()).toBeCalledTimes(0);
  });
});
