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
