import { ReactNode } from "react";

export interface Message{
    id: number;
    user: string;
    content: string;
    timestamp: string;
    avatar: string;
    isCode? : boolean; // meaning it's optional
}
export interface CodeBlockProps{
    code: string;
}
export interface Channel{
    id: string;
    name: string;
    icon: ReactNode;
}