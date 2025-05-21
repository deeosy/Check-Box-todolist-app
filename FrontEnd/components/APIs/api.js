import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4002",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ensures cookies are sent with requests to the backend
})

export const LoginUser = async (email, password) => {
  try {
    const response = await api.post("/signin", {email, password})
    return response.data;
  } catch (err) {
    console.error('Login error: ', err);
    console.error('Error response: ', err.response);
    throw new Error(err.response?.data?.message || 'Login failed')    
  }
}

export const SignUpUser = async (name, email, password) => {
    try {
        const response = await api.post("/signup", {name, email, password})
        return response.data;
    } catch (err) {
        console.error('Sign up error: ', err);
        console.error('Error response: ', err.response);
        throw new Error(err.response?.data?.message || 'Sign Up failed')       
    }
}


export const LogOutUser = async () => {
    try {
        const response = await api.post('/signout')
        return response.data
    } catch (err) {
        console.error("Sign Out error: ", err);
        console.error("Error response: ", err.response);
        throw new Error(err.response?.data?.message || "Log Out failed")
    }
}

export const RequestPasswordRest = async (email) => {  // function to request password reset
    try {
        const response = await api.post('/reset-password/request', {email})
        return response.data
    } catch (err) {
        console.error('Password reset request error: ', err)
        console.error('Error response: ', err.response)
        throw new Error(err.response?.data?.message || 'Password reset request failed') 
    }
}

export const ConfirmPasswordReset = async ( token, newPassword ) => {  // confirm password reset
    try {
        const response = await api.post('/reset-password/confirm', {token, newPassword} )
        return response.data
    } catch (err) {
        console.error('Password reset confirm error: ', err)
        console.error('Error response: ', err.response)
        throw new Error(err.response?.data?.message || 'Password reset failed')                
    }
}