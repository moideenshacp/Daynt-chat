import { RefObject } from "react";

export interface Message {
    id: number;
    text: string;
    sender: string | undefined;
    timestamp: Date;
    isCurrentUser?: boolean;
    file?: File | null | string;
  }
  
  export interface GroupMember {
    id?: number | string;
    name: string;
    avatar?: string;
    role?: "admin" | "member";
  }

  export interface ChatMainProps {
    message: string;
    setMessage: (message: string) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    setFile: (file: File | null) => void;
  }

  
export interface MessagesListProps {
    messagesEndRef: RefObject<HTMLDivElement | null>;
    messageContainerRef: RefObject<HTMLDivElement | null>;
  }
  