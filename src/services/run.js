import axios from 'axios'
const baseURL = 'http://localhost:3000'
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

  // THE EDIT API DOESN't DO ANYTHING ATM - it's not a problem here ...yet

  const response = await axios.post(baseURL + urlExtension + newOrEdit, bodyObject, config)

  console.log('new response:',response)
  // console.log(response, response.status, response.message)

  return response.data
}


const exported = { saveRun }

export default exported
