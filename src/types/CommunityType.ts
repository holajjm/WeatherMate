//Community Data Type
export interface CommunityData {
  content: string;
  createdAt: string;
  extra?: { image: string };
  image: string;
  repliesCount: number;
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
  image: FileList;
  title: string;
  type: string;
  tag: string;
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
