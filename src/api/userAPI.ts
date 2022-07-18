import { instance, makeAPIPath } from "./baseAPI";

export type GetUserStatusResponse = {
  payload: {
    user: {
      _id: number;
      card_no: null | number;
      login: string;
      card: string | null;
      state: "checkIn" | "checkOut" | null;
      log_id: number;
      checkin_at: string | null;
      checkout_at: string | null;
      profile_image_url: string;
    };
    cluster: {
      gaepo: number;
      seocho: number;
    };
    isAdmin: boolean;
  };
};

export type PostCheckInRequest = {
  cardNum: string;
};
export type PostCheckInResponse = {
  status: number;
  result: boolean;
  code: number;
  payload: {
    card_no: number;
    state: "checkIn" | "checkOut";
    prev_state: "checkOut";
    notice: boolean;
  };
};
export type GetUsageRequest = {
  from: string;
  to: string;
};
export type GetDailyUsageResponse = {
  payload: {
    login: string;
    date: string;
    seconds: string;
  }[];
};

export type GetUserStatusV1Response = {
  payload: {
    user: {
      login: string;
      card: null | number;
      state: "checkIn" | "checkOut";
      log_id: number;
      checkin_at: null | Date;
      checkout_at: null | Date;
      profile_image_url: string;
    };
    isAdmin: boolean;
  };
};

export type GetUsingCardResponse = {
  gaepo: number;
  seocho: number;
};
export type PostCheckOutResponse = boolean;

export const getStatus = () => {
  return instance.get(makeAPIPath(`user/status`));
};

export const getDailyUsage = ({ from, to }: GetUsageRequest) => {
  return instance.get(makeAPIPath(`user/usage?from=${from}&to=${to}`));
};

export const postCheckIn = ({ cardNum }: PostCheckInRequest) => {
  return instance.post(makeAPIPath(`user/checkIn/${cardNum}`));
};

export const postCheckOut = () => {
  return instance.post(makeAPIPath(`user/checkOut`));
};
