export interface MemberModel {
  id?: string;
  name: string;
  email: string;
  address: string;
  marriageStatus: string;
}

export interface PostMemberResFromFirebaseModel {
  name: string;
}

export type DeleteMemberResFromFirebaseModel = PostMemberResFromFirebaseModel;
