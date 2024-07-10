"use client";

import {
  CreateChannelModal,
  CreateServerModal,
  DeleteServerModal,
  EditServerModal,
  InviteModal,
  LeaveServerModal,
  MembersModal,
} from "@/components/modals";
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
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};
