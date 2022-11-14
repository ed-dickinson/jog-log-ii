import React from 'react'

// import { UserContext } from '../App.js'

const current_base_url = window.location.origin

const Profile = ({profileOpen, setProfileOpen, athlete, user, token}) => {

  // const user = useContext(UserContext)

  return (
    <div className="ProfileContainer">
      <div className={"Profile" + (profileOpen ? ' show' : ' hide')}>

        <div className="UserConnection">
          <span className={user ? "Connected" : "Unconnected"}>{user ? 'user connected' : 'user unconnected'}</span> <img src={user ? 'assets/123-connection.png': 'assets/122-noconnection.png'} alt="" />
        </div>
        {athlete
          ?
          <div>
            <strong>{athlete.firstname} {athlete.lastname}</strong> <span className="StravaID">#{athlete.id}</span>
            <div>{!token.valid && <div>Strava Token Expired<br />
              <button className="StravaConnectButton" onClick={()=>{window.location.href = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri="+current_base_url+"/approval&approval_prompt=auto&scope=read_all,activity:read_all"}}>
                <img src="assets/strava-reconnect3-button.png" alt="Reconnect with Strava" />
              </button>
            </div>}</div>
          </div>
          :
          <div>
            <div>Hmm, it doesn't look like the browser recognises you.</div>
            <div>Please log in, create a profile, or connect with Strava.</div>
            <div>
              <label>Username/email: </label>
              <input></input>
            </div>
            <div>
              <label>Password: </label>
              <input type="password"></input>
            </div>
            <button>Log in</button><button>Sign Up</button><br />
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
