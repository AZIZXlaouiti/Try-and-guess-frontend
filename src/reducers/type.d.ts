export interface User{
 username: string
 score: number
 id: number
 online: boolean
}
type UserAction ={
    type: string
    payload:User
}
