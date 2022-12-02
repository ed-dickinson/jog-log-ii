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
import Settings from './components/Settings'
import StravaAthlete from './components/StravaAthlete'
import StravaActivities from './components/StravaActivities'
import Runs from './components/Runs'
import PermissionFailure from './components/PermissionFailure'

// const UserContext = createContext()

console.log('\\/ \\/ \\/ APP REFRESH \\/ \\/ \\/')

function App() {
  console.log('App loaded')
  const [user, setUser] = useState(null)

  const [writerOpen, setWriterOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [athlete, setAthlete] = useState(null)
  const [activities, setActivities] = useState([])
  const [stravaActivity, setStravaActivity] = useState(null)
  // const [loaded, setLoaded] = useState(false)
  // const [metric, setMetric] = useState(true)

  // const [scope, setScope] = useState(null)
  // const [tempToken, setTempToken] = useState(null)

  const [runs, setRuns] = useState([])

  const [token, setToken] = useState({token : null, valid : null})

  const [state, setState] = useState({token_valid : null})

  const freshFromRedirect = useRef(true)


  // token validation check doesn't happen before athlete/fetch

  // check for athlete and tokens
  useEffect(()=>{
    let debug = ''
    if (localStorage.getItem('Athlete')) {
      setAthlete(JSON.parse(localStorage.getItem('Athlete')))
      debug += 'athlete, '
    }
    let stored_access_token = localStorage.getItem('AccessToken')
    if (stored_access_token) {
      let token_expiry = localStorage.getItem('TokenExpires')

      if (token_expiry * 1000 > new Date().getTime()) {
        setToken({token : stored_access_token, valid : true})
        debug += 'valid token, '
      } else {
        setToken({token : stored_access_token, valid : false})
        debug += 'expired token, '
      }
      debug += 'retrieved from localStorage'
    }
    console.log(debug)
  },[])

  // handles redirect
  useEffect(() => {

    const queryString = window.location.search;
    const route = window.location.pathname.slice(1)

    // cancels if not a redirect
    if (queryString === '') return
    if (route !== 'approval') return

    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('scope') === 'read,activity:read_all,read_all') {
      // if redirect with approval from Strava
      // then login to mongodb
      // a;so do this if athlete is found in storage

      // only do exchange if token needs refreshing
      // although this would be handy to change to recognising only doing it on the first redirect not on app changes

      if (!freshFromRedirect.current) {
        // return
      } else {
        freshFromRedirect.current = false
      }

      // if (token.valid !== false) {
      if (token.valid === true) {
        return
      }
      // if (token.valid === null) {
      //   // DO SOMETHING HERE TO STOP NON-TRIGGERING ON non-refresh REDIRECT
      //   console.log('token is null')
      //   // return
      // }
      if (localStorage.getItem('AccessToken') && localStorage.getItem('TokenExpires') * 1000 > new Date().getTime()) {
        return
      }


      oAuthService.exchange({
        code : urlParams.get('code')
      }).then(result => {

        localStorage.setItem('TokenExpires', result.expires_at)
        localStorage.setItem('AccessToken', result.access_token)
        localStorage.setItem('Athlete', JSON.stringify(result.athlete))

        setToken({token: result.access_token, valid: true})
        setAthlete(result.athlete)
      }).catch(err=>{
        console.log('bad auth request')
      })

      // setScope('read,activity:read_all,read_all')
      // setTempToken(urlParams.get('code'))
    } else {
      // this leaves redirect page with no

      setState({...state, scope_rerequest : true})
      return
    }

  }, [token,
    state]) // empty array dependency only runs once

  // // check if token valid
  // useEffect(()=>{
  //   let token_expiry = localStorage.getItem('TokenExpires')
  //
  //   let token_still_valid = (token_expiry * 1000 > new Date().getTime())
  //
  //   if (token_still_valid) {
  //     setState({...state, token_valid : true})
  //   } else {
  //     setState({...state, token_valid : false})
  //   }
  // },[])

  // use effect for fetching activities
  useEffect(()=>{

    if (activities.length > 0) {return}

    if (athlete && token.valid) {
      stravaService.activities({
        access_token : token.token,
        activities : activities ,
        setActivities : setActivities
      }).then(res => {
        console.log('fetched runs:', res)
        setActivities(res)
        // setLoaded(true)
        setStravaActivity(res[0])
      })
    }
  },[token])

  // logs user into database
  useEffect(()=>{

    if (state.fetching_login) return

    // is user not logged in but athlete is
    if (athlete && !user) {
      setState({...state, fetching_login : true})
      accountService.linkStrava({
        id : athlete.id,
        password : process.env.REACT_APP_STRAVA_SECRET
      }).then(response => {
        if (response.status === 204) {
          accountService.linkNewStrava({
            id : athlete.id,
            password : process.env.REACT_APP_STRAVA_SECRET
          })
        } else {
          setUser(response.data.user)
        }
        setState({...state, fetching_login : false})

      })
    }
  },[athlete,
    state, user])

  const compareRunsAndActivities = (runs, activities) => {
    console.log('comping runs and acts')
    let linked_runs = []
    let activities_dupe = activities
    activities_dupe.forEach(activity => {
      let found = runs.find(x => x.strava_id === activity.id)
      if (found) {
        activity.linked_run = found
        linked_runs.push(found)
      }
    })
    console.log(linked_runs)
    setActivities(activities_dupe)
    // compareRunsAndActivities()
  }

  // get runs from account
  useEffect(()=>{
    if (user) {
      accountService.getRuns({
        no : user.no
      }).then(response => {
        setRuns(response.runs)
        console.log('got runs', runs)
        // compareRunsAndActivities()
      })
    }
  }, [user])

  useEffect(
    () => {
    compareRunsAndActivities(runs, activities)
  },[activities, runs])

  // useEffect(()=>{
  //   console.log('runs changed:', runs)
  // }, [runs])

  // useEffect(()=>{
  //   console.log('athlete effect triggered')
  //   if (athlete) {
  //     let token_expiry = localStorage.getItem('TokenExpires')
  //
  //     setTokenExpiryDEBUG(token_expiry)
  //
  //     let token_still_valid = (token_expiry * 1000 > new Date().getTime())
  //
  //     if (token_still_valid) {
  //       // stops double triggering
  //
  //       console.log('token still valid - fetch strava')
  //       setState({...state, token_valid : true})
  //
  //     } else {
  //       console.log('token not still valid - ask for reconnection')
  //       setState({...state, token_valid : false})
  //       // ask to reaffirm with strava
  //     }
  //   }
  // },[athlete])


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


  // const firstUpdate = useRef(true)
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

      <Nav writerOpen={writerOpen} setWriterOpen={setWriterOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen}
      settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}
      />

      <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen}
      athlete={athlete} user={user} token={token}/>

      <Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />

      <header className="App-header">

      </header>


      <main>

      userID: {user && user.no} — {user ? 'user connected' : 'user not connected'}<br />
      athlete: {athlete && '#' + athlete.id + ':' } {athlete ? athlete.name : 'no athlete'}
      <br />
      time: {new Date().toLocaleString()} —
      token valid? <strong>{token.valid === 'null' ? 'null' : token.valid ? 'true' : 'false'}</strong>, {token.valid ? 'expires' : 'expired'}: {new Date(localStorage.getItem('TokenExpires')*1000).toLocaleString()}
      <button onClick={()=>{
        setToken({token: 'fake', valid: false})
        localStorage.setItem('TokenExpires', new Date(0).getTime())
        localStorage.setItem('AccessToken', 'fake')
      }}>Invalidate Token</button>

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
        {activities.length} activities & {runs.length} runs loaded <br />
        <StravaActivities activities={activities} setStravaActivity={setStravaActivity} setWriterOpen={setWriterOpen} />
        <Runs runs={runs} setWriterOpen={setWriterOpen} />
        <button style={{width: '100%', height: '300px'}}>
          Massive button to test {'<main>'} interactivity.
        </button>
      </main>



      <Writer writerOpen={writerOpen} setWriterOpen={setWriterOpen} stravaActivity={stravaActivity} user={user} token={token}/>


      <Footer />
    </div>
  );
}

export default App;
