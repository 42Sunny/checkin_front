import { instance, makeAPIPath } from "./baseAPI";

export interface GetConfigResponse {
  actor: null | string;
  auth: "Slack" | "42";
  begin_at: string | null;
  checkin_at: string | null;
  checkout_at: string | null;
  close_at: string | null;
  open_at: string;
  created_at: string | null;
  deleted_at: string | null;
  end_at: string | null;
  env: "production" | "development" | "local";
  gaepo: number;
  seocho: number;
  updated_at: string | null;
  _id: number;
  _comment: number;
}

export const getConfigInfo = () => {
  return instance.get(makeAPIPath("config"));
};

export const getClusterUsingInfo = () => {
  return instance.get(makeAPIPath("cluster/using"));
};
