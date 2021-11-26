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
    user:User 
    token:string
  }