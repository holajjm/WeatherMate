//Mbti Data Type
export interface MBTIResult {
  desc: string;
  id: number;
  title: string;
  type: string;
}
//Kakao Data Type
export interface KakaoShareData extends MBTIResult {
  data: MBTIResult | undefined;
}