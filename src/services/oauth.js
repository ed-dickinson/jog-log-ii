import axios from 'axios'

const exchange = async params => {
  const response = await axios.post('https://www.strava.com/oauth/token', params)

  return response.data
}

const exported = { exchange }

export default exported
