import { ReactNode } from "react";

export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
  isCode?: boolean; // meaning it's optional
  edited?: boolean;
}
export interface CodeBlockProps {
  code: string;
}
export interface Channel {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface EditProfileErrors {
  username?: string;
  email?: string;
  nickname?: string;
  bio?: string;
  website?: string;
  avatar?: string;
  submit?: string;
}

export interface ChangePasswordErrors{
    currentPassword?: string;
    newPassword: string;
    confirmPassword?: string;
    submit?: string;
}

export interface UserInfo{
    username?: string;
    nickname?: string;
    email?: string;
}