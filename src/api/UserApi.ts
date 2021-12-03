import Api from "./api";

interface GetUserStatusResponse {
  user: {
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
}

interface PostCheckInRequest {
  cardNum: string;
}
interface PostCheckInResponse {
  result: boolean;
  notice: boolean;
}
interface GetUsageRequest {
  from: string;
  to: string;
}
interface GetDailyUsageResponse {
  list: {
    login: string;
    date: string;
    seconds: string;
  }[];
}
interface GetUsingCardResponse {
  gaepo: number;
  seocho: number;
}

type PostCheckOutResponse = boolean;

class UserApi {
  static baseUrl = "/user";

  static usageUrl = `${UserApi.baseUrl}/usage`;

  static getDailyUsage(params: GetUsageRequest) {
    return Api.get<GetDailyUsageResponse>(`${UserApi.usageUrl}/daily`, params);
  }

  static getUserStatus() {
    return Api.get<GetUserStatusResponse>(`${UserApi.baseUrl}/status`);
  }

  static postCheckIn(params: PostCheckInRequest) {
    return Api.post<PostCheckInResponse>(`${UserApi.baseUrl}/checkIn/${params.cardNum}`);
  }

  static postCheckOut() {
    return Api.post<PostCheckOutResponse>(`${UserApi.baseUrl}/checkOut`);
  }

  static getUsingCard() {
    return Api.get<GetUsingCardResponse>(`${UserApi.baseUrl}/using`);
  }
}
export default UserApi;