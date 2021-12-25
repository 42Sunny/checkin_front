interface User {
  isLogin: boolean;
  id: string;
  cardNum: string;
  state: "checkIn" | "checkOut" | null;
  checkinAt: string | null;
  checkoutAt: string | null;
  profile: string;
  isAdmin: boolean;
}

interface Cluster {
  openAt: string | null;
  closeAt: string | null;
  gaepo: number;
  seocho: number;
  seochoLimitation: number;
  gaepoLimitation: number;
  officeHour: string;
  officeLunchTime: string;
}

interface Status {
  seocho: number;
  gaepo: number;
}

interface Log {
  login: string;
  date: string;
  seconds: string;
}
