interface User {
  isLogin: boolean;
  id: string;
  cardNum: string;
  state: "checkIn" | "checkOut";
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
}

interface Status {
  seocho: number;
  gaepo: number;
}

interface Usage {
  login: string;
  date: string;
  seconds: string;
}
