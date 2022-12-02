import axios from 'axios'
const baseURL = 'http://localhost:3000'
const urlExtension = '/user'

// const stravaLogin = async params => {
//
//   const response = await axios.post(baseURL + urlExtension + '/strava-login', params)
//
//   console.log('response:',response)
//   // console.log(response, response.status, response.message)
//
//   return response
// }

const linkNewStrava = async params => {

  const response = await axios.post(baseURL + urlExtension + '/strava-new', params)

  console.log('new response:',response)
  // console.log(response, response.status, response.message)

  return response
}

// const linkStrava = async params => {
//
//   stravaLogin(params).then(response => {
//     if (response.status === 204) {
//       console.log('no user, new instead')
//       stravaNew(params).then(res => {
//         console.log(res)
//         return res
//       })
//     }
//     return response
//   })
//   // const response = await axios.post(baseURL + urlExtension + '/strava-login', params)
//   //
//   // console.log('response:',response)
//   // // console.log(response, response.status, response.message)
//   //
//   // return response
// }

const linkStrava = async params => {

  console.log('link params', params)

  const response = await axios.post(baseURL + urlExtension + '/strava-login', params)

  // console.log('response:',response)
  // console.log(response, response.status, response.message)

  return response
}

const getRuns = async params => {
  console.log('getting runs', params)

  const response = await axios.get(baseURL + urlExtension + '/' + params.no + '/runs')

  return response.data
}

const exported = { linkStrava, linkNewStrava, getRuns }

export default exported
