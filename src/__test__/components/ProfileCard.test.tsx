import userEvent from "@testing-library/user-event";
import ProfileCard from "../../components/ProfileCard";
import { initialState as userInitState } from "../../redux/modules/user";
import { screen, render, createWithWrapper, makeCustomStore } from "../test-utils";

type status = "checkIn" | "checkOut" | null;
describe("src/components/ProfileCard.tsx", () => {
  const profileCardProps: {
    handleFlip: any;
    handleCheckIn: any;
    handleCheckOut: any;
  } = {
    handleFlip: () => {},
    handleCheckIn: () => () => {},
    handleCheckOut: () => {},
  };

  beforeEach(() => {
    profileCardProps.handleCheckIn = jest.fn();
    profileCardProps.handleCheckOut = jest.fn();
    profileCardProps.handleFlip = jest.fn();
  });

  it("matches snapshot", () => {
    const component = createWithWrapper(<ProfileCard {...profileCardProps} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders userName and user image properly", () => {
    const user = { id: "sookang", profile: "someImage.jpg", state: "checkIn" as status };
    render(
      <ProfileCard {...profileCardProps} />,
      makeCustomStore({
        user: { ...userInitState, ...user },
      }),
    );
    const userNameTextEl = screen.queryByRole("heading", { name: user.id });
    const userImageEl = screen.getByRole("img", { name: /profile/i });

    expect(userNameTextEl).toBeInTheDocument();
    expect(userNameTextEl).toHaveTextContent(user.id);
    expect(userImageEl.getAttribute("src")).toBe(user.profile);

    const flipBtnEl = screen.getByTestId(/flip-button/i);
    // // 체크인시 사용
    // screen.getByText(/check in/i);
    // // checkout 시 사용
    // screen.getByRole("slider");
  });

  it("renders checkInUi when user's state is 'checkOut'", () => {
    const user = { id: "sookang", profile: "someImage.jpg", state: "checkOut" as status };

    render(
      <ProfileCard {...profileCardProps} />,
      makeCustomStore({
        user: { ...userInitState, ...user },
      }),
    );
    const checkInBtn = screen.queryByText(/check in/i);
    const checkOutBtn = screen.queryByRole("slider");

    expect(checkInBtn).toBeInTheDocument();
    expect(checkOutBtn).not.toBeInTheDocument();
  });

  it("renders checkInUi when user's state is 'null'", () => {
    const user = { id: "sookang", profile: "someImage.jpg", state: null as status };

    render(
      <ProfileCard {...profileCardProps} />,
      makeCustomStore({
        user: { ...userInitState, ...user },
      }),
    );
    const checkInBtn = screen.queryByText(/check in/i);
    const checkOutBtn = screen.queryByRole("slider");

    expect(checkInBtn).toBeInTheDocument();
    expect(checkOutBtn).not.toBeInTheDocument();
  });

  it("renders checkOutUi when user's state is 'checkIn'", () => {
    const user = { id: "sookang", profile: "someImage.jpg", state: "checkIn" as status };

    render(
      <ProfileCard {...profileCardProps} />,
      makeCustomStore({
        user: { ...userInitState, ...user },
      }),
    );
    const checkInBtn = screen.queryByText(/check in/i);
    const checkOutBtn = screen.queryByRole("slider");

    expect(checkInBtn).not.toBeInTheDocument();
    expect(checkOutBtn).toBeInTheDocument();
  });

  it("calls handleFlip when user clicks flip button", () => {
    const user = { id: "sookang", profile: "someImage.jpg", state: "checkIn" as status };
    render(
      <ProfileCard {...profileCardProps} />,
      makeCustomStore({
        user: { ...userInitState, ...user },
      }),
    );
    const flipBtnEl = screen.getByTestId(/flip-button/i);

    userEvent.click(flipBtnEl);

    expect(profileCardProps.handleFlip).toBeCalledTimes(1);
  });
});
