// export const submitSignup = async (signupObject) => {

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

// export const getUserInfo = async (token) => {

//     const method = "GET"
//     const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
//     const response = await fetch(`${baseURL}/me`, { method: method, headers: headers })
//     const data = await response.json()
//     return data

// }