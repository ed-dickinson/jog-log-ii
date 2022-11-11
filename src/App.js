import React, {useState, useEffect, useRef} from 'react'

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
  console.log('App loaded')
  const [user, setUser] = useState(null)

  const [writerOpen, setWriterOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const [athlete, setAthlete] = useState(null)
  const [activities, setActivities] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [metric, setMetric] = useState(true)

  const [scope, setScope] = useState(null)
  const [tempToken, setTempToken] = useState(null)

  const [state, setState] = useState({token_valid : null})

  // DEBUGS
  const [tokenExpiryDEBUG, setTokenExpiryDEBUG] = useState(null)

  // handles redirect
  useEffect(() => {
    const queryString = window.location.search;
    const route = window.location.pathname.slice(1)
    console.log(route)

    // cancels if not a redirect
    if (queryString === '') return
    if (route !== 'approval') return

    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('scope') === 'read,activity:read_all,read_all' && scope === null) {
      // if redirect with approval from Strava
      // then login to mongodb
      // a;so do this if athlete is found in storage


      console.log('trigger successful strava scope redirect')

      let temp_token = urlParams.get('code')

      oAuthService.exchange({
        code : temp_token
      }).then(result => {
        console.log(result)

        localStorage.setItem('TokenExpires', result.expires_at)
        localStorage.setItem('AccessToken', result.access_token)
        localStorage.setItem('Athlete', JSON.stringify(result.athlete))

        setAthlete(result.athlete)
        console.log('athlete set by strava')
      })

      // all this goddamn double reloading is happening because the props are changing when i'm doing all these useStates
      // setScope('read,activity:read_all,read_all')
      // setTempToken(urlParams.get('code'))
    } else {
      // this leaves redirect page with no
      console.log('trigger rerequest')
      setState({...state, scope_rerequest : true})
      return
    }

  }, []) // empty array dependency only runs once

  useEffect(()=>{
    console.log('athlete effect triggered')
    if (athlete) {
      let token_expiry = localStorage.getItem('TokenExpires')

      setTokenExpiryDEBUG(token_expiry)

      let token_still_valid = (token_expiry * 1000 > new Date().getTime())

      if (token_still_valid) {
        // stops double triggering
      
        console.log('token still valid - fetch strava')
        setState({...state, token_valid : true})

      } else {
        console.log('token not still valid - ask for reconnection')
        setState({...state, token_valid : false})
        // ask to reaffirm with strava
      }
    }
  },[athlete])


  // handles athlete change
  // useEffect(()=>{
  //   console.log('athlete changed', athlete)
  //
  //   // this DOUBLE TRIGGERS on athlete change becuase it retrieves it from token and then sets it by strava
  //   if (athlete) {
  //     accountService.linkStrava({
  //       id : athlete.id,
  //       password : process.env.REACT_APP_STRAVA_SECRET
  //     }).then(response => {
  //       console.log('res',response)
  //       if (response.status === 204) {
  //         accountService.linkNewStrava({
  //           id : athlete.id,
  //           password : process.env.REACT_APP_STRAVA_SECRET
  //         })
  //       } else {
  //         setUser(response.data.user)
  //       }
  //     })
  //
  //     // stravaService.allActivities({
  //     //   access_token : localStorage.getItem('AccessToken'),
  //     //   activities : activities , setActivities : setActivities
  //     // }).then(() => {
  //     //   setLoaded(true)
  //     // })
  //     // stravaService.activities({
  //     //   access_token : localStorage.getItem('AccessToken'),
  //     //   activities : activities , setActivities : setActivities
  //     // }).then(res => {
  //     //   console.log(res)
  //     //   setActivities(res)
  //     //   setLoaded(true)
  //     // })
  //   }
  //
  //
  // }, [athlete])


  const firstUpdate = useRef(true)
  // // handles redirect (scope change)
  // useEffect(()=>{
  //
  //   // this should sort ouyt the double rendering - but really this effect should be moved to a serate function called by the effetc bofore (the scope looking one)
  //   if (firstUpdate.current) {firstUpdate.current = false; return}
  //
  //
  //   let existing_token_expiry = localStorage.getItem('TokenExpires')
  //
  //   setTokenExpiryDEBUG(existing_token_expiry)
  //
  //   let stored_athlete = localStorage.getItem('Athlete')
  //   if (stored_athlete !== null) {
  //     setAthlete(JSON.parse(localStorage.getItem('Athlete')))
  //     console.log('athlete set by existing')
  //   }
  //
  //   // if token still valid then retrive athlete from localStorage
  //   if (existing_token_expiry * 1000 > new Date().getTime()) {
  //     // stops double triggering
  //     if (athlete) return
  //     console.log('token still valid - fetch strava')
  //     setState({...state, token_valid : true})
  //
  //     return
  //
  //   } else {
  //     console.log('token not still valid - ask for reconnection')
  //     setState({...state, token_valid : false})
  //     // ask to reaffirm with strava
  //   }
  //
  //   // exchange with strava
  //   // oAuthService.exchange({
  //   //   client_id : '70098',
  //   //   client_secret : process.env.REACT_APP_CLIENT_SECRET,
  //   //   code : tempToken,
  //   //   grant_type : 'authorization_code'
  //   // }).then(result => {
  //   //
  //   //   localStorage.setItem('TokenExpires', result.expires_at)
  //   //   localStorage.setItem('AccessToken', result.access_token)
  //   //   localStorage.setItem('Athlete', JSON.stringify(result.athlete))
  //   //
  //   //   setAthlete(result.athlete)
  //   //   console.log('athlete set by strava')
  //   //
  //   //   // stravaService.allActivities({
  //   //   //   access_token : result.access_token,
  //   //   //   activities : activities , setActivities : setActivities
  //   //   // }).then(res => {
  //   //   //   console.log(res)
  //   //   //   setLoaded(true)
  //   //   // })
  //   // })
  // }, [scope])

// <Route path="/profile" element={<Profile />} />

  return (
    <div className="App">

      <Nav writerOpen={writerOpen} setWriterOpen={setWriterOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen}/>
      <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen}
      athlete={athlete} user={user} state={state}/>
      <header className="App-header">

      </header>


      <main>

      userID: {user && user.no} — {user ? 'user connected' : 'user not connected'}<br />
      athlete: {athlete && '#' + athlete.id + ':' } {athlete ? athlete.name : 'no athlete'}
      <br />
      time: {new Date().toLocaleString()} —
      token expires: {new Date(tokenExpiryDEBUG*1000).toLocaleString()}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />

            <Route path="/approval" element={<div>
              <b>redirect –</b>
              {state.scope_rerequest ? <PermissionFailure /> : ''}
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
