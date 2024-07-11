import { Server, Member, Profile } from "@prisma/client";

export enum MemberRoleEnum {
  ADMIN,
  MODERATOR,
  GUEST,
}

export enum ChannelTypeEnum {
  TEXT,
  AUDIO,
  VIDEO,
}
export type ProfileType = {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type ServerType = {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;

  profileId: string;
  profile: ProfileType;

  members: MemberType[];
  channels: ChannelType[];

  createdAt: Date;
  updatedAt: Date;
};

export type MemberType = {
  id: string;
  role: MemberRoleEnum;

  profileId: string;
  profile: ProfileType;

  serverId: string;
  server: ServerType;

  messages: MessageType[];
  directMessages: DirectMessageType[];

  conversationsInitiated: ConversationType[];
  conversationsReceived: ConversationType[];

  createdAt: Date;
  updatedAt: Date;
};

export type ChannelType = {
  id: string;
  name: string;
  type: ChannelTypeEnum;

  profileId: string;
  profile: ProfileType;

  serverId: string;
  server: ServerType;

  messages: MessageType[];

  createdAt: Date;
  updatedAt: Date;
};

export type MessageType = {
  id: string;
  content: string;

  fileUrl?: String;
  memberId: string;
  member: MemberType;

  channelId: string;
  channel: ChannelType;

  deleted: Boolean;

  createdAt: Date;
  updatedAt: Date;
};

export type ConversationType = {
  id: string;

  memberOneId: string;
  memberOne: MemberType;

  memberTwoId: string;
  memberTwo: MemberType;

  directMessages: DirectMessageType[];
};

export type DirectMessageType = {
  id: string;
  content: string;
  fileUrl?: string;

  memberId: string;
  member: MemberType;

  conversationId: String;
  conversation: ConversationType;

  deleted: boolean;

  createdAt: Date;
  updatedAt: Date;
};
