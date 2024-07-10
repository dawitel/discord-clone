import { getTextChannel } from "@/data/channel";
import { getServerDetailsById } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { ServerHeader } from "./server-header";

interface ServerSidearProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidearProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const server = await getServerDetailsById(serverId);

  // TODO: migrate to data/usecase(server)
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) return redirect("/");

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role}/>
    </div>
  );
};
