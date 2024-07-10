import { ChannelTypeEnum, ServerType } from "@/constants/types";

export const getTextChannel = async (server: ServerType) => {
  const textChannels = server.channels.filter(
    (channel?) => channel?.type === ChannelTypeEnum.TEXT
  );

  return textChannels;
};
