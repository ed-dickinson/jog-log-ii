// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import oAuthService from './services/oauth'
import stravaService from './services/strava'

import Athlete from './components/Athlete'



// let athlete = response.athlete



function App() {

  const [athlete, setAthlete] = useState(null)

  var queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var temp_token = urlParams.get('code');
  // console.log(temp_token)

  // console.log(process.env.REACT_APP_CLIENT_SECRET, temp_token)
  // const response = await
  // const response =
  oAuthService.exchange({
    client_id : '70098',
    client_secret : process.env.REACT_APP_CLIENT_SECRET,
    code : temp_token,
    grant_type : 'authorization_code'
  }).then(result => {
    console.log(result)
    console.log(new Date().getTime() > result.expires_at * 1000  ? 'expired' : 'valid')
    setAthlete(result.athlete)
    stravaService.allActivities({
      access_token : result.access_token
    }).then(res => {
      console.log(res)
    })

  })

  return (
    <div className="App">
      <header className="App-header">
        {athlete!==null &&
          <Athlete athlete={athlete} />
        }

        {athlete===null &&
          <div>
            <img src="jl-icon.png" alt="logo" /> <br />
            <a href="http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri=http://localhost:3001/approval&approval_prompt=auto&scope=read_all,activity:read_all">
            <img src="connect-orange.png" alt="Strava authorize button" />
            </a>
          </div>
        }



      </header>
    </div>
  );
}

export default App;
// http://trails.ninja/
// goes to > https://www.strava.com/oauth/authorize?client_id=1495&response_type=code&redirect_uri=http://trails.ninja&approval_prompt=auto&scope=read_all,activity:read_all
// heads back to http://www.trails.ninja/?state=&code=add8f4a28b3d2b407912e178fc950dfeb56f0500&scope=read,activity:read_all,read_all

// https://www.bifurkate.com/
// goes to > https://www.strava.com/oauth/authorize?client_id=38178&response_type=code&redirect_uri=https://www.bifurkate.com/callback&approval_prompt=force&scope=read,profile:read_all,activity:read,activity:read_all
// then to > https://www.bifurkate.com/callback/?state=&code=b88a98b03509bc858c96f327dee77233c80a8afc&scope=read,activity:read,activity:read_all,profile:read_all

// // code 898c66ddec4db942116a2c53d0aee051106aa128
//
// // https://www.strava.com/oauth/token?client_id=70098&client_secret=a33422601b96cf94d9e0b6e1a95ec23c5bc98e44&code=898c66ddec4db942116a2c53d0aee051106aa128&grant_type=authorization_code
//
//
// import React, { useState, useEffect } from 'react';
//
// function App() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [activities, setActivities] = useState({})
//
//   //Strava Credentials
//   let clientID = "70098";
//   let clientSecret = "a33422601b96cf94d9e0b6e1a95ec23c5bc98e44";
//
//   // refresh token and call address
//   const refreshToken = "99c7ce0ed4b725b76b80f5186aa64be3b8a74ca6";
//   const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
//
//   // endpoint for read-all activities. temporary token is added in getActivities()
//   const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`
//
//   // Use refresh token to get current access token
//   useEffect(() => {
//     fetch(callRefresh, {
//       method: 'POST'
//     })
//     .then(res => res.json())
//     .then(result => getActivities(result.access_token))
//   }, [callRefresh])
//
//   // use current access token to call all activities
//   function getActivities(access){
//     // console.log(callActivities + access)
//       fetch(callActivities + access)
//       .then(res => res.json())
//       .then(data => setActivities(data), setIsLoading(prev => !prev))
//       .catch(e => console.log(e))
//   }
//
//   function showActivities(){
//     if(isLoading) return <>LOADING</>
//     if(!isLoading) {
//       console.log(activities)
//       return activities.length
//     }
//   }
//
//   return (
//     <div className="App">
//       {showActivities()}
//     </div>
//   );
// }
//
// export default App;
