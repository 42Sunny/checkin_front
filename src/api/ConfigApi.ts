import Api from "./api";

interface GetConfigResponse {
  begin_at: string | null;
  checkin_at: string | null;
  checkout_at: string | null;
  close_at: string | null;
  created_at: string | null;
  deleted_at: string | null;
  end_at: string | null;
  env: "production" | "development";
  gaepo: number;
  open_at: string;
  seocho: number;
  updated_at: string | null;
  _id: number;
}
class ConfigApi {
  static baseUrl = "/config";

  static getConfig() {
    return Api.get<GetConfigResponse>(`${ConfigApi.baseUrl}`);
  }
}
export default ConfigApi;
