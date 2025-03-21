"use client";

import ChatApp from "@/components/chat/ChatApp";
import withAuth from "../../utils/WithAuth";

function ChatPage() {
  return <ChatApp />;
}

export default withAuth(ChatPage);
