import React, {useState} from 'react'

// import { UserContext } from '../App.js'

import StravaAthlete from './StravaAthlete'

const current_base_url = window.location.origin

const Profile = ({profileOpen, setProfileOpen, athlete, user, token}) => {

  // const user = useContext(UserContext)

  const [signingUp, setSigningUp] = useState(false)
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')


  const signUp = () => {
    console.log(signingUp)
    if (!signingUp) {
      setSigningUp(true)
    } else {
      if (username.length < 2) {
        console.log(username.length)
        setMessage('Username too short.')
        return
      } else if (password.length < 5) {
        setMessage('Password too short.')
        return
      } else if (password !== passwordConf) {
        setMessage("Passwords don't match.")
        return
      }
    }
  }

  return (
    <div className="ProfileContainer">
      <div className={"Profile" + (profileOpen ? ' show' : ' hide')}>

        <div className="UserConnection">
          <span className={user ? "Connected" : "Unconnected"}>{user ? 'user connected' : 'user unconnected'}</span> <img src={user ? 'assets/123-connection.png': 'assets/122-noconnection.png'} alt="" />
        </div>
        {athlete
          ?
          <div>
            <div style={{cursor: 'pointer'}} onClick={()=>{window.location.href=current_base_url +"/strava-profile"}}>
              <strong>{athlete.firstname} {athlete.lastname}</strong> <span className="StravaID"><span style={{fontSize:'0em'}}>ID</span >#{athlete.id}</span>
            </div>

            <div>{!token.valid && <div>Strava Token Expired<br />
              <button className="StravaConnectButton" onClick={()=>{window.location.href = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri="+current_base_url+"/approval&approval_prompt=auto&scope=read_all,activity:read_all"}}>
                <img src="assets/strava-reconnect3-button.png" alt="Reconnect with Strava" />
              </button>
            </div>}</div>
          </div>
          :
          <div className="UserForm">
            <div>Hmm, it doesn't look like the browser recognises you.</div>
            <div>Please log in, create a profile, or connect with Strava.</div>
            <div className="LabelAndInput">
              <label>Username/email: </label>
              <input onChange={({target}) => setUsername(target.value)}></input>
            </div>
            <div className="LabelAndInput">
              <label>Password: </label>
              <input type="password" onChange={({target}) => setPassword(target.value)}></input>
            </div>
            <div style={!signingUp ? {display: 'none'} : {display: 'block'}}>
              <label>Confirm password: </label>
              <input type="password" onChange={({target}) => setPasswordConf(target.value)}></input>
            </div>
            <span>{message} </span>
            <button onClick={()=>{console.log('log in')}}>Log in</button><button onClick={()=>{signUp()}}>Sign Up</button><br />
            <button className="StravaConnectButton" onClick={()=>{window.location.href = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri="+current_base_url+"/approval&approval_prompt=auto&scope=read_all,activity:read_all"}}>
              <img src="assets/strava-connect-button.png" alt="Connect with Strava" />
            </button>
          </div>
        }

      </div>
    </div>
  )
}

export default Profile
