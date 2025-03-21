import { RefObject } from "react";

export interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
    isCurrentUser: boolean;
    file?: File | null;
    status: "sent" | "delivered" | "read";
  }
  
  export interface GroupMember {
    id: number;
    name: string;
    avatar: string;
    role?: "admin" | "member";
  }

  export interface ChatMainProps {
    messages: Message[];
    message: string;
    setMessage: (message: string) => void;
    handleSendMessage: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    setFile: (file: File | null) => void;
    groupMembers: GroupMember[];
  }

  
export interface MessagesListProps {
    messages: Message[];
    messagesEndRef: RefObject<HTMLDivElement | null>;
    messageContainerRef: RefObject<HTMLDivElement | null>;
  }
  