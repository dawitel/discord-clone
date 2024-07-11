import { ServerSidebar } from "@/components/server/server-sidebar";
import { getServerById } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
};

const ServerIdLayout = async ({ children, params }: Props) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  // get a server with its id
  const server = await getServerById(params.serverId, profile.id);
  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
