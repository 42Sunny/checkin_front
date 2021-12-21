import { rest } from "msw";
import { GetConfigResponse } from "../../../api/ConfigApi";

const base = "http://localhost";
class Config {
  static getConfig = rest.get(`${base}/config`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<GetConfigResponse>({
        actor: null,
        auth: "Slack",
        begin_at: "2021-01-01T22:00:00.000Z",
        checkin_at: "00:00:00",
        checkout_at: "24:00:00",
        close_at: "24:00:00",
        created_at: null,
        deleted_at: null,
        end_at: "2022-01-01T15:00:00.000Z",
        env: "local",
        gaepo: 1,
        open_at: "00:00:00",
        seocho: 42,
        updated_at: "2021-12-13T15:30:13.000Z",
        _comment: 1,
        _id: 1,
      }),
    );
  });
}

export default [Config.getConfig];
