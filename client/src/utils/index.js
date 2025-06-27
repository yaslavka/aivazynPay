export const getAccessToken = () => {
  try {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken === null) {
      return null
    }
    return accessToken
  } catch (error) {
    return null
  }
}

export const setAccessToken = (access_token) => {
  localStorage.setItem('access_token', access_token)
}
