import { ChannelTypeEnum, ServerType } from "@/constants/types";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

export const getTextChannel = async (server: ServerType) => {
  const textChannels = server.channels.filter(
    (channel?) => channel?.type === ChannelTypeEnum.TEXT
  );

  return textChannels;
};


