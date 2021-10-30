
import { BASE_URL } from "../../root"


export const login = async (form) => {
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = form
    const response = await fetch(`${BASE_URL}/login`, { method: method, headers: headers, body: JSON.stringify(body) })
    const data = await response.json()
    return data
}

export const signup = async (form) => {

    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = form
    const resp = await fetch(`${BASE_URL}/signup`,    
                    { method: method, headers: headers, body: JSON.stringify(body) 
            })
    const data = await resp.json()
    return data
}

export const getCurrentUser = (token) => {
    return async dispatch =>{

        
        const headers = { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        const response = await fetch(`${BASE_URL}/profile`, 
                 {
                    headers: headers 
                })
        const data = await response.json()
       
        if(data.user) {
            dispatch({ type: "LOGIN", payload: data })
          }
    }

}