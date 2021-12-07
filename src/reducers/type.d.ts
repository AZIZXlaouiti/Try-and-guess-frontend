export interface User{
 username: string
 score: number
 id: number
 online: boolean
}
export type Form = {
    username:string
    password:string
}
type UserAction = {
    type: string
    payload:User
}
type SessionProp = {
    user:User |null
    token:string | null
  }
export type ChatMsg = { content: string; online: boolean; 
    user:{username: string }
  };
interface ChatMessageProps {
    messages: ChatMsg[];
  }  