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
  const [runInMemory, setRunInMemory] = useState(null)
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
    // console.log(debug)
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
        setRunInMemory(res[0])
      })
    }
  },[token
  ,activities, athlete
  ])

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

  // const compareRunsAndActivities = (runs, activities) => {
  //   console.log('comping runs and acts')
  //   let linked_runs = []
  //   let activities_dupe = activities
  //   activities_dupe.forEach(activity => {
  //     let found = runs.find(x => x.strava_id === activity.id)
  //     if (found) {
  //       activity.linked_run = found
  //       linked_runs.push(found)
  //     }
  //   })
  //   console.log('linked',linked_runs)
  //   console.log('activities', activities)
  //   setActivities(activities_dupe)
  //   // compareRunsAndActivities()
  // }

  const getRuns = () => {
    accountService.getRuns({
      no : user.no
    }).then(response => {
      let sorted_runs = response.runs.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
      // setRuns(response.runs)
      setRuns(sorted_runs)
    })
  }

  // get runs from account
  useEffect(()=>{
    if (user) {
      getRuns()
    }
  }, [user])

  useEffect(
    () => {
    // compareRunsAndActivities(runs, activities)
  },[activities, runs])

  // useEffect(()=>{
  //   if (writerOpen && writerOpen._id) {
  //     setRunInMemory(writerOpen)
  //   }
  // },[writerOpen])

  useEffect(()=>{
    console.log(runInMemory)
  },[runInMemory])



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
        <StravaActivities activities={activities} runs={runs} setRunInMemory={setRunInMemory} setWriterOpen={setWriterOpen} />
        <Runs runs={runs} setRunInMemory={setRunInMemory} setWriterOpen={setWriterOpen} />
      
      </main>



      <Writer writerOpen={writerOpen} setWriterOpen={setWriterOpen} runInMemory={runInMemory} user={user} token={token}  getRuns={getRuns} />


      <Footer />
    </div>
  );
}

export default App;
