import React, {useState, useEffect} from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

import oAuthService from './services/oauth'
import stravaService from './services/strava'
import accountService from './services/account'

// import Router from './Router'



import Nav from './components/Nav'
import Intro from './components/Intro'
import Footer from './components/Footer'
import Writer from './components/Writer'
import Profile from './components/Profile'
import StravaAthlete from './components/StravaAthlete'
import StravaActivities from './components/StravaActivities'
import PermissionFailure from './components/PermissionFailure'

// const UserContext = createContext()

console.log('\\/ \\/ \\/ APP REFRESH \\/ \\/ \\/')

function App() {
  const [user, setUser] = useState(null)

  const [writerOpen, setWriterOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const [athlete, setAthlete] = useState(null)
  const [activities, setActivities] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [metric, setMetric] = useState(true)

  const [scope, setScope] = useState(null)
  const [tempToken, setTempToken] = useState(null)

  // handles redirect
  useEffect(() => {
    var queryString = window.location.search;

    if (queryString === '') return

    const urlParams = new URLSearchParams(queryString);
    console.log(scope, urlParams.get('scope'))

    if (urlParams.get('scope') === 'read,activity:read_all,read_all' && scope === null) {
      console.log('scope:', scope)
      setScope('read,activity:read_all,read_all')
      setTempToken(urlParams.get('code'))
    } else {
      return
    }

  }, []) // empty array dependency only runs once


  // handles athlete change
  useEffect(()=>{

    if (athlete) {
      accountService.linkStrava({
        id : athlete.id,
        password : process.env.REACT_APP_STRAVA_SECRET
      }).then(response => {
        console.log('res',response)
        if (response.status === 204) {
          accountService.linkNewStrava({
            id : athlete.id,
            password : process.env.REACT_APP_STRAVA_SECRET
          })
        } else {
          setUser(response.data.user)
        }
      })
      console.log('athlete changed', athlete)
      // stravaService.allActivities({
      //   access_token : localStorage.getItem('AccessToken'),
      //   activities : activities , setActivities : setActivities
      // }).then(() => {
      //   setLoaded(true)
      // })
      // stravaService.activities({
      //   access_token : localStorage.getItem('AccessToken'),
      //   activities : activities , setActivities : setActivities
      // }).then(res => {
      //   console.log(res)
      //   setActivities(res)
      //   setLoaded(true)
      // })
    }

  // }, []) // just on mount
  }, [athlete])

  // console.log(temp_token)

  const doActivityOperation = () => {

  }

  // handles redirect (scope change)
  useEffect(()=>{
    let existing_token_expiry = localStorage.getItem('TokenExpires')

    // if token still valid then retrive athlete from localStorage
    if (existing_token_expiry * 1000 > new Date().getTime()) {
      console.log('token still valid')

      setAthlete(JSON.parse(localStorage.getItem('Athlete')))

      // stravaService.allActivities({
      //   access_token : localStorage.getItem('AccessToken'),
      //   activities : activities , setActivities : setActivities
      // }).then(() => {
      //   setLoaded(true)
      // })

      return

    } else {
      console.log('token not still valid')
      // ask to reaffirm with strava
    }

    // exchange with strava
    oAuthService.exchange({
      client_id : '70098',
      client_secret : process.env.REACT_APP_CLIENT_SECRET,
      code : tempToken,
      grant_type : 'authorization_code'
    }).then(result => {
      console.log(result)
      console.log(new Date().getTime() > result.expires_at * 1000  ? 'expired' : 'valid')


      localStorage.setItem('TokenExpires', result.expires_at)
      localStorage.setItem('AccessToken', result.access_token)
      localStorage.setItem('Athlete', JSON.stringify(result.athlete))
      setAthlete(result.athlete)

      // stravaService.allActivities({
      //   access_token : result.access_token,
      //   activities : activities , setActivities : setActivities
      // }).then(res => {
      //   console.log(res)
      //   setLoaded(true)
      // })
    })
  }, [scope])

// <Route path="/profile" element={<Profile />} />

  return (
    <div className="App">

      <Nav writerOpen={writerOpen} setWriterOpen={setWriterOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen}/>
      <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen}
      athlete={athlete} user={user}/>
      <header className="App-header">
        {user && user.no}
      </header>


      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />

            <Route path="/approval" element={<div>
              <b>redirect –</b>
              {scope !== 'read,activity:read_all,read_all' ? <PermissionFailure /> : ''}
              {athlete !== null ? athlete.firstname : 'athlete null'}
              {athlete !== null &&
                <StravaAthlete athlete={athlete}/>
              }

              </div>} />
          </Routes>
        </BrowserRouter>
        {activities.length} activities loaded
        <StravaActivities activities={activities} />
        <button style={{width: '100%', height: '300px'}}>
          Massive button to test {'<main>'} interactivity.
        </button>
      </main>



      <Writer writerOpen={writerOpen} setWriterOpen={setWriterOpen}/>


      <Footer />
    </div>
  );
}

export default App;
