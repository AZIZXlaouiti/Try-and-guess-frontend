import { User, UserAction } from "./type"
const initialState = {
   
}

export const sessionReducer =  (state=initialState, action:UserAction) => {
    switch (action.type) {

    case "LOGIN":
        return {...action.payload }
    case "LOGOUT":
        return {}
    default:
        return state
    }
}

// interface IArticle {
//     id: number
//     title: string
//     body: string
//   }
  
//   type ArticleState = {
//     articles: IArticle[]
//   }
  
//   type ArticleAction = {
//     type: string
//     article: IArticle
//   }
  
//   type DispatchType = (args: ArticleAction) => ArticleAction