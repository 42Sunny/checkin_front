import { rest } from "msw";
import {
  GetDailyUsageResponse,
  GetUserStatusResponse,
  GetUsingCardResponse,
  PostCheckInResponse,
} from "../../../api/UserApi";

class User {
  static getUsingCard = rest.get("/user/using", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<GetUsingCardResponse>({
        gaepo: 0,
        seocho: 0,
      }),
    );
  });

  // $테스트용$ 파라미터에 따라 state값을 유동적으로 전달
  static getUserStatus = rest.get("/user/status", (req, res, ctx) => {
    const paramState = req.url.searchParams.get("state") as "checkOut" | "checkIn" | null;
    return res(
      ctx.status(200),
      ctx.json<GetUserStatusResponse>({
        cluster: { gaepo: 0, seocho: 0 },
        isAdmin: true,
        user: {
          card: null,
          card_no: null,
          checkin_at: "2021-12-20T02:29:00.000Z",
          checkout_at: "2021-12-20T02:29:05.000Z",
          log_id: 308,
          login: "sookang",
          profile_image_url: "https://cdn.intra.42.fr/users/sookang.jpg",
          state: paramState,
          _id: 1,
        },
      }),
    );
  });

  static getDailyUsage = rest.get("/user/usage/daily", (req, res, ctx) => {
    const paramFrom = req.url.searchParams.get("from");
    const paramTo = req.url.searchParams.get("to");
    if (!paramFrom || !paramTo) throw new Error("Param from or to is missing");

    const today = new Date();
    const from = new Date(paramFrom);
    const to = new Date(paramTo);

    const startDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (from.getMonth() !== startDay.getMonth()) throw new Error("Param from이 이번달이 아닙니다.");
    if (to.getMonth() !== endDay.getMonth()) throw new Error("param to가 이번달이 아닙니다.");
    if (from.getDate() !== startDay.getDate()) throw new Error("Param from이 1일이 아닙니다.");
    if (to.getDate() !== endDay.getDate()) throw new Error("param to가 말일이 아닙니다.");
    return res(
      ctx.status(200),
      ctx.json<GetDailyUsageResponse>({
        list: [
          { login: "sookang", date: "2021-12-03", seconds: "4689" },
          { login: "sookang", date: "2021-12-05", seconds: "81552" },
          { login: "sookang", date: "2021-12-06", seconds: "4272" },
          { login: "sookang", date: "2021-12-07", seconds: "11349" },
          { login: "sookang", date: "2021-12-11", seconds: "321" },
          { login: "sookang", date: "2021-12-14", seconds: "2967" },
          { login: "sookang", date: "2021-12-19", seconds: "13" },
          { login: "sookang", date: "2021-12-20", seconds: "2071" },
        ],
      }),
    );
  });

  static postCheckIn = rest.post("/user/checkin/:cardNum", (req, res, ctx) => {
    const cardNum = Number(req.params.cardNum);
    // 번호 123으로 오는 요청은 이미 처리된 요청으로 가정
    if (cardNum === 123)
      return res(
        ctx.status(409),
        ctx.json({ code: 400, message: "이미 체크인 하셨습니다.", stack: "" }),
      );
    // 서초로 가는 요청(1000이상)은 이미 사용중인 카드라 가정
    if (cardNum >= 1000)
      return res(
        ctx.status(409),
        ctx.json({
          code: 409,
          message: "이미 사용중인 카드입니다.",
          stack: "",
        }),
      );
    // 1~1000번으로 오는 요청은 가능하다 가정
    return res(
      ctx.status(200),
      ctx.json<PostCheckInResponse>({
        notice: false,
        result: true,
      }),
    );
  });

  static postCheckOut = rest.post("/user/checkOut", (req, res, ctx) => {
    return res(ctx.status(200), ctx.body("true"));
  });
}

export default [
  User.getUsingCard,
  User.getUserStatus,
  User.getDailyUsage,
  User.postCheckIn,
  User.postCheckOut,
];
