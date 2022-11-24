import axios from 'axios'
const baseURL = 'http://localhost:3000'
const urlExtension = '/run'

const createNew = async params => {

  const config = {
    headers: {
      Authorization: `Bearer ${params.token}`
    }
  }

  const bodyObject = params.runParameters

  const response = await axios.post(baseURL + urlExtension + '/new', bodyObject, config)

  console.log('new response:',response)
  // console.log(response, response.status, response.message)

  return response.data
}


const exported = { createNew }

export default exported
