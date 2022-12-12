import axios from 'axios'
// const baseURL = 'http://localhost:3000'
const baseURL = 'https://jog-log-api.onrender.com'
const urlExtension = '/run'

const saveRun = async params => {

  const config = {
    headers: {
      Authorization: `Bearer ${params.token}`
    }
  }

  const bodyObject = params.runParameters

  // adds url end depending on if edit or new
  const newOrEdit = params.runParameters.no ? `/edit/${params.runParameters.no}` : '/new'

  const response = await axios.post(baseURL + urlExtension + newOrEdit, bodyObject, config)

  return response.data
}

const listAll = async params => {
  const config = {
    headers: {
      // Authorization: `Bearer ${params.token}`
    }
  }

  const response = await axios.get(baseURL + urlExtension + '/all', config)

  return response.data
}


const exported = { saveRun, listAll }

export default exported
