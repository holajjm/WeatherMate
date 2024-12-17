//Community Data Type
export interface CommunityData {
  content: string;
  createdAt: string;
  image: string;
  replies?: ReplyData[];
  seller_id: string | null;
  type: string;
  title: string | null;
  updatedAt: string;
  user: {
    name: string;
    profile: string;
    _id: number;
  };
  views: number;
  _id: number;
}
export interface CommunityDetailData {
  item: CommunityData;
  ok: number;
}
export interface ExpandCommunityData extends CommunityData {
  product?: {
    image: string;
  };
  repliesCount: number;
}
export interface CommunityMainData {
  item: ExpandCommunityData[];
  ok: number;
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
export interface CommunityFormData {
  content: string;
  image: FileList
  title: string;
  type: string;
  tag:string
}
export interface ReplyMainData {
  item: ReplyData[];
  ok: number;
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
export interface ReplyData {
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    profile: string | null;
    _id: number;
  };
  _id: number;
}
export interface ExpandReplyData extends ReplyData {
  item: ReplyData;
  refetch: () => void;
}
export interface NewReply {
  comment: string;
  commentRequired: string;
}
//Weather Data Type
export interface WeatherImage {
  Clear: string;
  Clouds: string;
  Rain: string;
  Drizzle: string;
  Thunderstorm: string;
  Snow: string;
  Haze: string;
  Mist: string;
  Smoke: string;
  Dust: string;
  overcastClouds: string;
}
//Mbti Data Type
export interface MBTIResult {
  desc: string;
  id: number;
  image: string;
  title: string;
  type: string;
}
//Kakao Data Type
export interface KakaoShareData extends MBTIResult {
  data: MBTIResult | undefined;
}
//Location Data Type
export interface LocationMainData {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  cpyrhtDivCd: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}
export interface LocationSuperDetailData {
  accomcount: string;
  chkbabycarriage: string;
  chkcreditcard: string;
  chkpet: string;
  contentid: string;
  contenttypeid: string;
  expagerange: string;
  expguide: string;
  heritage1: string;
  heritage2: string;
  heritage3: string;
  infocenter: string;
  opendate: string;
  parking: string;
  restdate: string;
  useseason: string;
  usetime: string;
}
export interface LocationDetailData {
  addr1: string;
  addr2: string;
  booktour: string;
  contentid: string;
  contenttypeid: string;
  cpyrhtDivCd: string;
  createdtime: string;
  firstimage: string;
  firstimage2: string;
  homepage: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  overview: string;
  tel: string;
  telname: string;
  title: string;
  zipcode: string;
}
//User Data Type
export interface UserMainData {
  _id: number;
  email: string;
  name: string;
  phone: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface UserBookmarkData {
  booktour:string
  contentid: string
  contenttypeid: string
  cpyrhtDivCd: string
  createdtime: string
  firstimage: string
  firstimage2: string
  homepage: string
  modifiedtime: string
  tel: string
  telname: string
  title: string
}
//Login Data Type
export interface LoginMainData {
  email: string;
  password: string;
}
//SignUp Data Type
export interface SignUpMainData {
  type: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  profileImage?: string;
}