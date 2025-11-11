import axios from "axios"

// Create a base axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000",
  withCredentials: true, // if you're using cookies/sessions
})

// Optional: Add interceptors (for logging or auth)
api.interceptors.request.use(
  (config) => {
    // Example: Attach auth token if stored
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)
