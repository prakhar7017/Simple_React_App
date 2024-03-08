const BASE_URL= process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints={
    SIGNUP_API:BASE_URL+"/user/signup",
    LOGIN_API:BASE_URL+"/user/login",
    POST_API:BASE_URL+"/post/getPost",
    RESETPASSTOKEN_API:BASE_URL+"/reset/reset-password-token",
    RESETPASSWORD_API:BASE_URL+"/reset/reset-password",
}
