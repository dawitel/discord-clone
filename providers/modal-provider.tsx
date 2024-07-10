"use client";

import { CreateChannelModal } from "@/components/modals/create-channel";
import { CreateServerModal } from "@/components/modals/create-server";
import { EditServerModal } from "@/components/modals/edit-server";
import { InviteModal } from "@/components/modals/invite-friends";
import { MembersModal } from "@/components/modals/members-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  );
};
