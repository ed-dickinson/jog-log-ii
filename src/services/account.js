import axios from 'axios'

// const baseURL = 'http://localhost:3000'
const baseURL = 'https://jog-log-api.onrender.com'
const urlExtension = '/user'


const linkNewStrava = async params => {

  const response = await axios.post(baseURL + urlExtension + '/strava-new', params)

  return response
}

const linkStrava = async params => {

  const response = await axios.post(baseURL + urlExtension + '/strava-login', params)

  return response
}

const getRuns = async params => {

  const response = await axios.get(baseURL + urlExtension + '/' + params.no + '/runs')

  return response.data
}

const exported = { linkStrava, linkNewStrava, getRuns }

export default exported
