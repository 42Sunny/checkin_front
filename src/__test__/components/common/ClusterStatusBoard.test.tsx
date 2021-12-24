import ClusterStatusBoard from "../../../components/common/ClusterStatusBoard";
import { initialState as clusterInitState } from "../../../redux/modules/cluster";
import { createWithWrapper, makeCustomStore, render, screen } from "../../test-utils";

describe("src/components/common/ClusterStatusBoard.tsx", () => {
  it("matched snapshot", () => {
    const component = createWithWrapper(<ClusterStatusBoard />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders cadet's count", () => {
    const cadetCounts = {
      gaepo: 10,
      gaepoLimitation: 10,
      seocho: 4,
      seochoLimitation: 42,
    };
    render(
      <ClusterStatusBoard />,
      makeCustomStore({ cluster: { ...clusterInitState, ...cadetCounts } }),
    );
    const gaepoCount = screen.getByTestId(/개포-cadet-count/i);
    const seochoCount = screen.getByTestId(/서초-cadet-count/i);
    expect(gaepoCount).toHaveTextContent(`${cadetCounts.gaepo} / ${cadetCounts.gaepoLimitation}`);
    expect(seochoCount).toHaveTextContent(
      `${cadetCounts.seocho} / ${cadetCounts.seochoLimitation}`,
    );
  });

  it("renders correct congestion", () => {
    const cadetCounts = {
      gaepo: 10,
      gaepoLimitation: 10,
      seocho: 4,
      seochoLimitation: 42,
    };

    render(
      <ClusterStatusBoard />,
      makeCustomStore({ cluster: { ...clusterInitState, ...cadetCounts } }),
    );
    const [gaepoCongestionEl, seochoCongestionEl] = screen.getAllByRole("status");
    const [gaepoCongestion, seochoCongestion] = [
      cadetCounts.gaepo / cadetCounts.gaepoLimitation,
      cadetCounts.seocho / cadetCounts.seochoLimitation,
    ];

    const correctCongestion = (congestion: any) => {
      if (congestion > 0.8) return "red";
      if (congestion > 0.4) return "orange";
      return "green";
    };
    expect(gaepoCongestionEl).toHaveClass(correctCongestion(gaepoCongestion));
    expect(seochoCongestionEl).toHaveClass(correctCongestion(seochoCongestion));
  });
});
