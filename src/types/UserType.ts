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