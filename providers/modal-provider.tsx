"use client";

import { CreateServerModal } from "@/components/modals/create-server";
import { InviteModal } from "@/components/modals/invite-friends";
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
    </>
  );
};
