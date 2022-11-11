import axios from 'axios'

const exchange = async params => {

  params = {...params,
    client_id : '70098',
    client_secret : process.env.REACT_APP_CLIENT_SECRET,
    grant_type : 'authorization_code'
  }

  const response = await axios.post('https://www.strava.com/oauth/token', params)

  return response.data
}

const exported = { exchange }

export default exported
