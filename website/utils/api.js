import axios from 'axios'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = (() => {
  const baseURL =
    typeof window === 'undefined' ? process.env.CONTAINER_API_URL : API_URL
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})()

export default api
